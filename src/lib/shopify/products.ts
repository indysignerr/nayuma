import { productSpecs as rawProductSpecs } from "./product-specs.mjs";
import type {
  Product,
  WeightVariant,
  Preparation,
  Money,
  ProductCategory,
  RitualLine,
  HairNeed,
  FeminineNeed,
  Accent,
} from "./types";

type ProductSpec = {
  handle: string;
  title: string;
  category: ProductCategory;
  line?: RitualLine;
  hairNeeds: HairNeed[];
  feminineNeeds: FeminineNeed[];
  accent: Accent;
  basePrice: number;
  actifs: string;
  flatFormat?: string;
  featured?: boolean;
};

const FEATURED_HANDLES = [
  "rituel-chute-fortification",
  "rituel-douce-lune",
  "rituel-densite-volume",
  "rituel-harmonie",
];

const productSpecs = rawProductSpecs as ProductSpec[];

function money(amount: number): Money {
  return { amount: amount.toFixed(2), currencyCode: "EUR" };
}

function preparationFor(category: ProductCategory): Preparation | undefined {
  if (category !== "infusion") return undefined;
  return {
    temperatureC: 95,
    minutesMin: 8,
    minutesMax: 10,
    advice: "Laissez infuser à couvert pour préserver les principes actifs les plus volatils.",
  };
}

const HAIR_NEED_LABELS: Record<HairNeed, string> = {
  chute: "anti-chute",
  densite: "densité",
  brillance: "brillance",
  "cuir-chevelu": "cuir chevelu",
  "anti-stress": "anti-stress",
  eclat: "éclat",
};

const FEMININE_NEED_LABELS: Record<FeminineNeed, string> = {
  cycle: "cycle féminin",
  premenstruel: "confort prémenstruel",
  vitalite: "vitalité féminine",
  intime: "confort intime",
  hormonal: "équilibre hormonal",
};

function describe(spec: ProductSpec): { short: string; html: string } {
  const needLabels = [
    ...spec.hairNeeds.map((n) => HAIR_NEED_LABELS[n]),
    ...spec.feminineNeeds.map((n) => FEMININE_NEED_LABELS[n]),
  ];
  const purpose = needLabels.length ? needLabels.join(" et ") : "votre rituel bien-être";
  const short = `${spec.title}, pensé pour ${purpose}.`;
  const html =
    spec.category === "infusion"
      ? `<p>${spec.title} associe ${spec.actifs.toLowerCase()} dans une infusion botanique pensée pour ${purpose}. Un rituel à intégrer chaque jour, en toute simplicité.</p><p>Chaque lot est composé avec soin par notre atelier avant d'intégrer la collection NAYUMA.</p>`
      : `<p>${spec.title} associe ${spec.actifs.toLowerCase()} pour accompagner ${purpose}. Une formule courte, sans superflu.</p>`;
  return { short, html };
}

function buildVariants(spec: ProductSpec): WeightVariant[] {
  const format = spec.flatFormat ?? "80 g";
  return [
    {
      id: `${spec.handle}-default`,
      format,
      sku: `NAY-${spec.handle.toUpperCase()}`,
      price: money(spec.basePrice),
      availableForSale: true,
    },
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
  const { short, html } = describe(spec);
  const { rating, reviewCount } = ratingFor(spec.handle);
  return {
    id: `gid://nayuma/Product/${spec.handle}`,
    handle: spec.handle,
    title: spec.title,
    vendor: "NAYUMA",
    category: spec.category,
    line: spec.line,
    hairNeeds: spec.hairNeeds,
    feminineNeeds: spec.feminineNeeds,
    accent: spec.accent,
    shortDescription: short,
    descriptionHtml: html,
    actifs: spec.actifs,
    preparation: preparationFor(spec.category),
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

export function getFeaturedProducts(limit = 4): Product[] {
  return FEATURED_HANDLES.map((h) => getProductByHandle(h)).filter((p): p is Product => Boolean(p)).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter((p) => {
    if (p.handle === product.handle) return false;
    if (p.category !== product.category) return false;
    if (product.line && p.line === product.line) return true;
    const sharedHairNeed = p.hairNeeds.some((n) => product.hairNeeds.includes(n));
    const sharedFeminineNeed = p.feminineNeeds.some((n) => product.feminineNeeds.includes(n));
    return sharedHairNeed || sharedFeminineNeed;
  }).slice(0, limit);
}
