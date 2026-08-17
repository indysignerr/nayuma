"use client";

import { useMemo, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import type { Collection, Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/ui/product-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CollectionGrid({
  collection,
  products,
  allCollections,
}: {
  collection: Collection;
  products: Product[];
  allCollections: Collection[];
}) {
  const [activeHandles, setActiveHandles] = useState<string[]>([]);
  const [sort, setSort] = useState<"pertinence" | "prix-asc" | "prix-desc">("pertinence");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const collectionTitleByHandle = useMemo(
    () => new Map(allCollections.map((c) => [c.handle, c.title])),
    [allCollections]
  );

  const relatedHandles = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of products) {
      for (const h of p.collectionHandles) {
        if (h === collection.handle) continue;
        if (!collectionTitleByHandle.has(h)) continue;
        counts.set(h, (counts.get(h) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .filter(([, count]) => count > 0 && count < products.length)
      .map(([handle]) => handle)
      .sort((a, b) => (collectionTitleByHandle.get(a) ?? "").localeCompare(collectionTitleByHandle.get(b) ?? ""));
  }, [products, collection.handle, collectionTitleByHandle]);

  function toggleFilter(handle: string) {
    setActiveHandles((prev) => (prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]));
  }

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) => activeHandles.length === 0 || activeHandles.some((h) => p.collectionHandles.includes(h))
    );

    if (sort === "prix-asc") list = [...list].sort((a, b) => Number(a.minPrice.amount) - Number(b.minPrice.amount));
    if (sort === "prix-desc") list = [...list].sort((a, b) => Number(b.minPrice.amount) - Number(a.minPrice.amount));

    return list;
  }, [products, activeHandles, sort]);

  const sidebar = relatedHandles.length > 0 && (
    <div>
      <p className="text-xs uppercase tracking-widest text-ink-soft mb-3">Affiner par</p>
      <div className="flex flex-col gap-2.5">
        {relatedHandles.map((handle) => (
          <div key={handle} className="flex items-center gap-2">
            <Checkbox
              id={`filter-${handle}`}
              checked={activeHandles.includes(handle)}
              onCheckedChange={() => toggleFilter(handle)}
            />
            <Label htmlFor={`filter-${handle}`} className="text-sm font-normal cursor-pointer">
              {collectionTitleByHandle.get(handle)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-10">
      {sidebar && <aside className="hidden md:block">{sidebar}</aside>}

      <div className={!sidebar ? "md:col-span-2" : undefined}>
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            {sidebar && (
              <button
                onClick={() => setMobileFiltersOpen((v) => !v)}
                className="md:hidden inline-flex items-center gap-2 text-sm border border-cream-line rounded-sm px-3 py-2"
              >
                <SlidersHorizontal className="size-4" /> Filtres
              </button>
            )}
            <p className="text-sm text-ink-soft">{filtered.length} produit{filtered.length > 1 ? "s" : ""}</p>
          </div>

          <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
            <SelectTrigger className="w-[180px] rounded-sm">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pertinence">Pertinence</SelectItem>
              <SelectItem value="prix-asc">Prix croissant</SelectItem>
              <SelectItem value="prix-desc">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sidebar && mobileFiltersOpen && <div className="md:hidden mb-6 border border-cream-line rounded-sm p-4">{sidebar}</div>}

        {activeHandles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeHandles.map((handle) => (
              <button
                key={handle}
                onClick={() => toggleFilter(handle)}
                className="inline-flex items-center gap-1.5 text-xs bg-cream-card border border-cream-line rounded-full pl-3 pr-2 py-1.5 hover:border-gold transition-colors"
              >
                {collectionTitleByHandle.get(handle)} <X className="size-3" />
              </button>
            ))}
            <button onClick={() => setActiveHandles([])} className="text-xs text-ink-soft underline underline-offset-4 ml-1">
              Tout effacer
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <p className="text-sm text-ink-soft py-16 text-center">Aucun produit ne correspond à ces filtres.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
