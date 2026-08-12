"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-ink text-cream">
      <div className="mx-auto max-w-[1240px] px-6 py-16 md:py-20">
        <ScrollReveal className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-3">-10% sur votre première commande</h2>
          <p className="text-sm text-cream/70 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir votre code de bienvenue et suivre nos nouvelles récoltes.
          </p>

          {submitted ? (
            <p className="text-gold-light font-medium">Merci ! Votre code de bienvenue arrive par email.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="bg-cream text-ink border-transparent rounded-sm h-12"
                />
                <Button type="submit" size="lg" className="rounded-sm bg-gold text-ink hover:bg-gold-light shrink-0">
                  S&apos;inscrire
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Checkbox id="consent" checked={consent} onCheckedChange={(v) => setConsent(v === true)} />
                <Label htmlFor="consent" className="text-xs text-cream/70 font-normal">
                  J&apos;accepte de recevoir les communications de NAYUMA et j&apos;ai lu la{" "}
                  <a href="/politique-de-confidentialite" className="underline underline-offset-2">
                    politique de confidentialité
                  </a>
                  .
                </Label>
              </div>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
