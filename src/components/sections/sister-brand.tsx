import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const MANIKA_URL = "https://manika-bkh.pages.dev";

export function SisterBrand() {
  return (
    <section className="border-y border-cream-line bg-cream-deep/60">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">Deux maisons, un même objectif</p>
          <h2 className="font-display text-3xl md:text-4xl max-w-xl mx-auto">
            NAYUMA nourrit vos cheveux <em className="not-italic text-gold-dark">de l&apos;intérieur</em>. MANIKA.LAB
            en prend soin <em className="not-italic text-gold-dark">de l&apos;extérieur</em>.
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 border border-cream-line bg-cream">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-cream-line">
            <Image src="/images/logo-nayuma.svg" alt="NAYUMA" width={160} height={52} className="h-9 w-auto mb-5" />
            <p className="text-xs uppercase tracking-widest text-gold-dark mb-3">L&apos;intérieur</p>
            <p className="text-sm text-ink-soft leading-relaxed">
              Des infusions botaniques à boire chaque jour, pour nourrir le cheveu et accompagner le bien-être
              féminin de l&apos;intérieur.
            </p>
          </div>

          <div className="p-8 md:p-10 flex flex-col">
            <Image src="/images/logo-manika.svg" alt="MANIKA.LAB" width={160} height={42} className="h-7 w-auto mb-5 text-ink" />
            <p className="text-xs uppercase tracking-widest text-tone-taupe mb-3">L&apos;extérieur</p>
            <p className="text-sm text-ink-soft leading-relaxed mb-6">
              Une cosmétique capillaire de niveau professionnel, formulée en Italie — coloration, soin et coiffage,
              pour prendre soin du cheveu de l&apos;extérieur.
            </p>
            <a
              href={MANIKA_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-gold-dark transition-colors"
            >
              Découvrir MANIKA.LAB <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>

        <p className="text-xs text-ink-soft text-center mt-6">
          NAYUMA et MANIKA.LAB appartiennent à la même maison — deux marques, un seul soin du cheveu.
        </p>
      </div>
    </section>
  );
}
