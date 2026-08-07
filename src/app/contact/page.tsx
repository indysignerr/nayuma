import type { Metadata } from "next";
import { Mail, Phone, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-6">Contactez-nous</h1>
      <p className="text-sm text-ink-soft leading-relaxed mb-10 max-w-lg">
        Une question sur une commande, un conseil sur un rituel, une demande professionnelle ? Notre équipe vous répond
        sous 24h ouvrées.
      </p>
      <div className="flex flex-col gap-5 text-sm">
        <p className="flex items-center gap-3">
          <Mail className="size-5 text-gold-dark" />
          <a href="mailto:contact@nayumatea.com" className="hover:text-gold-dark transition-colors">
            contact@nayumatea.com
          </a>
        </p>
        <p className="flex items-center gap-3">
          <Phone className="size-5 text-gold-dark" />
          <a href="tel:+33100000000" className="hover:text-gold-dark transition-colors">
            01 00 00 00 00
          </a>
        </p>
        <p className="flex items-center gap-3 text-ink-soft">
          <Clock className="size-5 text-gold-dark" />
          Du lundi au vendredi, 9h–18h
        </p>
      </div>
    </main>
  );
}
