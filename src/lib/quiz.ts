import { PRODUCTS } from "@/lib/shopify/products";
import { HAIR_NEED_LABELS, FEMININE_NEED_LABELS } from "@/lib/shopify/collections";
import type { Product, RitualLine, HairNeed, FeminineNeed } from "@/lib/shopify/types";

export type QuizAnswers = {
  line?: RitualLine;
  need?: HairNeed | FeminineNeed;
};

export const LINE_STEP = {
  key: "line" as const,
  question: "Quel est votre besoin principal aujourd'hui ?",
  options: [
    { value: "cheveux" as const, label: "Prendre soin de mes cheveux" },
    { value: "feminin" as const, label: "Un rituel de bien-être féminin" },
  ],
};

export const HAIR_NEED_STEP = {
  key: "need" as const,
  question: "Quelle est votre priorité capillaire ?",
  options: (Object.keys(HAIR_NEED_LABELS) as HairNeed[]).map((value) => ({
    value,
    label: HAIR_NEED_LABELS[value],
  })),
};

export const FEMININE_NEED_STEP = {
  key: "need" as const,
  question: "Quel accompagnement recherchez-vous ?",
  options: (Object.keys(FEMININE_NEED_LABELS) as FeminineNeed[]).map((value) => ({
    value,
    label: FEMININE_NEED_LABELS[value],
  })),
};

export function getRecommendations(answers: QuizAnswers, limit = 3): Product[] {
  if (!answers.line || !answers.need) return [];

  const pool = PRODUCTS.filter((p) => p.category === "infusion" && p.line === answers.line);

  const scored = pool.map((product) => {
    const matches =
      answers.line === "cheveux"
        ? product.hairNeeds.includes(answers.need as HairNeed)
        : product.feminineNeeds.includes(answers.need as FeminineNeed);
    return { product, score: matches ? 1 : 0 };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.product);
}
