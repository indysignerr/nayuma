import Image from "next/image";
import type { Metadata } from "next";
import { getFineTeaProducts } from "@/lib/shopify/products";
import { ProductCard } from "@/components/ui/product-card";

export const metadata: Metadata = {
  title: "FINE TEA — Créateur de thés d'exception",
  description:
    "FINE TEA rassemble les crus les plus rares de la maison NAYUMA : lots limités, sourcés à la main, réservés aux amateurs.",
};

export default function FineTeaPage() {
  const products = getFineTeaProducts();

  return (
    <main>
      <section className="border-b border-gold/30 bg-gradient-to-b from-cream-deep to-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-20 text-center">
          <Image src="/images/logo-finetea.svg" alt="FINE TEA" width={280} height={86} className="h-14 w-auto mx-auto mb-6" />
          <p className="font-display text-3xl italic text-gold-dark mb-4">Créateur de thés d&apos;exception</p>
          <p className="text-sm text-ink-soft max-w-xl mx-auto leading-relaxed">
            Depuis toujours, FINE TEA rassemble les crus les plus rares de notre maison — des lots limités, sourcés à
            la main auprès de jardins d&apos;exception et réservés aux amateurs les plus exigeants. Chaque référence
            porte l&apos;héritage NAYUMA dans sa forme la plus précieuse.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
