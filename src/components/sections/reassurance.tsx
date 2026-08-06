import { Gift, Truck, ShieldCheck, Leaf } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const ITEMS = [
  { icon: Gift, label: "4 échantillons offerts", desc: "Avec chaque commande" },
  { icon: Truck, label: "Livraison offerte", desc: "Dès 49€ d'achat" },
  { icon: ShieldCheck, label: "Paiement sécurisé", desc: "Via Shopify Payments" },
  { icon: Leaf, label: "Sourcing tracé", desc: "Du jardin à votre tasse" },
];

export function Reassurance() {
  return (
    <section className="border-y border-cream-line bg-cream-card">
      <div className="mx-auto max-w-[1240px] px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {ITEMS.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.04} className="flex flex-col items-center text-center gap-2 md:flex-row md:text-left md:gap-3">
            <item.icon className="size-6 text-gold-dark shrink-0" />
            <div>
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-xs text-ink-soft">{item.desc}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
