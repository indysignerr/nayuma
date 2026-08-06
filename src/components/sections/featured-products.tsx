import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/lib/shopify/products";
import { ProductCard } from "@/components/ui/product-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FeaturedProducts() {
  const products = getFeaturedProducts(4);

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
      <ScrollReveal className="flex items-end justify-between mb-8">
        <h2 className="font-display text-3xl md:text-4xl">Nos incontournables</h2>
        <Link href="/collections/best-sellers" className="hidden sm:inline-flex items-center gap-1.5 text-sm hover:text-gold-dark transition-colors">
          Tout voir <ArrowRight className="size-4" />
        </Link>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((p, i) => (
          <ScrollReveal key={p.handle} delay={i * 0.05}>
            <ProductCard product={p} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
