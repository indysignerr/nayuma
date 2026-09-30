import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FREE_SHIPPING_THRESHOLD_LABEL, SHIPPING_DELAY_LABEL, STANDARD_SHIPPING_LABEL } from "@/lib/shipping";

export const metadata: Metadata = { title: "Foire aux questions" };

const FAQS = [
  { q: "Quel est le délai de livraison ?", a: `Les commandes sont expédiées sous ${SHIPPING_DELAY_LABEL} après validation du paiement.` },
  {
    q: "La livraison est-elle offerte ?",
    a: `Oui, dès ${FREE_SHIPPING_THRESHOLD_LABEL} d'achat. En dessous, la livraison standard est à ${STANDARD_SHIPPING_LABEL}.`,
  },
  { q: "Puis-je retourner un produit ?", a: "Oui, sous 14 jours si le produit n'est pas entamé. Voir notre page Livraison & retours." },
  {
    q: "Je suis un professionnel, comment commander ?",
    a: "Trois possibilités : commander directement sur notre site (prix affichés HT, facture au nom de votre société), ou passer par Faire ou Ankorstore pour bénéficier, selon votre éligibilité, d'un paiement à 60 jours. Tout est détaillé sur notre page Espace professionnels.",
  },
  { q: "Proposez-vous des cartes cadeaux ?", a: "Oui, disponibles en 25€ et 50€ dans notre collection Coffrets & Accessoires." },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Foire aux questions</h1>
      <Accordion type="single" collapsible>
        {FAQS.map((f, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-base">{f.q}</AccordionTrigger>
            <AccordionContent className="text-ink-soft leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}
