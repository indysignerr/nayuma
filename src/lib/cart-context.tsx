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
import { amountHT, companyErrors, normalizeCompanyId, VAT_FOOD, type CompanyInfo } from "@/lib/b2b";
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
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  totalQuantity: number;
  subtotal: number;
  subtotalHT: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
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

const FREE_SHIPPING_THRESHOLD = 49;
// Clé versionnée : invalide les paniers B2C (100g/500g) enregistrés avant le passage en B2B.
const STORAGE_KEY = "nayuma-cart-b2b";
const COMPANY_STORAGE_KEY = "nayuma-company";
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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isPro } = useCustomerMode();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [company, setCompany] = useState<CompanyInfo>(EMPTY_COMPANY);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
      const rawCompany = window.localStorage.getItem(COMPANY_STORAGE_KEY);
      if (rawCompany) setCompany({ ...EMPTY_COMPANY, ...JSON.parse(rawCompany) });
    } catch {
      // ignore corrupted local storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(company));
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
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }, []);

  const checkout = useCallback(async () => {
    if (lines.length === 0) return;
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

      window.location.href = data.cartCreate.cart.checkoutUrl;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setCheckingOut(false);
    }
  }, [lines, isPro, company]);

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
