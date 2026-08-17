import type { Accent, Product } from "@/lib/shopify/types";

export const ACCENT_BG: Record<Accent, string> = {
  green: "bg-tea-green",
  black: "bg-tea-black",
  rooibos: "bg-tea-rooibos",
  white: "bg-tea-white",
  matcha: "bg-tea-matcha",
  chai: "bg-tea-chai",
  wellness: "bg-tea-wellness",
  gold: "bg-gold",
  cuivre: "bg-tea-cuivre",
};

export const ACCENT_TEXT: Record<Accent, string> = {
  green: "text-tea-green",
  black: "text-tea-black",
  rooibos: "text-tea-rooibos",
  white: "text-tea-white",
  matcha: "text-tea-matcha",
  chai: "text-tea-chai",
  wellness: "text-tea-wellness",
  gold: "text-gold",
  cuivre: "text-tea-cuivre",
};

export const ACCENT_BORDER: Record<Accent, string> = {
  green: "border-tea-green",
  black: "border-tea-black",
  rooibos: "border-tea-rooibos",
  white: "border-tea-white",
  matcha: "border-tea-matcha",
  chai: "border-tea-chai",
  wellness: "border-tea-wellness",
  gold: "border-gold",
  cuivre: "border-tea-cuivre",
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();
}

export function accentForProduct(product: { productType: string; vendor: string; tags: string[] }): Accent {
  const haystack = normalize(`${product.productType} ${product.vendor} ${product.tags.join(" ")}`);

  if (haystack.includes("CAPILLAIRE") || haystack.includes("RACINE")) return "cuivre";
  if (haystack.includes("MATCHA")) return "matcha";
  if (haystack.includes("CHAI")) return "chai";
  if (haystack.includes("GLACE")) return "rooibos";
  if (haystack.includes("DETOX") || haystack.includes("BIEN-ETRE") || haystack.includes("FEEL GOOD")) return "wellness";
  if (haystack.includes("NOIR")) return "black";
  if (haystack.includes("BLANC")) return "white";
  if (haystack.includes("VERT")) return "green";
  if (haystack.includes("ROOIBOS") || haystack.includes("INFUSION")) return "rooibos";
  return "gold";
}

export function categoryLabel(product: Product): string {
  return product.productType || product.vendor;
}
