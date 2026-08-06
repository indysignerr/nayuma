import type { Metadata } from "next";
import { Leaf, MapPin, Recycle } from "lucide-react";

export const metadata: Metadata = { title: "Engagement bio & traçabilité" };

const POINTS = [
  { icon: Leaf, title: "Agriculture biologique", text: "Une large part de notre catalogue est certifiée bio, du jardin jusqu'à l'emballage." },
  { icon: MapPin, title: "Sourcing tracé", text: "Chaque lot est sourcé directement auprès de producteurs partenaires, identifiés et suivis." },
  { icon: Recycle, title: "Emballages responsables", text: "Nos boîtes et sachets sont pensés pour limiter leur impact environnemental." },
];

export default function EngagementPage() {
  return (
    <main className="mx-auto max-w-[820px] px-6 py-16">
      <h1 className="font-display text-4xl md:text-5xl mb-10">Engagement bio & traçabilité</h1>
      <div className="flex flex-col gap-8">
        {POINTS.map((p) => (
          <div key={p.title} className="flex gap-4">
            <p.icon className="size-6 text-gold-dark shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-xl mb-1">{p.title}</h2>
              <p className="text-sm text-ink-soft leading-relaxed">{p.text}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
