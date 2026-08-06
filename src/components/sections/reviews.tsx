import { Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const TESTIMONIALS = [
  {
    name: "Camille R.",
    text: "Le Gyokuro Impérial est d'une finesse rare. On sent vraiment la différence avec les grandes surfaces.",
  },
  {
    name: "Thomas L.",
    text: "Les échantillons offerts m'ont fait découvrir le rooibos vanille, devenu mon rituel du soir.",
  },
  {
    name: "Sophie M.",
    text: "Coffret FINE TEA offert à ma mère : l'emballage et la qualité sont dignes d'une vraie maison de thé.",
  },
];

export function Reviews() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
      <ScrollReveal className="flex flex-col items-center text-center mb-10">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-5 fill-gold text-gold" />
          ))}
        </div>
        <p className="font-display text-2xl">4.8/5 sur plus de 2 400 avis clients</p>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 0.06} className="bg-cream-card border border-cream-line rounded-sm p-6">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="size-3.5 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-sm text-ink-soft leading-relaxed mb-4">&laquo; {t.text} &raquo;</p>
            <p className="text-sm font-medium">{t.name}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
