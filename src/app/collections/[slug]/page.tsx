import { notFound } from "next/navigation";
import { getAllCollections, getCollectionByHandle } from "@/lib/shopify/collections";
import { getProductsForCollection } from "@/lib/shopify/data";
import { CollectionGrid } from "@/components/collection/collection-grid";
import type { Metadata } from "next";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const collections = await getAllCollections();
  return collections.map((c) => ({ slug: c.handle }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionByHandle(slug);
  if (!collection) return {};
  return {
    title: collection.title,
    description: collection.description || undefined,
    openGraph: { title: collection.title, description: collection.description || undefined },
  };
}

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = await getCollectionByHandle(slug);
  if (!collection) notFound();
  const [products, allCollections] = await Promise.all([getProductsForCollection(collection), getAllCollections()]);

  return (
    <main className="mx-auto max-w-[1240px] px-6 py-12">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-gold-dark mb-3">Collection</p>
        <h1 className="font-display text-4xl md:text-5xl mb-4">{collection.title}</h1>
        {collection.description && <p className="text-sm text-ink-soft leading-relaxed">{collection.description}</p>}
      </header>

      <CollectionGrid collection={collection} products={products} allCollections={allCollections} />
    </main>
  );
}
