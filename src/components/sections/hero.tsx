import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/lib/shopify/products";

export async function Hero() {
  const products = await getAllProducts();
  const withImages = products.filter((p) => p.images[0]);
  const seenTypes = new Set<string>();
  const picks = [];
  for (const p of withImages) {
    if (seenTypes.has(p.productType)) continue;
    seenTypes.add(p.productType);
    picks.push(p);
    if (picks.length === 4) break;
  }
  const collage = picks.length === 4 ? picks : withImages.slice(0, 4);

  return (
    <section className="relative overflow-hidden mesh-gradient grain-overlay border-b border-cream-line">
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative z-[2]">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-5">NAYUMA — Tea &amp; Mood</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-6">
            L&apos;art du thé,
            <br />
            réinventé pour vos <em className="not-italic text-gold-dark">humeurs</em>
          </h1>
          <p className="text-base text-ink-soft max-w-md leading-relaxed mb-8">
            Thés, rooibos, matcha et infusions d&apos;exception, sélectionnés avec exigence pour accompagner chaque
            instant — du réveil à la nuit tombée.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-sm px-8">
              <Link href="/collections/thes-verts-althea">Explorer les thés</Link>
            </Button>
            <Link href="/fine-tea" className="text-sm underline underline-offset-4 text-gold-dark hover:text-ink transition-colors">
              Découvrir FINE TEA
            </Link>
          </div>
        </div>

        {collage.length > 0 && (
          <div className="relative z-[2] h-[360px] md:h-[440px]">
            {collage[0] && (
              <div className="absolute left-[8%] top-[6%] w-[42%] aspect-square rotate-[-6deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
                <Image src={collage[0].images[0].url} alt={collage[0].title} fill className="object-cover" priority />
              </div>
            )}
            {collage[1] && (
              <div className="absolute right-[4%] top-0 w-[38%] aspect-square rotate-[5deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
                <Image src={collage[1].images[0].url} alt={collage[1].title} fill className="object-cover" />
              </div>
            )}
            {collage[2] && (
              <div className="absolute left-[22%] bottom-0 w-[40%] aspect-square rotate-[4deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
                <Image src={collage[2].images[0].url} alt={collage[2].title} fill className="object-cover" />
              </div>
            )}
            {collage[3] && (
              <div className="absolute right-[10%] bottom-[8%] w-[32%] aspect-square rotate-[-4deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
                <Image src={collage[3].images[0].url} alt={collage[3].title} fill className="object-cover" />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
