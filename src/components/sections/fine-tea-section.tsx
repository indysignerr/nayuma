import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFineTeaProducts } from "@/lib/shopify/products";
import { formatMoney } from "@/lib/shopify/format";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FineTeaSection() {
  const products = getFineTeaProducts().slice(0, 5);

  return (
    <section className="border-y border-gold/30 bg-gradient-to-b from-cream-deep to-cream">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <Image src="/images/logo-finetea.svg" alt="FINE TEA" width={220} height={68} className="h-10 w-auto mb-4" />
            <p className="font-display text-2xl italic text-gold-dark mb-2">Créateur de thés d&apos;exception</p>
            <p className="text-sm text-ink-soft max-w-lg leading-relaxed">
              Depuis toujours, FINE TEA rassemble les crus les plus rares de notre maison — des lots limités,
              sourcés à la main et réservés aux amateurs. L&apos;héritage NAYUMA, dans sa forme la plus précieuse.
            </p>
          </div>
          <Link
            href="/fine-tea"
            className="inline-flex items-center gap-2 shrink-0 text-sm font-medium border border-gold text-gold-dark rounded-sm px-5 py-3 hover:bg-gold hover:text-ink transition-colors"
          >
            Découvrir la sélection FINE TEA <ArrowRight className="size-4" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {products.map((p, i) => (
            <ScrollReveal key={p.handle} delay={i * 0.06}>
              <Link href={`/produits/${p.handle}`} className="group block">
                <div className="relative aspect-square rounded-sm overflow-hidden border border-gold/40 bg-cream-card">
                  <span className="absolute top-2 left-2 z-10 bg-ink text-cream text-[9px] tracking-widest uppercase px-1.5 py-0.5 rounded-sm">
                    Fine Tea
                  </span>
                  <Image
                    src={p.images[0].url}
                    alt={p.images[0].altText}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="font-display text-base mt-3 group-hover:text-gold-dark transition-colors">{p.title}</p>
                <p className="text-xs text-ink-soft">{formatMoney(p.variants[0].price)}</p>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
