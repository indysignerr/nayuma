import type { Metadata } from "next";
import { Thermometer, Timer } from "lucide-react";

export const metadata: Metadata = {
  title: "Guide du thé — température et temps d'infusion",
  description: "Le guide NAYUMA pour infuser chaque thé dans les règles de l'art : température, temps d'infusion et conseils de préparation.",
};

const GUIDE = [
  {
    type: "Thé vert",
    temp: "70 à 80°C",
    time: "2 à 3 min",
    advice:
      "Une eau trop chaude brûle les feuilles et développe l'amertume. Laissez l'eau bouillante refroidir quelques minutes avant l'infusion.",
  },
  {
    type: "Thé blanc",
    temp: "75°C",
    time: "4 à 6 min",
    advice: "Le moins transformé des thés mérite une infusion plus longue et douce pour révéler ses arômes délicats.",
  },
  {
    type: "Thé noir",
    temp: "90 à 95°C",
    time: "3 à 5 min",
    advice: "Robuste, il supporte une eau proche de l'ébullition. Idéal nature ou avec un nuage de lait.",
  },
  {
    type: "Matcha",
    temp: "70°C",
    time: "Fouetté, non infusé",
    advice: "Tamisez la poudre puis fouettez en zigzag jusqu'à l'obtention d'une mousse fine, sans faire bouillir l'eau.",
  },
  {
    type: "Rooibos & infusions",
    temp: "100°C",
    time: "5 à 8 min",
    advice: "Sans théine, le rooibos supporte une infusion longue : plus le temps de contact est long, plus les bienfaits se révèlent.",
  },
  {
    type: "Chai Latté",
    temp: "90 à 95°C",
    time: "4 à 5 min",
    advice: "Infusez le thé épicé puis allongez avec le lait de votre choix, chaud ou mousseux, pour un chai latté onctueux.",
  },
];

export default function GuideDuThePage() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4 text-center">L&apos;univers du thé</p>
      <h1 className="font-display text-4xl md:text-5xl text-center mb-6">Le guide de l&apos;infusion</h1>
      <p className="text-sm text-ink-soft leading-relaxed text-center max-w-xl mx-auto mb-14">
        Température de l&apos;eau, temps de contact, quantité de feuilles : chaque détail compte pour révéler le
        plein potentiel aromatique d&apos;un thé. Voici nos recommandations, thé par thé.
      </p>

      <div className="flex flex-col gap-4">
        {GUIDE.map((g) => (
          <div key={g.type} className="border border-cream-line rounded-sm p-6 bg-cream-card">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h2 className="font-display text-2xl">{g.type}</h2>
              <div className="flex items-center gap-5 text-sm text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="size-4" /> {g.temp}
                </span>
                <span className="flex items-center gap-1.5">
                  <Timer className="size-4" /> {g.time}
                </span>
              </div>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">{g.advice}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
