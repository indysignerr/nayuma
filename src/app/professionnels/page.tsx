import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BadgeEuro, Handshake, Store, Wallet } from "lucide-react";
import { ANKORSTORE_URL, DIRECT_ORDER_PATH, FAIRE_DIRECT_URL } from "@/lib/pro-channels";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Espace professionnels",
  description:
    "Épiceries fines, concept stores, hôtels, restaurants, coffee shops, spas et revendeurs : commandez les thés NAYUMA en direct, via Faire ou via Ankorstore, avec paiement à 60 jours selon éligibilité.",
};

const CATEGORIES = ["Thés", "Infusions", "Matcha", "Chai Latte", "Thés glacés"];

type Channel = {
  step: string;
  icon: typeof Store;
  title: string;
  desc: string;
  points: string[];
  cta: string;
  href: string;
  external: boolean;
  featured?: boolean;
  note?: string;
};

const faireReady = FAIRE_DIRECT_URL.length > 0;

const CHANNELS: Channel[] = [
  {
    step: "01",
    icon: Handshake,
    title: "Commander directement chez NAYUMA",
    desc: "Pour bénéficier de nos conditions professionnelles et d'un accompagnement personnalisé.",
    points: ["Tarifs professionnels, prix affichés HT", "Relation directe avec notre équipe", "Commandes importantes et réassort", "Conseil personnalisé, devis et échantillons"],
    cta: "Accéder à notre espace professionnel",
    href: DIRECT_ORDER_PATH,
    external: false,
    featured: true,
  },
  {
    step: "02",
    icon: Wallet,
    title: "Commander via Faire",
    desc: "Profitez des facilités de paiement et avantages proposés par Faire, selon votre éligibilité.",
    points: [
      "Paiement à 60 jours sans frais, selon éligibilité",
      "Retours gratuits sur votre première commande de la marque",
      "Toutes vos marques réunies sur une seule plateforme",
    ],
    cta: faireReady ? "Commander NAYUMA sur Faire" : "Recevoir notre lien Faire",
    href: faireReady ? FAIRE_DIRECT_URL : `${DIRECT_ORDER_PATH}#devis-faire`,
    external: faireReady,
    note: "Conditions fixées par Faire, sous réserve d'éligibilité de votre commerce.",
  },
  {
    step: "03",
    icon: Store,
    title: "Commander via Ankorstore",
    desc: "Retrouvez notre catalogue NAYUMA sur Ankorstore et bénéficiez des services proposés aux revendeurs professionnels.",
    points: [
      "Paiement à 30 ou 60 jours, selon éligibilité",
      "Livraison offerte sur votre première commande de la marque, sous conditions",
      "Idéal si vous utilisez déjà l'écosystème Ankorstore",
    ],
    cta: "Commander NAYUMA sur Ankorstore",
    href: ANKORSTORE_URL,
    external: true,
    note: "Conditions fixées par Ankorstore, sous réserve d'éligibilité de votre commerce.",
  },
];

function ChannelCta({ channel }: { channel: Channel }) {
  const className = cn(
    "mt-auto inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark",
    channel.featured ? "bg-orange text-ink hover:bg-cream" : "bg-ink text-cream hover:bg-gold-dark"
  );
  if (channel.external) {
    return (
      <a href={channel.href} target="_blank" rel="noopener noreferrer" className={className}>
        {channel.cta} <ArrowUpRight className="size-4" aria-hidden />
        <span className="sr-only">(nouvel onglet)</span>
      </a>
    );
  }
  return (
    <Link href={channel.href} className={className}>
      {channel.cta} <ArrowRight className="size-4" aria-hidden />
    </Link>
  );
}

