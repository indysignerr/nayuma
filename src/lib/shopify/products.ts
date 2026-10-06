import { cache } from "react";
import sanitizeHtml from "sanitize-html";
import { shopifyFetch } from "./storefront-client";
import { accentForProduct } from "@/lib/accent";
import { isB2BVariant, parseDosage, vatRateFor } from "@/lib/b2b";
import type { Product } from "./types";

function sanitizeDescription(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "b", "em", "i", "u", "ul", "ol", "li", "span", "a"],
    allowedAttributes: { a: ["href"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
    },
  });
}

const PRODUCTS_QUERY = `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id
          handle
          title
          vendor
          productType
          isGiftCard
          tags
          descriptionHtml
          description
          images(first: 4) { edges { node { url altText } } }
          variants(first: 8) {
            edges {
              node {
                id
                title
                availableForSale
                weight
                weightUnit
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          collections(first: 20) { edges { node { handle } } }
        }
      }
    }
  }
`;

type RawProductNode = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  isGiftCard: boolean;
  tags: string[];
  descriptionHtml: string;
  description: string;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        weight: number | null;
        weightUnit: string | null;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
        selectedOptions: { name: string; value: string }[];
      };
    }[];
  };
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  collections: { edges: { node: { handle: string } }[] };
};

function priceBounds(variants: RawProductNode["variants"]["edges"]) {
  const sorted = [...variants].sort((a, b) => Number(a.node.price.amount) - Number(b.node.price.amount));
  return { min: sorted[0].node.price, max: sorted[sorted.length - 1].node.price };
}

const KG_PER_UNIT: Record<string, number> = { KILOGRAMS: 1, GRAMS: 0.001, POUNDS: 0.4536, OUNCES: 0.02835 };

/** Variante unique sans nom (« Default Title ») : on la nomme d'après son poids Shopify, comme les autres pochettes. */
function variantTitle(variant: RawProductNode["variants"]["edges"][number]["node"]): string {
  if (variant.title !== "Default Title" || !variant.weight || !variant.weightUnit) return variant.title;
  const kg = variant.weight * (KG_PER_UNIT[variant.weightUnit] ?? 0);
  if (Math.abs(kg - 1) < 0.01) return "Pochette Vrac 1kg";
  if (kg > 0 && kg < 1) return `Pochette Vrac ${Math.round(kg * 1000)}g`;
  return variant.title;
}

function mapProduct(node: RawProductNode): Product {
  const base = {
    productType: node.productType,
    vendor: node.vendor,
    tags: node.tags,
  };
  const b2bVariants = node.variants.edges.filter((e) => isB2BVariant(e.node.title));
  const variants = b2bVariants.length > 0 ? b2bVariants : node.variants.edges;
  const prices = variants.length > 0 ? priceBounds(variants) : null;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    vendor: node.vendor,
    productType: node.productType,
    tags: node.tags,
    descriptionHtml: sanitizeDescription(node.descriptionHtml),
    description: node.description,
    images: node.images.edges.map((e) => e.node),
    variants: variants.map((e) => ({
      id: e.node.id,
      title: variantTitle(e.node),
      price: e.node.price,
      compareAtPrice: e.node.compareAtPrice,
      availableForSale: e.node.availableForSale,
      selectedOptions: e.node.selectedOptions,
    })),
    minPrice: prices?.min ?? node.priceRange.minVariantPrice,
    maxPrice: prices?.max ?? node.priceRange.maxVariantPrice,
    collectionHandles: node.collections.edges.map((e) => e.node.handle),
    accent: accentForProduct(base),
    fineTea: node.vendor.trim().toUpperCase() === "FINE TEA",
    isGiftCard: node.isGiftCard,
    vatRate: vatRateFor({ productType: node.productType, title: node.title, isGiftCard: node.isGiftCard }),
    dosage: parseDosage(node.description),
  };
}

