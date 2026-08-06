import type { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Mon compte" };

export default function ComptePage() {
  return (
    <main className="mx-auto max-w-[420px] px-6 py-16">
      <h1 className="font-display text-4xl mb-8 text-center">Mon compte</h1>
      <form className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email" className="mb-1.5 block">
            Email
          </Label>
          <Input id="email" type="email" className="rounded-sm h-12" />
        </div>
        <div>
          <Label htmlFor="password" className="mb-1.5 block">
            Mot de passe
          </Label>
          <Input id="password" type="password" className="rounded-sm h-12" />
        </div>
        <Button size="lg" className="rounded-sm mt-2" type="submit">
          Se connecter
        </Button>
      </form>
    </main>
  );
}
