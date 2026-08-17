import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = { title: "Politique d'expédition" };

export default function LivraisonRetoursPage() {
  return (
    <LegalShell title="Politique d'expédition">
      <p>
        Merci pour votre commande chez NAYUMA • Tea &amp; Mood, marque exploitée par SAS MANIKA LAB. Nous nous
        engageons à préparer et expédier vos commandes dans les meilleurs délais.
      </p>

      <h2>Zones desservies</h2>
      <p>
        Nous expédions actuellement nos produits en France, dans les pays de l&apos;Union européenne, ainsi
        qu&apos;à l&apos;international selon les destinations disponibles au moment de la commande.
      </p>

      <h2>Délais de préparation et d&apos;expédition</h2>
      <p>Les commandes sont généralement préparées et expédiées sous 2 à 5 jours ouvrés après validation du paiement.</p>
      <p>
        Les délais de livraison estimés sont généralement de 8 à 10 jours ouvrés, selon la destination et le mode
        de livraison sélectionné.
      </p>
      <p>
        Ces délais sont donnés à titre indicatif et peuvent varier en fonction des périodes de forte activité, des
        jours fériés, des contraintes logistiques ou d&apos;événements indépendants de notre volonté.
      </p>

      <h2>Transporteurs</h2>
      <p>Les livraisons peuvent être assurées par différents transporteurs partenaires, notamment :</p>
      <ul>
        <li>Colissimo</li>
        <li>La Poste</li>
        <li>Mondial Relay</li>
        <li>ou tout autre transporteur sélectionné selon la destination</li>
      </ul>

      <h2>Suivi des commandes</h2>
      <p>
        Lorsqu&apos;un numéro de suivi est disponible, celui-ci est communiqué au client par email après
        l&apos;expédition de la commande.
      </p>

      <h2>Frais de livraison</h2>
      <p>Les frais de livraison sont calculés automatiquement lors de la commande et affichés avant validation du paiement.</p>

      <h2>Retard, perte ou problème de livraison</h2>
      <p>
        En cas de retard important, de colis perdu, endommagé ou de problème lié à la livraison, merci de contacter
        notre service client : <a href="mailto:contact@nayumatea.com">contact@nayumatea.com</a>
      </p>
      <p>
        Adresse de l&apos;entreprise :
        <br />
        SAS MANIKA LAB – NAYUMA • Tea &amp; Mood
        <br />
        2405 Route des Dolines CS10065
        <br />
        06560 Sophia-Antipolis – France
      </p>
      <p>Les délais de livraison indiqués sont des estimations et ne constituent pas une garantie contractuelle.</p>
    </LegalShell>
  );
}
