import Link from "next/link";
import { ArrowRight, Thermometer, Timer } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const STEPS = [
  { type: "Thé vert", temp: "75°C", time: "2 à 3 min" },
  { type: "Thé noir", temp: "95°C", time: "3 à 5 min" },
  { type: "Rooibos & infusions", temp: "100°C", time: "5 à 8 min" },
];

export function EditorialGuide() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">L&apos;univers du thé</p>
          <h2 className="font-display text-3xl md:text-4xl mb-5 leading-tight">
            L&apos;art de l&apos;infusion, expliqué simplement
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed mb-8 max-w-md">
            Température de l&apos;eau, temps d&apos;infusion, quantité de feuilles : chaque détail compte pour révéler
            le plein potentiel aromatique d&apos;un thé. Notre guide vous accompagne, thé par thé.
          </p>
          <Link
            href="/guide-du-the"
            className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-gold-dark transition-colors"
          >
            Découvrir le guide complet <ArrowRight className="size-4" />
          </Link>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="flex flex-col gap-4">
          {STEPS.map((step) => (
            <div key={step.type} className="flex items-center justify-between bg-cream-card border border-cream-line rounded-sm px-6 py-5">
              <span className="font-display text-lg">{step.type}</span>
              <div className="flex items-center gap-5 text-sm text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <Thermometer className="size-4" /> {step.temp}
                </span>
                <span className="flex items-center gap-1.5">
                  <Timer className="size-4" /> {step.time}
                </span>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
