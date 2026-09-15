import type { Money } from "./types";

const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatMoney(money: Money): string {
  return formatter.format(Number(money.amount));
}

/** Demande au CDN Shopify une image redimensionnée (les originaux font plusieurs Mo, et l'export statique n'optimise pas). */
export function sizedImageUrl(url: string, width: number): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "cdn.shopify.com") return url;
    parsed.searchParams.set("width", String(width));
    return parsed.toString();
  } catch {
    return url;
  }
}
