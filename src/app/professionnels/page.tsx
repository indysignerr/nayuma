import type { Metadata } from "next";
import {
  BedDouble,
  Building2,
  ClipboardList,
  Coffee,
  FileText,
  Mail,
  Package,
  Phone,
  Receipt,
  Sparkles,
  Store,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { getAllProducts } from "@/lib/shopify/products";
import { variantWeightKg } from "@/lib/b2b";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ProModeButton } from "@/components/layout/customer-mode-toggle";
import { DevisForm } from "@/components/b2b/devis-form";

export const metadata: Metadata = {
  title: "Espace professionnels",
  description:
    "Cafés, restaurants, hôtels, épiceries fines : nos thés, rooibos, infusions et chai latte en pochettes de 1 kg, prix HT, facture à votre société, devis et échantillons sur demande.",
};

const AUDIENCES = [
  {
    icon: Coffee,
    title: "Cafés & salons de thé",
    desc: "Une carte de thés et d'infusions qui se renouvelle au fil des saisons, du thé vert japonais au chai latte.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    desc: "Des infusions digestives pour prolonger le repas, et des thés glacés maison quand les beaux jours arrivent.",
  },
  {
    icon: BedDouble,
    title: "Hôtels & chambres d'hôtes",
    desc: "Pour le petit-déjeuner, le room service ou le bar, avec une large sélection de références bio.",
  },
  {
    icon: Store,
    title: "Épiceries fines & concept stores",
    desc: "Des thés d'exception à servir au comptoir ou à faire découvrir à votre clientèle.",
  },
  {
    icon: Sparkles,
    title: "Spas & instituts",
    desc: "Infusions bien-être, detox et relaxation pour accompagner vos soins.",
  },
  {
    icon: Building2,
    title: "Entreprises & bureaux",
    desc: "Une sélection de thés et d'infusions pour les espaces café de vos équipes.",
  },
];

const BENEFITS = [
  {
    icon: Package,
    title: "Toute la gamme en pochettes de 1 kg",
    desc: "Thés, rooibos, infusions, chai latte, matcha et thés glacés : un format pensé pour le service, pas pour le placard.",
  },
  {
    icon: Receipt,
    title: "Prix HT et coût à la tasse",
    desc: "En mode Pro, tous les prix s'affichent hors taxes, avec le coût estimé par tasse sur chaque fiche.",
  },
  {
    icon: FileText,
    title: "Facture à votre société",
    desc: "Raison sociale, SIRET et n° de TVA intracommunautaire sont transmis avec votre commande.",
  },
  {
    icon: ClipboardList,
    title: "Dosages indiqués",
    desc: "Temps d'infusion, température et dosage conseillés pour une tasse régulière, service après service.",
  },
  {
    icon: Truck,
    title: "Expédition sous 24h",
    desc: "Commandes expédiées sous 24h ouvrées, livrées en 2 à 4 jours ouvrés.",
  },
];

const STEPS = [
  {
    title: "Passez en mode Pro",
    desc: "Sélectionnez « Pro · HT » en haut du site (ou dans le menu sur mobile) : tous les prix passent hors taxes.",
  },
  {
    title: "Commandez en ligne",
    desc: "Ajoutez vos références au panier, renseignez vos informations société, puis réglez via le paiement sécurisé Shopify.",
  },
  {
    title: "Un besoin particulier ?",
    desc: "Volumes réguliers, sélection sur mesure ou échantillons pour tester : demandez un devis, nous répondons sous 24h ouvrées.",
  },
];

