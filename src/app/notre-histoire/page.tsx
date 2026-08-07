import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notre histoire" };

export default function NotreHistoirePage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4">La maison</p>
      <h1 className="font-display text-4xl md:text-5xl mb-8">Notre histoire</h1>
      <div className="prose">
        <p>
          NAYUMA est née d&apos;une conviction simple : la beauté se cultive de l&apos;intérieur, pas comme une
          habitude. De la sélection des plantes jusqu&apos;à l&apos;infusion, chaque étape est pensée pour révéler
          les bienfaits de la botanique au service du cheveu et du bien-être féminin.
        </p>
        <p>
          Nos rituels capillaires et féminins rassemblent des actifs choisis avec exigence — une exigence que nous
          continuons de faire vivre, saison après saison, aux côtés d&apos;une petite gamme de cosmétiques NAYUMA
          pensée pour accompagner chaque rituel.
        </p>
      </div>
    </main>
  );
}
