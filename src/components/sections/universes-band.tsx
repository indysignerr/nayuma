import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ACCENT_BG } from "@/lib/accent";
import type { Accent } from "@/lib/shopify/types";

const LINES: { label: string; description: string; href: string; accent: Accent }[] = [
  {
    label: "Rituels Cheveux",
    description: "Chute, densité, brillance, cuir chevelu — une infusion pour chaque besoin capillaire.",
    href: "/collections/rituels-cheveux",
    accent: "cuivre",
  },
  {
    label: "Rituels Féminins",
    description: "Cycle, vitalité, équilibre hormonal — des infusions pour accompagner chaque saison.",
    href: "/collections/rituels-feminins",
    accent: "rose",
  },
];

export function UniversesBand() {
  return (
    <section className="bg-cream-deep/60 border-y border-cream-line">
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl mb-8">Deux lignes, un même soin</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 gap-px bg-cream-line border border-cream-line">
          {LINES.map((line, i) => (
            <ScrollReveal key={line.href} delay={i * 0.06}>
              <Link
                href={line.href}
                className="group flex flex-col justify-between gap-6 bg-cream px-8 py-10 hover:bg-cream-card transition-colors h-full"
              >
                <div>
                  <span className={`inline-block size-2 rounded-full mb-4 ${ACCENT_BG[line.accent]}`} aria-hidden />
                  <p className="font-display text-2xl mb-2">{line.label}</p>
                  <p className="text-sm text-ink-soft leading-relaxed max-w-sm">{line.description}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                  Découvrir
                  <ArrowRight className="size-4 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
