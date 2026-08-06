import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = { title: "Livraison & retours" };

export default function LivraisonRetoursPage() {
  return (
    <LegalShell title="Livraison & retours">
      <h2>Livraison</h2>
      <p>
        Toute commande passée avant 14h est expédiée sous 24h ouvrées. Livraison offerte dès 49€ d&apos;achat, sinon
        4,90€ en France métropolitaine. Délai moyen de livraison : 2 à 4 jours ouvrés.
      </p>

      <h2>Retours</h2>
      <p>
        Vous disposez de 14 jours à compter de la réception de votre commande pour nous retourner un article non
        entamé, dans son emballage d&apos;origine. Contactez-nous à{" "}
        <a href="mailto:contact@nayumatea.com">contact@nayumatea.com</a> pour initier un retour.
      </p>

      <h2>Remboursement</h2>
      <p>Le remboursement est effectué sous 5 jours ouvrés après réception et vérification du retour.</p>
    </LegalShell>
  );
}
