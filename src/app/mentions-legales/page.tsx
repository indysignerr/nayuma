import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/legal-shell";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <LegalShell title="Mentions légales">
      <h2>Éditeur du site</h2>
      <p>
        Le site nayumatea.com est édité par NAYUMA Tea &amp; Mood, [forme juridique à compléter], au capital de
        [montant à compléter], immatriculée au RCS de [ville] sous le numéro [SIRET à compléter], dont le siège
        social est situé [adresse à compléter].
      </p>
      <p>
        Directeur de la publication : [nom à compléter]. Contact :{" "}
        <a href="mailto:contact@nayumatea.com">contact@nayumatea.com</a>.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis —{" "}
        <a href="https://www.cloudflare.com" target="_blank" rel="noreferrer">
          cloudflare.com
        </a>
        .
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, images, logos, chartes graphiques) sont la
        propriété exclusive de NAYUMA Tea &amp; Mood, sauf mention contraire, et sont protégés par le droit d&apos;auteur
        et le droit des marques. Toute reproduction, représentation ou diffusion, totale ou partielle, sans
        autorisation préalable, est interdite.
      </p>

      <h2>Droit applicable</h2>
      <p>
        Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut d&apos;accord
        amiable, les tribunaux français seront seuls compétents.
      </p>
    </LegalShell>
  );
}
