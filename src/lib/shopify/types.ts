import type { Dosage } from "@/lib/b2b";

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ShopifyImage = {
  url: string;
  altText: string | null;
};

export type Accent =
  | "green"
  | "black"
  | "rooibos"
  | "white"
  | "matcha"
  | "chai"
  | "wellness"
  | "gold"
  | "cuivre";

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  compareAtPrice?: Money | null;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  tags: string[];
  descriptionHtml: string;
  description: string;
  images: ShopifyImage[];
  variants: ProductVariant[];
  minPrice: Money;
  maxPrice: Money;
  collectionHandles: string[];
  accent: Accent;
  fineTea: boolean;
  isGiftCard: boolean;
  /** Taux de TVA appliqué au prix TTC Shopify (0 pour les cartes cadeaux). */
  vatRate: number;
  /** Dosage conseillé lu dans la fiche, pour le coût à la tasse. */
  dosage: Dosage | null;
};

export type ProductPreview = Pick<Product, "handle" | "title" | "images" | "variants" | "accent" | "fineTea" | "vatRate">;

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image?: ShopifyImage;
};
