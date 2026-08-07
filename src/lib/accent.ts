import type { Accent, ProductCategory, RitualLine } from "@/lib/shopify/types";

export const ACCENT_BG: Record<Accent, string> = {
  rose: "bg-tone-rose",
  terracotta: "bg-tone-terracotta",
  sauge: "bg-tone-sauge",
  brun: "bg-tone-brun",
  creme: "bg-tone-creme",
  taupe: "bg-tone-taupe",
  cuivre: "bg-tone-cuivre",
  or: "bg-tone-or",
  "vert-fonce": "bg-tone-vert-fonce",
};

export const ACCENT_TEXT: Record<Accent, string> = {
  rose: "text-tone-rose",
  terracotta: "text-tone-terracotta",
  sauge: "text-tone-sauge",
  brun: "text-tone-brun",
  creme: "text-tone-creme",
  taupe: "text-tone-taupe",
  cuivre: "text-tone-cuivre",
  or: "text-tone-or",
  "vert-fonce": "text-tone-vert-fonce",
};

export function categoryLabel(category: ProductCategory, line?: RitualLine): string {
  if (category === "cosmetique") return "Cosmétique";
  if (line === "cheveux") return "Rituel Cheveux";
  if (line === "feminin") return "Rituel Féminin";
  return "Infusion";
}
