import { PRODUCTS } from "@/lib/shopify/products";
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

const SANS_THEINE_UNIVERSES = ["infusions-rooibos", "bien-etre-detox"];

function scoreProduct(product: Product, answers: QuizAnswers): number {
  let score = 0;

  switch (answers.moment) {
    case "matin":
      if (product.type === "noir") score += 2;
      if (product.universe === "chai-latte") score += 1;
      break;
    case "apres-midi":
      if (product.type === "vert" || product.type === "blanc") score += 2;
      break;
    case "soir":
      if (product.need.includes("relaxation") || product.need.includes("sommeil")) score += 2;
      if (SANS_THEINE_UNIVERSES.includes(product.universe)) score += 1;
      break;
  }

  switch (answers.envie) {
    case "energie":
      if (product.need.includes("energie")) score += 3;
      break;
    case "relaxation":
      if (product.need.includes("relaxation") || product.need.includes("sommeil")) score += 3;
      break;
    case "digestion":
      if (product.need.includes("digestion") || product.need.includes("detox")) score += 3;
      break;
    case "gout":
      if (product.selections.includes("best-sellers")) score += 1;
      break;
  }

  switch (answers.saveur) {
    case "fruite":
      if (product.notes.includes("fruite") || product.notes.includes("gourmand")) score += 3;
      break;
    case "floral":
      if (product.notes.includes("floral")) score += 3;
      break;
    case "epice":
      if (product.notes.includes("epice")) score += 3;
      if (product.type === "noir") score += 1;
      break;
    case "frais":
      if (product.notes.includes("mentholé")) score += 3;
      if (product.type === "vert") score += 1;
      break;
  }

  switch (answers.theine) {
    case "avec":
      if (SANS_THEINE_UNIVERSES.includes(product.universe)) score -= 2;
      break;
    case "sans":
      score += SANS_THEINE_UNIVERSES.includes(product.universe) ? 3 : -3;
      break;
  }

  return score;
}

export function getRecommendations(answers: QuizAnswers, limit = 3): Product[] {
  const eligible = PRODUCTS.filter((p) => !p.accessoryType);
  return [...eligible]
    .map((product) => ({ product, score: scoreProduct(product, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.product);
}
