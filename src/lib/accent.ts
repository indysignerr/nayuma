import type { Accent } from "@/lib/shopify/types";

export const ACCENT_BG: Record<Accent, string> = {
  green: "bg-tea-green",
  black: "bg-tea-black",
  rooibos: "bg-tea-rooibos",
  white: "bg-tea-white",
  matcha: "bg-tea-matcha",
  chai: "bg-tea-chai",
  wellness: "bg-tea-wellness",
  gold: "bg-gold",
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
};

export const UNIVERSE_LABELS: Record<string, string> = {
  thes: "Thés",
  "infusions-rooibos": "Infusions & Rooibos",
  "thes-glaces": "Thés glacés",
  "chai-latte": "Chai Latté",
  "bien-etre-detox": "Bien-être & Detox",
  "coffrets-accessoires": "Coffrets & Accessoires",
};

export const TYPE_LABELS: Record<string, string> = {
  vert: "Thé vert",
  blanc: "Thé blanc",
  noir: "Thé noir",
  matcha: "Matcha",
};

export function categoryLabel(universe: string, type?: string): string {
  if (type && TYPE_LABELS[type]) return TYPE_LABELS[type];
  return UNIVERSE_LABELS[universe] ?? universe;
}
