import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllJournalPosts, formatJournalDate } from "@/lib/journal";
import { ACCENT_BG } from "@/lib/accent";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function JournalTeaser() {
  const posts = getAllJournalPosts().slice(0, 3);

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-16 md:py-20 border-t border-cream-line">
      <ScrollReveal className="flex items-end justify-between mb-8">
        <h2 className="font-display text-3xl md:text-4xl">Le journal du thé</h2>
        <Link href="/journal" className="hidden sm:inline-flex items-center gap-1.5 text-sm hover:text-gold-dark transition-colors">
          Tous les articles <ArrowRight className="size-4" />
        </Link>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {posts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.06}>
            <Link href={`/journal/${post.slug}`} className="group block">
              <span className={`block h-1 w-10 rounded-full mb-4 ${ACCENT_BG[post.accent]}`} aria-hidden />
              <p className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                {post.category} · {formatJournalDate(post.date)}
              </p>
              <h3 className="font-display text-xl mb-2 group-hover:text-gold-dark transition-colors">{post.title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{post.excerpt}</p>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
