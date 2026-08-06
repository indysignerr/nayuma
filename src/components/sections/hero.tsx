import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
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
              <Link href="/collections/thes">Explorer les thés</Link>
            </Button>
            <Link href="/fine-tea" className="text-sm underline underline-offset-4 text-gold-dark hover:text-ink transition-colors">
              Découvrir FINE TEA
            </Link>
          </div>
        </div>

        <div className="relative z-[2] h-[360px] md:h-[440px]">
          <div className="absolute left-[8%] top-[6%] w-[42%] aspect-square rotate-[-6deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/sencha-du-japon.svg" alt="Sencha du Japon" fill className="object-cover" priority />
          </div>
          <div className="absolute right-[4%] top-0 w-[38%] aspect-square rotate-[5deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/matcha-ceremonie-uji.svg" alt="Matcha Cérémonie Uji" fill className="object-cover" />
          </div>
          <div className="absolute left-[22%] bottom-0 w-[40%] aspect-square rotate-[4deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/rooibos-vanille.svg" alt="Rooibos Vanille" fill className="object-cover" />
          </div>
          <div className="absolute right-[10%] bottom-[8%] w-[32%] aspect-square rotate-[-4deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/coffret-decouverte-6-thes.svg" alt="Coffret Découverte" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
