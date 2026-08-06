import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = { title: "Politique de confidentialité" };

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalShell title="Politique de confidentialité">
      <p>
        NAYUMA Tea &amp; Mood attache une grande importance à la protection de vos données personnelles. Cette page
        décrit comment nous collectons, utilisons et protégeons vos informations conformément au Règlement Général
        sur la Protection des Données (RGPD).
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Informations de compte et de commande (nom, adresse, email, téléphone)</li>
        <li>Historique d&apos;achat et préférences produits</li>
        <li>Données de navigation (cookies techniques et de mesure d&apos;audience)</li>
        <li>Adresse email pour la newsletter, avec votre consentement explicite</li>
      </ul>

      <h2>Finalités du traitement</h2>
      <p>
        Vos données sont utilisées pour le traitement de vos commandes, l&apos;amélioration de votre expérience
        d&apos;achat, la relation client, et — si vous y avez consenti — l&apos;envoi de notre newsletter.
      </p>

      <h2>Cookies tiers</h2>
      <p>
        Le paiement est traité par Shopify Payments. Certains cookies de mesure d&apos;audience ou publicitaires
        peuvent être déposés avec votre consentement, paramétrable à tout moment via notre bandeau cookies.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
        limitation et de portabilité de vos données, ainsi que d&apos;un droit d&apos;opposition. Pour exercer ces
        droits, contactez-nous à <a href="mailto:contact@nayumatea.com">contact@nayumatea.com</a>.
      </p>

      <h2>Autorité de contrôle</h2>
      <p>
        Vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des
        Libertés) — <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">cnil.fr</a>.
      </p>
    </LegalShell>
  );
}
