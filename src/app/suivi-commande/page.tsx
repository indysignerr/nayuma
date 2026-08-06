import type { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Suivre ma commande" };

export default function SuiviCommandePage() {
  return (
    <main className="mx-auto max-w-[560px] px-6 py-16 text-center">
      <h1 className="font-display text-4xl mb-4">Suivre ma commande</h1>
      <p className="text-sm text-ink-soft leading-relaxed mb-8">
        Renseignez votre numéro de commande et l&apos;email utilisé lors de l&apos;achat pour suivre son
        acheminement.
      </p>
      <form className="flex flex-col gap-3">
        <Input placeholder="Numéro de commande" className="rounded-sm h-12" />
        <Input type="email" placeholder="Email" className="rounded-sm h-12" />
        <Button size="lg" className="rounded-sm" type="submit">
          Suivre ma commande
        </Button>
      </form>
    </main>
  );
}
