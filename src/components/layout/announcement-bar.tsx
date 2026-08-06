const MESSAGES = [
  "Livraison offerte dès 49 € d'achat",
  "4 échantillons offerts avec toute commande",
  "Paiement 100% sécurisé",
];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-cream text-xs tracking-wide">
      <div className="mx-auto max-w-[1240px] px-6 h-9 flex items-center justify-center gap-8 overflow-hidden">
        {MESSAGES.map((msg) => (
          <span key={msg} className="hidden sm:inline whitespace-nowrap">
            {msg}
          </span>
        ))}
        <span className="sm:hidden whitespace-nowrap">{MESSAGES[0]}</span>
      </div>
    </div>
  );
}
