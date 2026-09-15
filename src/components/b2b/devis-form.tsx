"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "contact@nayumatea.com";

const ACTIVITIES = [
  "Café / salon de thé",
  "Restaurant",
  "Hôtel / chambres d'hôtes",
  "Épicerie fine / concept store",
  "Spa / institut",
  "Entreprise / bureaux",
  "Autre",
];

const REQUESTS = ["Demande de devis", "Demande d'échantillons", "Autre question"];

const fieldClass =
  "w-full rounded-sm border border-cream-line bg-cream px-3 text-sm outline-none transition-colors placeholder:text-ink-soft/60 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-gold/40";
const labelClass = "text-xs uppercase tracking-widest text-ink-soft";

type Status = "idle" | "sending" | "sent" | "error";

function mailtoFor(data: Record<string, string>): string {
  const subject = `${data.request || "Demande professionnelle"} — ${data.company || ""}`;
  const body = [
    `Nom : ${data.name || ""}`,
    `Établissement : ${data.company || ""}`,
    `Activité : ${data.activity || ""}`,
    `Ville : ${data.city || ""}`,
    `Téléphone : ${data.phone || ""}`,
    `SIRET : ${data.siret || ""}`,
    "",
    data.message || "",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function DevisForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackHref, setFallbackHref] = useState(`mailto:${CONTACT_EMAIL}`);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setFallbackHref(mailtoFor(data));
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-sm border border-cream-line bg-cream p-8 md:p-10">
        <CheckCircle2 className="size-8 text-tea-green mb-4" aria-hidden />
        <p className="font-display text-3xl mb-3">Merci, c&apos;est bien reçu.</p>
        <p className="text-sm text-ink-soft leading-relaxed">
          Nous revenons vers vous sous 24h ouvrées avec une proposition adaptée à votre établissement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-sm border border-cream-line bg-cream p-6 md:p-10 grid gap-5 sm:grid-cols-2">
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-name" className={labelClass}>
          Nom et prénom *
        </label>
        <input id="devis-name" name="name" required maxLength={120} autoComplete="name" className={`${fieldClass} h-11`} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-company" className={labelClass}>
          Établissement *
        </label>
        <input id="devis-company" name="company" required maxLength={160} autoComplete="organization" className={`${fieldClass} h-11`} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-email" className={labelClass}>
          Email *
        </label>
        <input id="devis-email" name="email" type="email" required maxLength={200} autoComplete="email" className={`${fieldClass} h-11`} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-phone" className={labelClass}>
          Téléphone
        </label>
        <input id="devis-phone" name="phone" type="tel" maxLength={40} autoComplete="tel" className={`${fieldClass} h-11`} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-activity" className={labelClass}>
          Activité
        </label>
        <select id="devis-activity" name="activity" defaultValue="" className={`${fieldClass} h-11`}>
          <option value="" disabled>
            Choisir…
          </option>
          {ACTIVITIES.map((activity) => (
            <option key={activity}>{activity}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-request" className={labelClass}>
          Objet
        </label>
        <select id="devis-request" name="request" defaultValue={REQUESTS[0]} className={`${fieldClass} h-11`}>
          {REQUESTS.map((request) => (
            <option key={request}>{request}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-city" className={labelClass}>
          Ville
        </label>
        <input id="devis-city" name="city" maxLength={120} autoComplete="address-level2" className={`${fieldClass} h-11`} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="devis-siret" className={labelClass}>
          SIRET
        </label>
        <input id="devis-siret" name="siret" maxLength={40} inputMode="numeric" className={`${fieldClass} h-11`} />
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor="devis-message" className={labelClass}>
          Votre besoin *
        </label>
        <textarea
          id="devis-message"
          name="message"
          required
          maxLength={4000}
          rows={5}
          placeholder="Références qui vous intéressent, volumes estimés par mois, date de démarrage…"
          className={`${fieldClass} py-2.5 min-h-32 resize-y`}
        />
      </div>

      {/* Champ piège pour les robots, invisible pour les visiteurs. */}
      <div className="hidden" aria-hidden>
        <label>
          Site web
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="sm:col-span-2 flex items-start gap-3 text-xs text-ink-soft leading-relaxed">
        <input type="checkbox" name="consent" required className="mt-0.5 size-4 shrink-0 accent-ink" />
        <span>
          J&apos;accepte que ces informations soient utilisées pour traiter ma demande. Voir notre{" "}
          <Link href="/politique-de-confidentialite" className="underline underline-offset-2 hover:text-ink">
            politique de confidentialité
          </Link>
          .
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 text-sm text-terracotta leading-relaxed">
          L&apos;envoi n&apos;a pas abouti. Vous pouvez{" "}
          <a href={fallbackHref} className="underline underline-offset-2">
            nous écrire par email
          </a>{" "}
          (votre message est pré-rempli) ou nous appeler au{" "}
          <a href="tel:+33620149060" className="underline underline-offset-2">
            06 20 14 90 60
          </a>
          .
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "sending"} className="rounded-sm min-h-11 gap-2 w-full sm:w-auto">
          {status === "sending" && <Loader2 className="size-4 motion-safe:animate-spin" aria-hidden />}
          {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
        </Button>
      </div>
    </form>
  );
}
