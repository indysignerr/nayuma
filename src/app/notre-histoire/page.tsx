import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notre histoire" };

export default function NotreHistoirePage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">La maison</p>
      <h1 className="font-display text-4xl md:text-5xl mb-8">Notre histoire</h1>
      <div className="prose">
        <p>
          NAYUMA est née d&apos;une conviction simple : le thé mérite d&apos;être vécu comme un rituel, pas comme une
          habitude. De la sélection des jardins jusqu&apos;à la tasse, chaque étape est pensée pour révéler la
          personnalité de la feuille.
        </p>
        <p>
          Notre sélection FINE TEA rassemble les crus les plus rares de notre maison — un héritage que nous
          continuons de faire vivre, saison après saison, aux côtés d&apos;une gamme plus accessible pensée pour
          accompagner chaque humeur du quotidien.
        </p>
      </div>
    </main>
  );
}
