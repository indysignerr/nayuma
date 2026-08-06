import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ACCENT_BG } from "@/lib/accent";
import type { Accent } from "@/lib/shopify/types";

const UNIVERSES: { label: string; href: string; accent: Accent }[] = [
  { label: "Thés", href: "/collections/thes", accent: "green" },
  { label: "Infusions & Rooibos", href: "/collections/infusions-rooibos", accent: "rooibos" },
  { label: "Thés glacés", href: "/collections/the-glace", accent: "matcha" },
  { label: "Chai Latté", href: "/collections/chai-latte", accent: "chai" },
  { label: "Bien-être & Detox", href: "/collections/bien-etre-detox", accent: "wellness" },
  { label: "Coffrets & Accessoires", href: "/collections/coffrets-accessoires", accent: "gold" },
];

export function UniversesBand() {
  return (
    <section className="bg-cream-deep/60 border-y border-cream-line">
      <div className="mx-auto max-w-[1240px] px-6 py-14">
        <ScrollReveal>
          <h2 className="font-display text-3xl md:text-4xl mb-8">Les univers de thé</h2>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream-line border border-cream-line">
          {UNIVERSES.map((u, i) => (
            <ScrollReveal key={u.href} delay={i * 0.04}>
              <Link
                href={u.href}
                className="group flex items-center justify-between gap-4 bg-cream px-6 py-6 hover:bg-cream-card transition-colors h-full"
              >
                <span className="flex items-center gap-3">
                  <span className={`size-2 rounded-full ${ACCENT_BG[u.accent]}`} aria-hidden />
                  <span className="font-display text-xl">{u.label}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