export const getAllProducts = cache(async (): Promise<Product[]> => {
  const all: RawProductNode[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data: {
      products: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        edges: { node: RawProductNode }[];
      };
    } = await shopifyFetch(PRODUCTS_QUERY, { first: 40, after });

    all.push(...data.products.edges.map((e) => e.node));
    hasNextPage = data.products.pageInfo.hasNextPage;
    after = data.products.pageInfo.endCursor;
  }

  return all.map(mapProduct);
});

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  const products = await getAllProducts();
  return products.find((p) => p.handle === handle);
}

export async function getFineTeaProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.fineTea);
}

export const FEATURED_COLLECTION_HANDLE = "thes-classiques-bio";

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  const featured = products.filter((p) => p.collectionHandles.includes(FEATURED_COLLECTION_HANDLE));
  return (featured.length > 0 ? featured : products).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const products = await getAllProducts();
  return products
    .filter(
      (p) =>
        p.handle !== product.handle &&
        (p.productType === product.productType || p.vendor === product.vendor)
    )
    .slice(0, limit);
}

function normalizeText(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Thés de Noël mis en avant, par numéro de fiche (titre « N°25 … »), dans l'ordre d'affichage.
const CHRISTMAS_NUMBERS = [...Array.from({ length: 15 }, (_, i) => 25 + i), 414];

function teaNumber(title: string): number | null {
  const match = title.match(/^N°\s*(\d+)/i);
  return match ? Number(match[1]) : null;
}

// Saveurs de fêtes, pour compléter la sélection tant que la collection Noël est peu fournie.
// Une saveur d'hiver est obligatoire ; pomme et orange ne font qu'affiner le classement.
const WINTER_FLAVORS = [/can+el+e/, /epice/, /speculo/, /marron/, /amande/, /caramel/, /vanille/, /chocolat|cacao/, /noisette/, /nougat/];
const SIDE_FLAVORS = [/pomme/, /orange/];

function festiveScore(product: Product): number {
  // Le titre d'abord : les descriptions citent souvent des saveurs en passant.
  const title = normalizeText(product.title);
  const text = normalizeText(`${product.title} ${product.description}`);
  const winterInTitle = WINTER_FLAVORS.filter((f) => f.test(title)).length;
  const winter = WINTER_FLAVORS.filter((f) => f.test(text)).length;
  if (winter === 0) return 0;
  return winterInTitle * 3 + winter + SIDE_FLAVORS.filter((f) => f.test(text)).length;
}

/** Thés de Noël mis en avant (N°25 à 39 et N°414), dans l'ordre de la liste. */
export async function getChristmasProducts(): Promise<Product[]> {
  const products = await getAllProducts();
  const byNumber = new Map<number, Product>();
  for (const p of products) {
    const n = teaNumber(p.title);
    if (n !== null && CHRISTMAS_NUMBERS.includes(n) && !byNumber.has(n)) byNumber.set(n, p);
  }
  return CHRISTMAS_NUMBERS.flatMap((n) => byNumber.get(n) ?? []);
}

/** Thés et infusions aux saveurs de fêtes (les plus gourmands d'abord), hors produits de Noël. */
export async function getFestiveProducts(exclude: Product[] = [], limit = 12): Promise<Product[]> {
  const products = await getAllProducts();
  const excluded = new Set(exclude.map((p) => p.handle));
  return products
    .filter(
      (p) =>
        !excluded.has(p.handle) &&
        p.vatRate === 0.055 &&
        p.images.length > 0 &&
        !/glac/i.test(normalizeText(`${p.productType} ${p.title}`))
    )
    .map((p) => ({ product: p, score: festiveScore(p) }))
    .filter(({ score }) => score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product);
}

/** Sélection de Noël complétée par des saveurs de fêtes. */
export async function getChristmasSelection(limit: number): Promise<Product[]> {
  const christmas = (await getChristmasProducts()).filter((p) => p.images.length > 0);
  if (christmas.length >= limit) return christmas.slice(0, limit);
  const festive = await getFestiveProducts(christmas, limit);
  return [...christmas, ...festive].slice(0, limit);
}
