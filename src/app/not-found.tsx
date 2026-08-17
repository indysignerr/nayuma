import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[720px] px-6 py-24 md:py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">Erreur 404</p>
      <h1 className="font-display text-4xl md:text-5xl mb-6">Cette page s&apos;est égarée en chemin</h1>
      <p className="text-sm text-ink-soft leading-relaxed max-w-md mx-auto mb-10">
        La page que vous cherchez n&apos;existe pas ou plus. Elle a peut-être changé d&apos;adresse — explorez notre
        sélection de thés en attendant.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button asChild size="lg" className="rounded-sm gap-2">
          <Link href="/">
            Retour à l&apos;accueil <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Link href="/collections/thes" className="text-sm underline underline-offset-4 text-ink-soft hover:text-ink transition-colors">
          Découvrir nos thés
        </Link>
      </div>
    </main>
  );
}
