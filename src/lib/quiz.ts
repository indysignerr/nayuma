import { getAllProducts } from "@/lib/shopify/products";
import type { Product } from "@/lib/shopify/types";

export type Moment = "matin" | "apres-midi" | "soir" | "tout-moment";
export type Envie = "energie" | "relaxation" | "digestion" | "gout";
export type Saveur = "fruite" | "floral" | "epice" | "frais";
export type Theine = "avec" | "sans" | "peu-importe";

export type QuizAnswers = {
  moment?: Moment;
  envie?: Envie;
  saveur?: Saveur;
  theine?: Theine;
};

export const QUIZ_STEPS = [
  {
    key: "moment" as const,
    question: "Quel moment de la journée vous correspond le mieux ?",
    options: [
      { value: "matin" as const, label: "Le matin, pour démarrer" },
      { value: "apres-midi" as const, label: "L'après-midi, pour une pause" },
      { value: "soir" as const, label: "Le soir, pour se détendre" },
      { value: "tout-moment" as const, label: "À tout moment de la journée" },
    ],
  },
  {
    key: "envie" as const,
    question: "Qu'est-ce qui vous fait envie aujourd'hui ?",
    options: [
      { value: "energie" as const, label: "De l'énergie" },
      { value: "relaxation" as const, label: "Relaxation ou sommeil" },
      { value: "digestion" as const, label: "Digestion ou detox" },
      { value: "gout" as const, label: "Simplement un bon goût" },
    ],
  },
  {
    key: "saveur" as const,
    question: "Quelles saveurs vous attirent le plus ?",
    options: [
      { value: "fruite" as const, label: "Fruité & gourmand" },
      { value: "floral" as const, label: "Floral & délicat" },
      { value: "epice" as const, label: "Épicé & corsé" },
      { value: "frais" as const, label: "Frais & mentholé" },
    ],
  },
  {
    key: "theine" as const,
    question: "Avec ou sans théine ?",
    options: [
      { value: "avec" as const, label: "Avec théine, ça ne me dérange pas" },
      { value: "sans" as const, label: "Sans théine de préférence" },
      { value: "peu-importe" as const, label: "Peu importe" },
    ],
  },
];

const SANS_THEINE_TYPES = ["INFUSIONS & ROOIBOS", "BIEN ETRE", "BIEN ETRE BEST SELLERS", "INFUSION FRUITE"];
const SOMMEIL_HANDLES = ["sommeil", "bien-etre-sommeil", "infusions-rooibos-sommeil"];
const ENERGIE_HANDLES = ["energie", "bien-etre-energie", "infusion-rooibos-energie"];
const RELAXATION_HANDLES = ["relaxation", "bien-etre-relaxation", "infusion-rooibos-relaxation", ...SOMMEIL_HANDLES];
const DIGESTION_HANDLES = ["digestion", "bien-etre-digestion", "infusions-rooibos-digestion"];
const ACCESSORY_TYPES = ["coffret & accessoires"];

function hasAny(handles: string[], targets: string[]): boolean {
  return targets.some((t) => handles.includes(t));
}

function scoreProduct(product: Product, answers: QuizAnswers): number {
  let score = 0;
  const type = product.productType.toUpperCase();
  const handles = product.collectionHandles;

  switch (answers.moment) {
    case "matin":
      if (type.includes("NOIR") || type.includes("CHAI")) score += 2;
      break;
    case "apres-midi":
      if (type.includes("VERT")) score += 2;
      if (type.includes("MATCHA")) score += 1;
      break;
    case "soir":
      if (hasAny(handles, RELAXATION_HANDLES) || handles.includes("bien-etre-detox")) score += 2;
      if (type.includes("INFUSIONS")) score += 1;
      break;
  }

  switch (answers.envie) {
    case "energie":
      if (hasAny(handles, ENERGIE_HANDLES)) score += 3;
      break;
    case "relaxation":
      if (hasAny(handles, RELAXATION_HANDLES)) score += 3;
      break;
    case "digestion":
      if (hasAny(handles, DIGESTION_HANDLES) || handles.includes("bien-etre-detox-1")) score += 3;
      break;
    case "gout":
      if (handles.includes("best-sellers") || handles.includes("best-sellers-infusions-rooibos")) score += 1;
      break;
  }

  switch (answers.saveur) {
    case "fruite":
      if (handles.includes("fruites") || handles.includes("gourmand") || handles.includes("agrumes")) score += 3;
      break;
    case "floral":
      if (handles.includes("florales") || handles.includes("jasmiin")) score += 3;
      break;
    case "epice":
      if (handles.includes("epices")) score += 3;
      if (type.includes("NOIR")) score += 1;
      break;
    case "frais":
      if (handles.includes("menthe")) score += 3;
      if (type.includes("VERT")) score += 1;
      break;
  }

  switch (answers.theine) {
    case "avec":
      if (SANS_THEINE_TYPES.some((t) => type.includes(t))) score -= 2;
      break;
    case "sans":
      score += SANS_THEINE_TYPES.some((t) => type.includes(t)) ? 3 : -3;
      break;
  }

  return score;
}

export async function getRecommendations(answers: QuizAnswers, limit = 3): Promise<Product[]> {
  const products = await getAllProducts();
  const eligible = products.filter((p) => !ACCESSORY_TYPES.includes(p.productType.toLowerCase()) && p.variants.length > 0);
  return [...eligible]
    .map((product) => ({ product, score: scoreProduct(product, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.product);
}
