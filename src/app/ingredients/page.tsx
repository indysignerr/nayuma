import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos ingrédients",
  description: "Les actifs botaniques qui composent les rituels NAYUMA, expliqués un par un.",
};

const INGREDIENTS = [
  { name: "Biotine végétale", text: "Cofacteur clé de la kératine naturelle, elle soutient la pousse et limite la casse." },
  { name: "Silice végétale (prêle)", text: "Reminéralise le bulbe et améliore l'élasticité de la fibre capillaire." },
  { name: "Ortie", text: "Riche en fer, elle stimule la microcirculation du cuir chevelu." },
  { name: "Bambou", text: "Source naturelle de silice, il densifie la chevelure sur la durée." },
  { name: "Ginseng", text: "Racine tonique traditionnelle, elle soutient l'énergie et la vitalité." },
  { name: "Bardane", text: "Purifiante, elle assainit et équilibre les cuirs chevelus sensibles." },
  { name: "Ashwagandha", text: "Plante adaptogène qui aide l'organisme à mieux gérer le stress quotidien." },
  { name: "Baies de goji", text: "Concentrées en antioxydants et vitamine E, elles protègent l'éclat naturel." },
  { name: "Framboisier", text: "Utilisé traditionnellement pour apaiser les journées de cycle." },
  { name: "Gattilier", text: "Plante de référence pour accompagner l'équilibre hormonal féminin." },
  { name: "Maca", text: "Racine andine tonique, réputée pour soutenir la libido et la vitalité." },
  { name: "Sauge", text: "Reconnue pour accompagner les variations hormonales à chaque saison de la vie." },
];

export default function IngredientsPage() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 py-16 md:py-20">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4 text-center">La composition</p>
      <h1 className="font-display text-4xl md:text-5xl text-center mb-6">Nos ingrédients</h1>
      <p className="text-sm text-ink-soft text-center max-w-lg mx-auto mb-14 leading-relaxed">
        Des actifs botaniques choisis pour leur efficacité reconnue, sans superflu — la transparence totale sur ce
        que contient chaque rituel NAYUMA.
      </p>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
        {INGREDIENTS.map((ing) => (
          <div key={ing.name} className="border-b border-cream-line pb-6">
            <h2 className="font-display text-xl mb-2">{ing.name}</h2>
            <p className="text-sm text-ink-soft leading-relaxed">{ing.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
