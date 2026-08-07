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
            La beauté <em className="not-italic text-gold-dark">infusée</em>,
            <br />
            racine par racine
          </h1>
          <p className="text-base text-ink-soft max-w-md leading-relaxed mb-8">
            Des infusions botaniques formulées pour la santé du cheveu et le bien-être féminin, pensées comme un
            rituel quotidien plutôt qu&apos;une simple habitude.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="rounded-sm px-8">
              <Link href="/collections/rituels-cheveux">Explorer les rituels</Link>
            </Button>
            <Link href="/collections/rituels-feminins" className="text-sm underline underline-offset-4 text-gold-dark hover:text-ink transition-colors">
              Rituels féminins
            </Link>
          </div>
        </div>

        <div className="relative z-[2] h-[360px] md:h-[440px]">
          <div className="absolute left-[8%] top-[6%] w-[42%] aspect-square rotate-[-6deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/rituel-chute-fortification.svg" alt="Rituel Chute & Fortification" fill className="object-cover" priority />
          </div>
          <div className="absolute right-[4%] top-0 w-[38%] aspect-square rotate-[5deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/rituel-douce-lune.svg" alt="Rituel Douce Lune" fill className="object-cover" />
          </div>
          <div className="absolute left-[22%] bottom-0 w-[40%] aspect-square rotate-[4deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/rituel-densite-volume.svg" alt="Rituel Densité & Volume" fill className="object-cover" />
          </div>
          <div className="absolute right-[10%] bottom-[8%] w-[32%] aspect-square rotate-[-4deg] rounded-sm overflow-hidden border border-cream-line shadow-xl">
            <Image src="/images/products/serum-capillaire-fortifiant.svg" alt="Sérum Capillaire Fortifiant" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
