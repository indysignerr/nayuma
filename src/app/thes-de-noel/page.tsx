import type { Metadata } from "next";
import Image from "next/image";
import { Snowflake } from "lucide-react";
import { getChristmasProducts, getFestiveProducts } from "@/lib/shopify/products";
import { ProductCard } from "@/components/ui/product-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Thés de Noël",
  description:
    "Thés et infusions de Noël NAYUMA en vrac : pomme, cannelle, amande, spéculoos, caramel. Pochettes de 1 kg pour les professionnels et les amateurs.",
};

export default async function ThesDeNoelPage() {
  const christmas = await getChristmasProducts();
  const festive = await getFestiveProducts(christmas);

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-ink text-cream">
        <Image
          src="/images/promo/noel-banner.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-[70%_center]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 via-40% to-ink/0 to-75%" />
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28">
          <ScrollReveal className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-light mb-4">
              <Snowflake className="size-4" aria-hidden /> Collection de Noël
            </p>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
              Les thés <em className="text-gold-light">de Noël</em>
            </h1>
            <p className="text-base md:text-lg text-cream/85 leading-relaxed">
              Pomme, cannelle, amande, spéculoos, caramel : des recettes réconfortantes pour la saison des fêtes, à
              servir tout l&apos;hiver ou à offrir.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {christmas.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20" aria-labelledby="noel-heading">
          <h2 id="noel-heading" className="font-display text-3xl md:text-4xl mb-8">
            Édition de Noël
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {christmas.map((p, i) => (
              <ScrollReveal key={p.handle} delay={(i % 4) * 0.05}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

      {festive.length > 0 && (
        <section
          className="mx-auto max-w-[1240px] px-6 pb-20 pt-4 md:pb-24"
          aria-labelledby="saveurs-heading"
        >
          <h2 id="saveurs-heading" className="font-display text-3xl md:text-4xl mb-2">
            Saveurs de fêtes
          </h2>
          <p className="text-sm text-ink-soft mb-8">Nos thés et infusions gourmands, épicés et fruités pour l&apos;hiver.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {festive.map((p, i) => (
              <ScrollReveal key={p.handle} delay={(i % 4) * 0.05}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
