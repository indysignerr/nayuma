import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllCollections, getCollectionByHandle, getProductsForCollection } from "@/lib/shopify/data";
import { CollectionGrid } from "@/components/collection/collection-grid";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllCollections().map((c) => ({ slug: c.handle }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionByHandle(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description,
    openGraph: { title: collection.title, description: collection.description },
  };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = getCollectionByHandle(slug);
  if (!collection) notFound();
  const products = getProductsForCollection(collection);

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-12">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-3">Collection</p>
        <h1 className="font-display text-4xl md:text-5xl mb-4">{collection.title}</h1>
        <p className="text-sm text-ink-soft leading-relaxed">{collection.description}</p>
      </header>

      <Suspense fallback={null}>
        <CollectionGrid collection={collection} products={products} />
      </Suspense>
    </main>
  );
}
