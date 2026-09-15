// Règles B2B partagées entre le build (mapping Shopify) et les composants client.

const WEIGHT_PATTERN = /(\d+(?:[.,]\d+)?)\s*(kg|grs?|g)\b/i;

function toNumber(value: string): number {
  return Number(value.replace(",", "."));
}

/** Poids en kg lu dans le titre d'une variante ("Pochette Vrac 1kg", "100 Grs"), ou null. */
export function variantWeightKg(title: string): number | null {
  const match = title.match(WEIGHT_PATTERN);
  if (!match) return null;
  const value = toNumber(match[1]);
  return match[2].toLowerCase() === "kg" ? value : value / 1000;
}

/** Seuls les formats 1kg sont vendus. Les variantes sans poids (coffrets, accessoires) restent. */
export function isB2BVariant(title: string): boolean {
  const weight = variantWeightKg(title);
  return weight === null || weight === 1;
}

// Les prix Shopify sont saisis TTC.
export const VAT_FOOD = 0.055;
export const VAT_STANDARD = 0.2;

/** Thés, infusions, matcha, chai : 5,5 %. Coffrets (théière incluse) et accessoires : 20 %. Cartes cadeaux : hors TVA. */
export function vatRateFor(product: { productType: string; title: string; isGiftCard: boolean }): number {
  if (product.isGiftCard) return 0;
  const label = `${product.productType} ${product.title}`.toLowerCase();
  if (label.includes("coffret") || label.includes("accessoire")) return VAT_STANDARD;
  return VAT_FOOD;
}

export function amountHT(amountTTC: number, vatRate: number): number {
  return amountTTC / (1 + vatRate);
}

export type Dosage = { gramsPerCup: number; cupMl: number };

const TEA_CUP_ML = 250;
// "Dosage : 15-18 g/L", "Dosage: 18/25g/L", "Dosage : 10g/L"
const GRAMS_PER_LITRE =
  /dosage\s*:?\s*(\d+(?:[.,]\d+)?)\s*(?:g|grs?)?\s*(?:[-\/à]\s*(\d+(?:[.,]\d+)?))?\s*(?:g|grs?)?\s*\/\s*l/i;
// Chai latte : "Chaud : Mélangez 1 à 2 c à café (env 6 grs) de … dans 150 ml de lait"
const LATTE_SERVING = /chaud\s*:[^()]*\(\s*env\.?\s*(\d+(?:[.,]\d+)?)\s*(?:g|grs?)\s*\)[^.]*?(\d+)\s*ml/i;

/** Dosage conseillé lu dans la fiche Shopify, ou null s'il n'est pas indiqué. */
export function parseDosage(description: string): Dosage | null {
  const latte = description.match(LATTE_SERVING);
  if (latte) {
    return { gramsPerCup: toNumber(latte[1]), cupMl: Number(latte[2]) };
  }

  const tea = description.match(GRAMS_PER_LITRE);
  if (!tea) return null;
  const low = toNumber(tea[1]);
  const high = tea[2] ? toNumber(tea[2]) : low;
  const gramsPerLitre = (low + high) / 2;
  if (gramsPerLitre < 5 || gramsPerLitre > 40) return null;
  return { gramsPerCup: (gramsPerLitre * TEA_CUP_ML) / 1000, cupMl: TEA_CUP_ML };
}

export function costPerCup(priceTTC: number, weightKg: number, dosage: Dosage) {
  const cups = (weightKg * 1000) / dosage.gramsPerCup;
  return { cups, perCup: priceTTC / cups, cupMl: dosage.cupMl };
}

export type CompanyInfo = { name: string; siret: string; vatNumber: string };

export function normalizeCompanyId(value: string): string {
  return value.replace(/[\s.-]/g, "").toUpperCase();
}

/** Erreurs de format, uniquement sur les champs remplis (tous sont facultatifs). */
export function companyErrors(company: CompanyInfo): Partial<Record<keyof CompanyInfo, string>> {
  const errors: Partial<Record<keyof CompanyInfo, string>> = {};
  const siret = normalizeCompanyId(company.siret);
  const vatNumber = normalizeCompanyId(company.vatNumber);
  if (siret && !/^\d{14}$/.test(siret)) errors.siret = "Le SIRET comporte 14 chiffres.";
  if (vatNumber && !/^[A-Z]{2}[A-Z0-9]{2,13}$/.test(vatNumber)) {
    errors.vatNumber = "Format attendu : code pays + numéro (ex. FR12345678901).";
  }
  return errors;
}
