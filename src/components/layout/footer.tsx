import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, CreditCard } from "lucide-react";

const COLUMNS = [
  {
    title: "Collections",
    links: [
      { label: "Thé vert", href: "/collections/the-vert" },
      { label: "Thé noir", href: "/collections/the-noir" },
      { label: "Matcha", href: "/collections/matcha" },
      { label: "Infusions & Rooibos", href: "/collections/infusions-rooibos" },
      { label: "Coffrets & Accessoires", href: "/collections/coffrets-accessoires" },
      { label: "FINE TEA", href: "/fine-tea" },
    ],
  },
  {
    title: "Service client",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Livraison & retours", href: "/livraison-retours" },
      { label: "Foire aux questions", href: "/faq" },
      { label: "Suivre ma commande", href: "/suivi-commande" },
      { label: "Cartes cadeaux", href: "/collections/coffrets-accessoires?type=carte-cadeau" },
    ],
  },
  {
    title: "La maison",
    links: [
      { label: "Notre histoire", href: "/notre-histoire" },
      { label: "Trouvez votre thé (quiz)", href: "/quiz" },
      { label: "Guide du thé", href: "/guide-du-the" },
      { label: "Journal du thé", href: "/journal" },
      { label: "Engagement bio & traçabilité", href: "/engagement" },
      { label: "FINE TEA — l'héritage", href: "/fine-tea" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo-nayuma.svg"
              alt="NAYUMA — Tea & Mood"
              width={200}
              height={65}
              className="h-14 w-auto invert"
            />
            <p className="mt-5 text-sm text-cream/70 max-w-xs leading-relaxed">
              Créateur de thés, rooibos, matcha et infusions d&apos;exception. Une sélection pensée pour accompagner
              chaque instant de votre journée.
            </p>
            <div className="flex items-center gap-4 mt-6 text-sm">
              <a
                href="https://www.instagram.com/nayuma_tea/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-light transition-colors underline underline-offset-4"
              >
                Instagram
              </a>
              <a href="#" className="hover:text-gold-light transition-colors underline underline-offset-4">
                Facebook
              </a>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-lg mb-4">{col.title}</h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-cream/75 hover:text-cream transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-display text-lg mb-4">Contact</h3>
            <ul className="flex flex-col gap-3 text-sm text-cream/75">
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                <a href="mailto:contact@nayumatea.com" className="hover:text-cream transition-colors">
                  contact@nayumatea.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a href="tel:+33100000000" className="hover:text-cream transition-colors">
                  01 00 00 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-14 pt-8 border-t border-cream/15">
          {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
            <span key={method} className="flex items-center gap-1.5 text-xs text-cream/70 border border-cream/20 rounded-sm px-2.5 py-1.5">
              <CreditCard className="size-3.5" />
              {method}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-8 border-t border-cream/15 text-sm text-cream/70">
          <p>© {new Date().getFullYear()} NAYUMA Tea &amp; Mood. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-cream transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-cream transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
