import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Snowflake } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/** Bandeau photo de Noël (photo générée pour NAYUMA, libre de droits). */
export function ChristmasBanner({ count }: { count: number }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-cream" aria-labelledby="christmas-banner-heading">
      <Image
        src="/images/promo/noel-banner.webp"
        alt="Deux tasses de thé de Noël fumantes devant une cheminée, avec oranges séchées, cannelle, badiane et spéculoos"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[70%_center]"
      />
      {/* Assombrit la gauche de la photo pour garder le texte lisible. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 via-40% to-ink/0 to-75%" />
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28">
        <ScrollReveal className="max-w-md">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-light mb-4">
            <Snowflake className="size-4" aria-hidden /> Édition de fêtes
          </p>
          <h2 id="christmas-banner-heading" className="font-display text-4xl md:text-6xl leading-[1.02] mb-4">
            Noël chez NAYUMA
          </h2>
          <p className="text-base text-cream/85 leading-relaxed mb-8">
            {count} thés et infusions de fêtes : orange, cannelle, pain d&apos;épices, spéculoos, amande… à servir tout
            l&apos;hiver.
          </p>
          <Link
            href="/thes-de-noel"
            className="inline-flex min-h-12 items-center gap-2 rounded-sm bg-cream px-7 text-sm font-medium text-ink hover:bg-gold-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
          >
            Découvrir la collection <ArrowRight className="size-4" aria-hidden />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
