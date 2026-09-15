import Link from "next/link";

const MESSAGES: { text: string; href?: string }[] = [
  { text: "Livraison offerte dès 49 € d'achat" },
  { text: "Professionnels : prix HT, devis & échantillons", href: "/professionnels" },
  { text: "Paiement 100% sécurisé" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-cream text-xs tracking-wide">
      <div className="mx-auto max-w-[1240px] px-6 h-9 flex items-center justify-center gap-8 overflow-hidden">
        {MESSAGES.map((msg) =>
          msg.href ? (
            <Link
              key={msg.text}
              href={msg.href}
              className="hidden sm:inline whitespace-nowrap underline underline-offset-4 decoration-cream/40 hover:text-gold-light transition-colors"
            >
              {msg.text}
            </Link>
          ) : (
            <span key={msg.text} className="hidden sm:inline whitespace-nowrap">
              {msg.text}
            </span>
          )
        )}
        <span className="sm:hidden whitespace-nowrap">{MESSAGES[0].text}</span>
      </div>
    </div>
  );
}
