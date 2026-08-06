import { productSpecs as rawProductSpecs } from "./product-specs.mjs";
import { NOTE_LABELS, ORIGIN_LABELS } from "./collections";
import type {
  Product,
  WeightVariant,
  Preparation,
  Money,
  Universe,
  TeaType,
  AromaticNote,
  Origin,
  Need,
  Selection,
  AccessoryType,
  Accent,
} from "./types";

type ProductSpec = {
  handle: string;
  title: string;
  universe: Universe;
  type?: TeaType;
  origin?: Origin;
  notes: AromaticNote[];
  need: Need[];
  selections: Selection[];
  accessoryType?: AccessoryType;
  fineTea: boolean;
  accent: Accent;
  basePrice100: number;
  flatPrice?: boolean;
};

const productSpecs = rawProductSpecs as ProductSpec[];

function money(amount: number): Money {
  return { amount: amount.toFixed(2), currencyCode: "EUR" };
}

function preparationFor(universe: string, type?: string): Preparation | undefined {
  switch (type) {
    case "vert":
      return { temperatureC: 75, minutesMin: 2, minutesMax: 3, advice: "Une eau trop chaude brûle les feuilles et amérit l'infusion." };
    case "blanc":
      return { temperatureC: 75, minutesMin: 4, minutesMax: 6, advice: "Laissez le temps aux bourgeons de se déployer pleinement." };
    case "noir":
      return { temperatureC: 95, minutesMin: 3, minutesMax: 5, advice: "Idéal nature ou avec un nuage de lait." };
    case "matcha":
      return { temperatureC: 70, minutesMin: 0, minutesMax: 0, advice: "Fouettez en zigzag jusqu'à l'obtention d'une mousse fine, sans faire bouillir l'eau." };
  }
  switch (universe) {
    case "infusions-rooibos":
    case "bien-etre-detox":
      return { temperatureC: 100, minutesMin: 5, minutesMax: 8, advice: "Plus l'infusion est longue, plus les bienfaits se révèlent." };
    case "chai-latte":
      return { temperatureC: 95, minutesMin: 4, minutesMax: 5, advice: "Infusez puis allongez avec le lait de votre choix, chaud ou mousseux." };
    case "thes-glaces":
      return { temperatureC: 90, minutesMin: 5, minutesMax: 5, advice: "Infusez chaud puis laissez refroidir sur glace, ou optez pour l'infusion à froid (4h au réfrigérateur)." };
    default:
      return undefined;
  }
}

function describe(spec: (typeof productSpecs)[number]): { short: string; html: string; composition: string } {
  const noteWords = spec.notes.map((n: string) => NOTE_LABELS[n]?.toLowerCase()).filter(Boolean);
  const originPhrase = spec.origin ? `récolté ${spec.origin === "inde" ? "en" : "au"} ${ORIGIN_LABELS[spec.origin]}` : "sélectionné avec soin par notre maison";
  const noteClause = noteWords.length ? ` aux notes ${noteWords.join(", ")}` : "";
  const short = `${spec.title}${noteClause ? "," + noteClause : ""}.`;
  const html = `<p>${spec.title}, ${originPhrase}${noteClause}. Une sélection pensée pour révéler toute la richesse aromatique de la feuille, du jardin jusqu'à votre tasse.</p><p>Chaque lot est goûté et validé par notre atelier avant d'intégrer la collection NAYUMA.</p>`;
  const composition = spec.universe === "coffrets-accessoires" ? "Voir détail dans le coffret." : `100% ingrédients naturels. ${noteWords.length ? `Arômes naturels de ${noteWords.join(" et ")}.` : ""}`;
  return { short, html, composition };
}

function buildVariants(spec: (typeof productSpecs)[number]): WeightVariant[] {
  if ((spec as { flatPrice?: boolean }).flatPrice) {
    return [
      {
        id: `${spec.handle}-unique`,
        weight: "Unique",
        sku: `NAY-${spec.handle.toUpperCase()}`,
        price: money(spec.basePrice100),
        availableForSale: true,
      },
    ];
  }
  const p100 = spec.basePrice100;
  const p500 = Math.round(p100 * 4.3 * 2) / 2 - 0.05;
  const p1kg = Math.round(p100 * 7.6 * 2) / 2 - 0.05;
  return [
    { id: `${spec.handle}-100g`, weight: "100g", sku: `NAY-${spec.handle.toUpperCase()}-100`, price: money(p100), availableForSale: true },
    { id: `${spec.handle}-500g`, weight: "500g", sku: `NAY-${spec.handle.toUpperCase()}-500`, price: money(p500), availableForSale: true },
    { id: `${spec.handle}-1kg`, weight: "1kg", sku: `NAY-${spec.handle.toUpperCase()}-1000`, price: money(p1kg), availableForSale: true },
  ];
}

function ratingFor(handle: string): { rating: number; reviewCount: number } {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) hash = (hash * 31 + handle.charCodeAt(i)) % 9973;
  const rating = 4.4 + (hash % 6) / 10;
  const reviewCount = 12 + (hash % 180);
  return { rating: Math.min(5, Math.round(rating * 10) / 10), reviewCount };
}

export const PRODUCTS: Product[] = productSpecs.map((spec) => {
  const { short, html, composition } = describe(spec);
  const { rating, reviewCount } = ratingFor(spec.handle);
  return {
    id: `gid://nayuma/Product/${spec.handle}`,
    handle: spec.handle,
    title: spec.title,
    vendor: "NAYUMA",
    universe: spec.universe,
    type: spec.type,
    notes: spec.notes,
    origin: spec.origin,
    need: spec.need,
    selections: spec.selections,
    accessoryType: spec.accessoryType,
    fineTea: spec.fineTea,
    accent: spec.accent,
    shortDescription: short,
    descriptionHtml: html,
    composition,
    preparation: preparationFor(spec.universe, spec.type),
    images: [
      { url: `/images/products/${spec.handle}.svg`, altText: spec.title },
      { url: `/images/products/${spec.handle}.svg`, altText: `${spec.title} — packaging NAYUMA` },
    ],
    variants: buildVariants(spec),
    rating,
    reviewCount,
  } satisfies Product;
});

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}

export function getFineTeaProducts(): Product[] {
  return PRODUCTS.filter((p) => p.fineTea);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.selections.includes("best-sellers")).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.handle !== product.handle && (p.universe === product.universe || p.type === product.type)
  ).slice(0, limit);
}
