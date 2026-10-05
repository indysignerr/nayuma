import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getChristmasSelection } from "@/lib/shopify/products";
import { ProductCard } from "@/components/ui/product-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export async function FeaturedProducts() {
  const products = await getChristmasSelection(8);

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
      <ScrollReveal className="flex items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-terracotta mb-2">Édition de fêtes</p>
          <h2 className="font-display text-3xl md:text-4xl">Notre sélection de Noël</h2>
        </div>
        <Link
          href="/thes-de-noel"
          className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm hover:text-gold-dark transition-colors"
        >
          Tout voir <ArrowRight className="size-4" aria-hidden />
        </Link>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((p, i) => (
          <ScrollReveal key={p.handle} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
