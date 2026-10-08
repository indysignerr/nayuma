import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// Nouvelle gamme Bombay Delight : passer le lien de la collection Shopify quand elle sera en ligne.
const BOMBAY_DELIGHT_HREF: string | null = null;

export function BombayDelightPromo() {
  const content = (
    <>
      <Image
        src="/images/promo/bombay-delight.webp"
        alt="Sirops Bombay Delight Chai et Matcha, avec un chai latte et un matcha latte"
        width={955}
        height={326}
        sizes="(max-width: 1240px) 100vw, 1192px"
        className="h-auto w-full"
      />
      {/* « NAYUMA » en doré, à droite du logo Bombay Delight de l'image. */}
      <span
        aria-hidden
        className="absolute left-[31%] top-[11%] font-display font-semibold text-[2.6vw] lg:text-[1.9rem] leading-none tracking-[0.18em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
      >
        <span className="block text-[0.45em] tracking-[0.3em] text-[#e9c46a]">par</span>
        <span className="bg-gradient-to-b from-[#f6dc8a] via-[#e2b350] to-[#b8862b] bg-clip-text text-transparent">
          NAYUMA
        </span>
      </span>
      <span className="absolute right-3 top-3 rounded-sm bg-orange px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-ink">
        {BOMBAY_DELIGHT_HREF ? "Nouveau" : "Bientôt disponible"}
      </span>
    </>
  );

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20" aria-labelledby="bombay-heading">
      <ScrollReveal>
        <h2 id="bombay-heading" className="sr-only">
          Nouvelle gamme Bombay Delight par NAYUMA : sirops Chai et Matcha
        </h2>
        {BOMBAY_DELIGHT_HREF ? (
          <Link
            href={BOMBAY_DELIGHT_HREF}
            className="relative block overflow-hidden rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
          >
            {content}
          </Link>
        ) : (
          <div className="relative overflow-hidden rounded-sm">{content}</div>
        )}
      </ScrollReveal>
    </section>
  );
}
