import { SHOPIFY_AMOUNT_UNIT } from "@/lib/b2b";

// Doit refléter les tarifs configurés dans Shopify (Paramètres > Expédition et livraison) :
// c'est Shopify qui calcule les frais réels au paiement.
export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING_FEE = 7.99;

function euros(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}

export const FREE_SHIPPING_THRESHOLD_LABEL = `${euros(FREE_SHIPPING_THRESHOLD)} ${SHOPIFY_AMOUNT_UNIT}`;
export const STANDARD_SHIPPING_LABEL = euros(STANDARD_SHIPPING_FEE);
export const FREE_SHIPPING_LABEL = `Livraison offerte dès ${FREE_SHIPPING_THRESHOLD_LABEL} d'achat`;
export const SHIPPING_DELAY_LABEL = "8 à 10 jours ouvrés";
