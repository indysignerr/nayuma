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
      title: e.node.title,
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
