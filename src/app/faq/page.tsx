import type { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = { title: "Foire aux questions" };

const FAQS = [
  { q: "Quel est le délai de livraison ?", a: "Comptez 2 à 4 jours ouvrés après expédition, elle-même réalisée sous 24h ouvrées." },
  { q: "La livraison est-elle offerte ?", a: "Oui, dès 49€ d'achat. En dessous, les frais de port sont de 4,90€." },
  { q: "Puis-je retourner un produit ?", a: "Oui, sous 14 jours si le produit n'est pas entamé. Voir notre page Livraison & retours." },
  { q: "Les échantillons offerts, comment ça marche ?", a: "4 échantillons au choix sont automatiquement offerts avec chaque commande, quel que soit son montant." },
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
