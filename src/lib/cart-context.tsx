"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { shopifyFetch } from "@/lib/shopify/storefront-client";
import { amountHT, companyErrors, isB2BVariant, normalizeCompanyId, VAT_FOOD, type CompanyInfo } from "@/lib/b2b";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/shipping";
import { useCustomerMode } from "@/lib/customer-mode";

export type CartLine = {
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  image: string;
  unitAmount: number;
  vatRate: number;
  quantity: number;
  /** false quand Shopify signale la variante en rupture. */
  available?: boolean;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  subtotalHT: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  hasUnavailableLines: boolean;
  company: CompanyInfo;
  setCompany: Dispatch<SetStateAction<CompanyInfo>>;
  checkingOut: boolean;
  checkoutError: string | null;
  openCart: () => void;
  closeCart: () => void;
  addLine: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeLine: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  checkout: () => Promise<void>;
};

// Clé versionnée : invalide les paniers B2C (100g/500g) enregistrés avant le passage en B2B.
const STORAGE_KEY = "nayuma-cart-b2b";
const COMPANY_STORAGE_KEY = "nayuma-company";
// Panier Shopify du dernier passage en caisse : sert à vider le panier une fois la commande payée.
const CHECKOUT_STORAGE_KEY = "nayuma-checkout";
// Un panier Shopify expire après ~10 jours : au-delà, "introuvable" ne veut plus dire "payé".
const CHECKOUT_MAX_AGE_MS = 9 * 24 * 60 * 60 * 1000;
const EMPTY_COMPANY: CompanyInfo = { name: "", siret: "", vatNumber: "" };

const CartContext = createContext<CartContextValue | null>(null);

const CART_CREATE_MUTATION = `
  mutation CartCreate($lines: [CartLineInput!]!, $attributes: [AttributeInput!]) {
    cartCreate(input: { lines: $lines, attributes: $attributes }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

const CART_STATUS_QUERY = `
  query CartStatus($id: ID!) {
    cart(id: $id) { id }
  }
`;

const VARIANTS_QUERY = `
  query CartVariants($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on ProductVariant { id title availableForSale price { amount } }
    }
  }
