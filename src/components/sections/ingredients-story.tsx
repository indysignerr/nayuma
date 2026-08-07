import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const ACTIVES = [
  {
    index: "01/03",
    name: "Biotine végétale",
    tagline: "Fortifie la fibre de l'intérieur",
    description: "Cofacteur clé de la kératine naturelle, elle soutient la pousse et limite la casse à la racine.",
  },
  {
    index: "02/03",
    name: "Silice végétale (prêle)",
    tagline: "Densifie et renforce",
    description: "Reminéralise le bulbe capillaire et améliore l'élasticité de la fibre sur la durée.",
  },
  {
    index: "03/03",
    name: "Ortie",
    tagline: "Stimule le cuir chevelu",
    description: "Riche en fer et en silice, elle active la microcirculation et apaise les cuirs chevelus sensibles.",
  },
];

export function IngredientsStory() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
      <ScrollReveal className="flex flex-col items-center text-center mb-12">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">La composition</p>
        <h2 className="font-display text-3xl md:text-4xl max-w-lg">Trois actifs, zéro compromis</h2>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-px bg-cream-line border border-cream-line mb-10">
        {ACTIVES.map((active, i) => (
          <ScrollReveal key={active.name} delay={i * 0.06} className="bg-cream px-8 py-10">
            <p className="text-xs text-gold-dark tracking-widest mb-6">{active.index}</p>
            <h3 className="font-display text-2xl mb-2">{active.name}</h3>
            <p className="text-sm font-medium text-ink mb-3">{active.tagline}</p>
            <p className="text-sm text-ink-soft leading-relaxed">{active.description}</p>
          </ScrollReveal>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/ingredients"
          className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-gold-dark transition-colors"
        >
          Découvrir tous nos actifs <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
