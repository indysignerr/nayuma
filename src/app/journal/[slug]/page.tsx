import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { JOURNAL_POSTS, getJournalPostBySlug, formatJournalDate } from "@/lib/journal";
import { getCollectionByHandle } from "@/lib/shopify/data";
import { ACCENT_BG } from "@/lib/accent";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return JOURNAL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function JournalArticlePage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) notFound();
  const relatedCollection = post.relatedCollectionHandle ? getCollectionByHandle(post.relatedCollectionHandle) : undefined;

  return (
    <main className="mx-auto max-w-[720px] px-6 py-16">
      <Link href="/journal" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors mb-8">
        <ArrowLeft className="size-4" /> Retour au journal
      </Link>

      <div className="flex items-center gap-3 text-xs text-ink-soft mb-4">
        <span className={`size-2 rounded-full ${ACCENT_BG[post.accent]}`} aria-hidden />
        <span className="uppercase tracking-widest">{post.category}</span>
        <span>·</span>
        <time dateTime={post.date}>{formatJournalDate(post.date)}</time>
        <span>·</span>
        <span>{post.readMinutes} min de lecture</span>
      </div>

      <h1 className="font-display text-4xl md:text-5xl mb-10 leading-tight">{post.title}</h1>

      <div className="prose">
        {post.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {relatedCollection && (
        <Link
          href={`/collections/${relatedCollection.handle}`}
          className="mt-10 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4 hover:text-gold-dark transition-colors"
        >
          Découvrir la sélection {relatedCollection.title} <ArrowRight className="size-4" />
        </Link>
      )}
    </main>
  );
}
