import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function InstagramTeaser() {
  return (
    <section className="border-y border-cream-line bg-cream-card">
      <div className="mx-auto max-w-[1240px] px-6 py-12 flex flex-col items-center text-center gap-4">
        <ScrollReveal className="flex flex-col items-center gap-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
          </svg>
          <p className="font-display text-2xl">
            Suivez-nous <span className="text-gold-dark">@nayuma_tea</span>
          </p>
          <p className="text-sm text-ink-soft max-w-md">
            Nos dernières récoltes, rituels et coulisses de la maison sont à retrouver chaque semaine sur Instagram.
          </p>
          <Link
            href="https://www.instagram.com/nayuma_tea/"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline underline-offset-4 hover:text-gold-dark transition-colors"
          >
            Voir le compte Instagram →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
