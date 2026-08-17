import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <LegalShell title="Mentions légales">
      <h2>1. Éditeur du site</h2>
      <p>
        Éditeur du site : NAYUMA • Tea &amp; Mood
        <br />
        Marque exploitée par SAS MANIKA LAB
      </p>
      <p>Société par Actions Simplifiée (SAS) au capital de 1 000 €</p>
      <p>Siège social : 2405 Route des Dolines CS10065, Sophia-Antipolis, 06560 Valbonne</p>
      <p>SIRET : 103 533 360 000 14</p>
      <p>Numéro TVA intracommunautaire : FR78103533360</p>
      <p>
        Email : <a href="mailto:contact@nayumatea.com">contact@nayumatea.com</a>
      </p>
      <p>
        Téléphone : <a href="tel:+33620149060">06 20 14 90 60</a>
      </p>

      <h2>2. Hébergeur</h2>
      <p>Shopify Inc.</p>
      <p>Adresse : 151 O&apos;Connor Street, Ground Floor, Ottawa, Ontario K2P 2L8, Canada</p>
      <p>
        Site :{" "}
        <a href="https://www.shopify.com" target="_blank" rel="noreferrer">
          www.shopify.com
        </a>
      </p>

      <h2>3. Directeur de la publication</h2>
      <p>Mr LASRY Richard - Président de la SAS MANIKA LAB</p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu du site (textes, images, graphismes, logos, vidéos, éléments visuels, identité
        graphique, etc.) est la propriété exclusive de SAS MANIKA LAB, exploitant les marques NAYUMA • Tea &amp;
        Mood et FiNE TEA, sauf mention contraire.
      </p>
      <p>
        Toute reproduction, représentation, diffusion, modification ou exploitation, même partielle, est interdite
        sans autorisation écrite préalable.
      </p>

      <h2>5. Données personnelles</h2>
      <p>
        Les informations collectées sur le site sont utilisées uniquement dans le cadre de la relation commerciale,
        du traitement des commandes, de la gestion client et des communications commerciales lorsque le client y a
        consenti.
      </p>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi applicable, vous disposez
        d&apos;un droit d&apos;accès, de rectification, d&apos;opposition, de suppression, de limitation et de
        portabilité de vos données personnelles.
      </p>
      <p>
        Pour exercer ces droits : <a href="mailto:contact@nayumatea.com">contact@nayumatea.com</a>
      </p>
      <p>
        La politique de confidentialité complète est disponible sur la{" "}
        <a href="/politique-de-confidentialite">page dédiée</a> du site.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Le site utilise des cookies pour améliorer l&apos;expérience utilisateur et mesurer l&apos;audience. Vous
        pouvez gérer vos préférences via le bandeau de consentement.
      </p>
    </LegalShell>
  );
}
