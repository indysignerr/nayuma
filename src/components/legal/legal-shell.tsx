import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors mb-8">
        <ArrowLeft className="size-4" /> Retour à l&apos;accueil
      </Link>
      <h1 className="font-display text-4xl md:text-5xl mb-10">{title}</h1>
      <div className="prose">{children}</div>
    </main>
  );
}
