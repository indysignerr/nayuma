import Link from "next/link";
import type { Metadata } from "next";
import { getAllJournalPosts, formatJournalDate } from "@/lib/journal";
import { ACCENT_BG } from "@/lib/accent";

export const metadata: Metadata = {
  title: "Journal du thé",
  description: "Recettes, origines et rituels — le journal éditorial de la maison NAYUMA.",
};

export default function JournalPage() {
  const posts = getAllJournalPosts();

  return (
    <main className="mx-auto max-w-[1000px] px-6 py-16">
      <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-4 text-center">La maison</p>
      <h1 className="font-display text-4xl md:text-5xl text-center mb-4">Journal du thé</h1>
      <p className="text-sm text-ink-soft text-center max-w-lg mx-auto mb-14">
        Recettes, voyages aux origines et rituels de dégustation — les coulisses de la maison NAYUMA, chaque mois.
      </p>

      <div className="flex flex-col divide-y divide-cream-line">
        {posts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group flex items-start gap-6 py-8">
            <span className={`size-2 mt-2 rounded-full shrink-0 ${ACCENT_BG[post.accent]}`} aria-hidden />
            <div className="flex-1">
              <div className="flex items-center gap-3 text-xs text-ink-soft mb-2">
                <span className="uppercase tracking-widest">{post.category}</span>
                <span>·</span>
                <time dateTime={post.date}>{formatJournalDate(post.date)}</time>
                <span>·</span>
                <span>{post.readMinutes} min de lecture</span>
              </div>
              <h2 className="font-display text-2xl mb-2 group-hover:text-gold-dark transition-colors">{post.title}</h2>
              <p className="text-sm text-ink-soft leading-relaxed max-w-xl">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