export default async function ProfessionnelsPage() {
  const products = await getAllProducts();
  const references = products.filter((p) => p.variants.some((v) => variantWeightKg(v.title) === 1)).length;

  const stats = [
    { value: String(references), label: "références au kilo" },
    { value: "1 kg", label: "pochettes vrac" },
    { value: "HT", label: "prix & facture pro" },
    { value: "24h", label: "expédition ouvrée" },
  ];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-cream-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(55%_70%_at_90%_0%,var(--color-gold-light)_0%,transparent_65%),radial-gradient(45%_60%_at_0%_100%,var(--color-cream-deep)_0%,transparent_70%)]"
        />
        <div className="relative mx-auto max-w-[1240px] px-6 py-16 md:py-28 grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-end">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-5">Espace professionnels</p>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-6">
              Le thé en vrac,
              <br />
              <em className="text-gold-dark">au service de votre carte.</em>
            </h1>
            <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl mb-8">
              Cafés, restaurants, hôtels, épiceries fines : commandez nos {references} références en pochettes de 1 kg,
              avec des prix affichés hors taxes et une facture au nom de votre société.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-sm min-h-11">
                <a href="#devis">Demander un devis</a>
              </Button>
              <ProModeButton />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-cream-line bg-cream-line">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1 bg-cream-card px-5 py-6">
                  <dt className="text-xs text-ink-soft">{stat.label}</dt>
                  <dd className="font-display text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-20 md:py-28 grid gap-12 md:grid-cols-[1fr_2fr]">
        <ScrollReveal className="md:sticky md:top-44 h-fit">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">Pour qui</p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">
            Une carte de thés à la hauteur de votre établissement.
          </h2>
        </ScrollReveal>
        <ul className="grid gap-px overflow-hidden rounded-sm border border-cream-line bg-cream-line sm:grid-cols-2">
          {AUDIENCES.map((audience, i) => (
            <li key={audience.title} className="bg-cream">
              <ScrollReveal delay={i * 0.05} className="h-full p-6 md:p-8">
                <audience.icon className="size-6 text-gold-dark mb-4" aria-hidden />
                <h3 className="font-display text-2xl mb-2">{audience.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{audience.desc}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-ink text-cream">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28">
          <ScrollReveal className="max-w-2xl mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-light mb-4">Pensé pour les pros</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Tout ce qu&apos;il faut pour servir, rien de superflu.
            </h2>
          </ScrollReveal>
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <li key={benefit.title} className={cn("border-t border-cream/15 pt-6", i === 0 && "lg:col-span-2")}>
                <ScrollReveal delay={i * 0.05}>
                  <benefit.icon className="size-6 text-gold-light mb-4" aria-hidden />
                  <h3 className={cn("font-display mb-2", i === 0 ? "text-3xl md:text-4xl" : "text-2xl")}>
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-cream/70 leading-relaxed max-w-md">{benefit.desc}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 py-20 md:py-28">
        <ScrollReveal className="mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">Comment ça marche</p>
          <h2 className="font-display text-4xl md:text-5xl">Commander en trois temps</h2>
        </ScrollReveal>
        <ol className="grid gap-10 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className={cn(i === 1 && "md:mt-12", i === 2 && "md:mt-24")}>
              <ScrollReveal delay={i * 0.1}>
                <span className="font-display text-7xl leading-none text-gold-dark/40" aria-hidden>
                  {`0${i + 1}`}
                </span>
                <h3 className="font-display text-2xl mt-2 mb-3">{step.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{step.desc}</p>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </section>

      <section id="devis" className="scroll-mt-44 border-t border-cream-line bg-cream-card">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:py-28 grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">Devis & échantillons</p>
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-6">Parlons de votre sélection.</h2>
            <p className="text-sm text-ink-soft leading-relaxed mb-8 max-w-sm">
              Volumes réguliers, sélection sur mesure ou échantillons pour tester avant de vous lancer : décrivez votre
              besoin, nous vous répondons sous 24h ouvrées.
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-gold-dark" aria-hidden />
                <a href="mailto:contact@nayumatea.com" className="hover:text-gold-dark transition-colors">
                  contact@nayumatea.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-gold-dark" aria-hidden />
                <a href="tel:+33620149060" className="hover:text-gold-dark transition-colors">
                  06 20 14 90 60
                </a>
              </li>
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <DevisForm />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
