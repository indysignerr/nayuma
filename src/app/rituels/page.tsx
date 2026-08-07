import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Le rituel NAYUMA",
  description: "Choisir, infuser, ressentir — le protocole NAYUMA pour intégrer le rituel infusé à votre quotidien.",
};

const STEPS = [
  {
    number: "01",
    title: "Choisir",
    text: "Identifiez votre priorité du moment — capillaire ou féminine — et laissez-vous guider par nos rituels.",
  },
  {
    number: "02",
    title: "Infuser",
    text: "Laissez infuser 8 à 10 minutes à couvert, dans une eau à 95°C, pour préserver l'intégralité des actifs botaniques.",
  },
  {
    number: "03",
    title: "Ressentir",
    text: "Intégrez le rituel à votre quotidien : les bienfaits d'une infusion botanique se révèlent dans la durée, pas en un jour.",
  },
];

export default function RituelsPage() {
  return (
    <main>
      <section className="mx-auto max-w-[1000px] px-6 py-16 md:py-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">Le protocole NAYUMA</p>
        <h1 className="font-display text-4xl md:text-5xl mb-6 leading-tight">
          Trois gestes, <em className="not-italic text-gold-dark">un rituel</em>
        </h1>
        <p className="text-sm text-ink-soft max-w-lg mx-auto leading-relaxed">
          La sélection, l&apos;infusion, la régularité. Le protocole complet derrière chaque rituel NAYUMA — des
          gestes simples, des formules botaniques, un résultat qui s&apos;installe dans la durée.
        </p>
      </section>

      <section className="border-t border-cream-line bg-cream-card">
        <div className="mx-auto max-w-[1000px] px-6 py-16 grid md:grid-cols-3 gap-8">
          {STEPS.map((step) => (
            <div key={step.number}>
              <p className="font-display text-4xl text-gold-dark mb-4">{step.number}</p>
              <h2 className="font-display text-2xl mb-3">{step.title}</h2>
              <p className="text-sm text-ink-soft leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1000px] px-6 py-16 text-center">
        <Link
          href="/collections/rituels-cheveux"
          className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-gold-dark transition-colors"
        >
          Découvrir les rituels <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}