`;

type VariantStatus = { unitAmount: number; available: boolean } | null;
type PendingCheckout = { cartId: string; startedAt: number };

function readStorage<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // stockage plein ou bloqué (navigation privée) : le panier reste en mémoire
  }
}

/** État Shopify de chaque variante : null si elle a disparu ou n'est plus vendue en 1kg. */
async function fetchVariantStatuses(ids: string[]): Promise<Map<string, VariantStatus>> {
  const data = await shopifyFetch<{
    nodes: ({ id?: string; title?: string; availableForSale?: boolean; price?: { amount: string } } | null)[];
  }>(VARIANTS_QUERY, { ids });
  const statuses = new Map<string, VariantStatus>(ids.map((id) => [id, null]));
  for (const node of data.nodes) {
    if (!node?.id || !node.title || !node.price || !isB2BVariant(node.title)) continue;
    statuses.set(node.id, { unitAmount: Number(node.price.amount), available: node.availableForSale !== false });
  }
  return statuses;
}

/** Vrai si le panier Shopify ouvert au dernier passage en caisse a été converti en commande. */
async function lastCheckoutCompleted(): Promise<boolean> {
  const pending = readStorage<PendingCheckout>(CHECKOUT_STORAGE_KEY);
  if (!pending?.cartId) return false;
  const data = await shopifyFetch<{ cart: { id: string } | null }>(CART_STATUS_QUERY, { id: pending.cartId });
  if (data.cart) return false; // caisse abandonnée : on garde le panier
  writeStorage(CHECKOUT_STORAGE_KEY, null);
  return Date.now() - pending.startedAt < CHECKOUT_MAX_AGE_MS;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isPro } = useCustomerMode();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [company, setCompany] = useState<CompanyInfo>(EMPTY_COMPANY);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    const stored = readStorage<CartLine[]>(STORAGE_KEY) ?? [];
    const storedCompany = readStorage<Partial<CompanyInfo>>(COMPANY_STORAGE_KEY);
    setLines(stored);
    if (storedCompany) setCompany({ ...EMPTY_COMPANY, ...storedCompany });
    setHydrated(true);

    // Resynchronise avec Shopify. Les lignes ajoutées entre-temps ne sont pas touchées.
    let cancelled = false;
    const checkedIds = new Set(stored.map((l) => l.variantId));
    (async () => {
      try {
        if (await lastCheckoutCompleted()) {
          if (!cancelled) setLines((current) => current.filter((l) => !checkedIds.has(l.variantId)));
          return;
        }
        if (checkedIds.size === 0) return;
        const statuses = await fetchVariantStatuses([...checkedIds]);
        if (cancelled) return;
        setLines((current) =>
          current.flatMap((line) => {
            if (!checkedIds.has(line.variantId)) return [line];
            const status = statuses.get(line.variantId);
            return status ? [{ ...line, ...status }] : [];
          })
        );
      } catch {
        // réseau indisponible : on garde le panier local tel quel
      }
    })();

    // Garde les onglets ouverts synchronisés (sinon un onglet écrase le panier de l'autre).
    function onStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY) setLines(readStorage<CartLine[]>(STORAGE_KEY) ?? []);
      if (event.key === COMPANY_STORAGE_KEY) {
        setCompany({ ...EMPTY_COMPANY, ...readStorage<Partial<CompanyInfo>>(COMPANY_STORAGE_KEY) });
      }
    }
    // Retour arrière depuis la caisse Shopify : la page sort du cache avec "Redirection..." figé.
    function onPageShow(event: PageTransitionEvent) {
      if (event.persisted) setCheckingOut(false);
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  useEffect(() => {
    if (hydrated) writeStorage(STORAGE_KEY, lines);
  }, [lines, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(COMPANY_STORAGE_KEY, company);
  }, [company, hydrated]);

  const addLine = useCallback((product: Product, variant: ProductVariant, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === variant.id);
      if (existing) {
        return prev.map((l) => (l.variantId === variant.id ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [
        ...prev,
        {
          variantId: variant.id,
          productHandle: product.handle,
          title: product.title,
          variantTitle: variant.title,
          image: product.images[0]?.url ?? "",
          unitAmount: Number(variant.price.amount),
          vatRate: product.vatRate,
          quantity,
          available: variant.availableForSale,
        },
      ];
    });
    setCheckoutError(null);
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
    setCheckoutError(null);
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }, []);

  const hasUnavailableLines = lines.some((l) => l.available === false);

  const checkout = useCallback(async () => {
    if (lines.length === 0) return;
    if (hasUnavailableLines) {
      setCheckoutError("Un article n'est plus disponible : retirez-le pour continuer.");
      return;
    }
    if (isPro && Object.keys(companyErrors(company)).length > 0) {
      setCheckoutError("Vérifiez le SIRET et le n° de TVA saisis.");
      return;
    }
    setCheckingOut(true);
    setCheckoutError(null);

    // Visibles sur la commande Shopify ("Détails supplémentaires") pour la facturation.
    const attributes = isPro
      ? [
          { key: "Type de client", value: "Professionnel" },
          { key: "Raison sociale", value: company.name.trim() },
          { key: "SIRET", value: normalizeCompanyId(company.siret) },
          { key: "N° TVA intracommunautaire", value: normalizeCompanyId(company.vatNumber) },
        ].filter((a) => a.value)
      : [];

    try {
      const data = await shopifyFetch<{
        cartCreate: {
          cart: { id: string; checkoutUrl: string } | null;
          userErrors: { field: string[]; message: string }[];
        };
      }>(CART_CREATE_MUTATION, {
        lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })),
        attributes,
      });

      if (data.cartCreate.userErrors.length > 0) {
        throw new Error(data.cartCreate.userErrors.map((e) => e.message).join(", "));
      }
      if (!data.cartCreate.cart) {
        throw new Error("Impossible de créer le panier Shopify.");
      }

      writeStorage(CHECKOUT_STORAGE_KEY, { cartId: data.cartCreate.cart.id, startedAt: Date.now() });
      window.location.assign(data.cartCreate.cart.checkoutUrl);
    } catch (err) {
      setCheckoutError(
        err instanceof Error
          ? `Le paiement n'a pas pu démarrer : ${err.message}`
          : "Le paiement n'a pas pu démarrer. Réessayez dans un instant."
      );
      setCheckingOut(false);
    }
  }, [lines, hasUnavailableLines, isPro, company]);

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.unitAmount * l.quantity, 0), [lines]);
  const subtotalHT = useMemo(
    () => lines.reduce((sum, l) => sum + amountHT(l.unitAmount, l.vatRate ?? VAT_FOOD) * l.quantity, 0),
    [lines]
  );
  const totalQuantity = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const value: CartContextValue = {
    lines,
    isOpen,
    totalQuantity,
    subtotal,
    subtotalHT,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    remainingForFreeShipping,
    hasUnavailableLines,
    company,
    setCompany,
    checkingOut,
    checkoutError,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addLine,
    removeLine,
    updateQuantity,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