export default function ProfessionnelsPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-cream-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60 bg-[radial-gradient(50%_70%_at_95%_0%,var(--color-orange)_0%,transparent_60%),radial-gradient(45%_60%_at_0%_100%,var(--color-cream-deep)_0%,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[1240px] px-6 py-16 md:py-24">
          <ScrollReveal className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-5">Espace professionnels</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
              NAYUMA pour les <em className="text-gold-dark">professionnels</em>
            </h1>
            <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm uppercase tracking-[0.2em] text-ink-soft mb-8">
              {CATEGORIES.map((category, i) => (
                <li key={category} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-orange-dark">•</span>}
                  {category}
                </li>
              ))}
            </ul>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed mb-4">
              Vous êtes épicerie fine, concept store, hôtel, restaurant, coffee shop, spa ou revendeur ? NAYUMA Tea &amp;
              Mood vous accompagne avec une sélection de thés et infusions pensée pour les professionnels.
            </p>
            <p className="font-display text-2xl md:text-3xl">Choisissez la solution de commande qui vous convient.</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-24" aria-labelledby="channels-heading">
        <h2 id="channels-heading" className="sr-only">
          Trois façons de commander
        </h2>
        <ol className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {CHANNELS.map((channel, i) => (
            <li key={channel.title} className={cn(i > 0 && "lg:mt-10")}>
              <ScrollReveal delay={i * 0.1} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col rounded-sm border p-6 md:p-8",
                    channel.featured ? "border-ink bg-ink text-cream" : "border-cream-line bg-cream-card"
                  )}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={cn("font-display text-5xl leading-none", channel.featured ? "text-orange" : "text-gold-dark/50")}
                      aria-hidden
                    >
                      {channel.step}
                    </span>
                    <channel.icon className={cn("size-7", channel.featured ? "text-orange" : "text-gold-dark")} aria-hidden />
                  </div>
                  <h3 className="font-display text-3xl leading-tight mb-3">{channel.title}</h3>
                  <p className={cn("text-sm leading-relaxed mb-5", channel.featured ? "text-cream/80" : "text-ink-soft")}>
                    {channel.desc}
                  </p>
                  <ul className="flex flex-col gap-2 text-sm mb-8">
                    {channel.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span aria-hidden className={channel.featured ? "text-orange" : "text-orange-dark"}>
                          —
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ChannelCta channel={channel} />
                  {channel.note && <p className="mt-3 text-[11px] leading-relaxed text-ink-soft">{channel.note}</p>}
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-orange text-ink">
        <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-20 grid gap-10 md:grid-cols-[auto_1fr] md:items-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-ink text-orange" aria-hidden>
            <BadgeEuro className="size-8" />
          </span>
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-5xl leading-tight mb-4">
              Référencer nos thés sans immobiliser votre trésorerie
            </h2>
            <p className="text-base leading-relaxed max-w-3xl">
              Vous souhaitez référencer NAYUMA sans avancer trop de trésorerie ? Aucun problème : commandez notre gamme
              via Faire ou Ankorstore et bénéficiez, selon votre éligibilité, d&apos;un paiement différé jusqu&apos;à 60
              jours. Vous préférez une relation directe, des volumes importants ou une sélection sur mesure ? Commandez
              directement chez nous.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-24 grid gap-10 md:grid-cols-[1fr_1.4fr]">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">Vous êtes professionnel ?</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Découvrez nos tarifs et conditions réservés aux professionnels.
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1} className="flex flex-col gap-6 text-sm leading-relaxed text-ink-soft">
          <p>
            Revendeur, épicerie fine, salon de thé, hôtel, restaurant, concept store ou entreprise : chaque mode de
            commande répond à un besoin différent.
          </p>
          <dl className="grid gap-5">
            {CHANNELS.map((channel) => (
              <div key={channel.title} className="border-l-2 border-orange pl-4">
                <dt className="font-medium text-ink">{channel.title}</dt>
                <dd>{channel.desc}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={DIRECT_ORDER_PATH}
            className="inline-flex min-h-11 items-center gap-2 self-start text-ink underline underline-offset-4 hover:text-gold-dark"
          >
            Nos conditions de commande directe <ArrowRight className="size-4" aria-hidden />
          </Link>
        </ScrollReveal>
      </section>
    </main>
  );
}
