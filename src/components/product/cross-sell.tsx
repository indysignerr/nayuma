import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/ui/product-card";

export function CrossSell({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 border-t border-cream-line">
      <h2 className="font-display text-3xl mb-8">Vous aimerez aussi</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {products.map((p) => (
          <ProductCard key={p.handle} product={p} />
        ))}
      </div>
    </section>
  );
}
