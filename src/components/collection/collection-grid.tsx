"use client";

import { useMemo, useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import type { Collection, Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/ui/product-card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Filtre « Ingrédients » : repère l'ingrédient dans le titre ou la description du produit.
const INGREDIENTS: { key: string; label: string; pattern: RegExp }[] = [
  { key: "pomme", label: "Pomme", pattern: /pomme/ },
  { key: "cannelle", label: "Cannelle", pattern: /can+el+e/ },
  { key: "amande", label: "Amande", pattern: /amande/ },
  { key: "speculoos", label: "Spéculoos", pattern: /speculo/ },
  { key: "caramel", label: "Caramel", pattern: /caramel/ },
];

function searchableText(product: Product): string {
  return `${product.title} ${product.description}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

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
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [sort, setSort] = useState<"pertinence" | "prix-asc" | "prix-desc">("pertinence");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const collectionTitleByHandle = useMemo(
    () => new Map(allCollections.map((c) => [c.handle, c.title])),
    [allCollections],
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

  const ingredientMatches = useMemo(() => {
    const texts = new Map(products.map((p) => [p.handle, searchableText(p)]));
    return new Map(
      INGREDIENTS.map((ingredient) => [
        ingredient.key,
        new Set(products.filter((p) => ingredient.pattern.test(texts.get(p.handle) ?? "")).map((p) => p.handle)),
      ]),
    );
  }, [products]);

  const availableIngredients = INGREDIENTS.filter((i) => (ingredientMatches.get(i.key)?.size ?? 0) > 0);

  function toggleIngredient(key: string) {
    setActiveIngredients((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  }

  function toggleFilter(handle: string) {
    setActiveHandles((prev) => (prev.includes(handle) ? prev.filter((h) => h !== handle) : [...prev, handle]));
  }

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        (activeHandles.length === 0 || activeHandles.some((h) => p.collectionHandles.includes(h))) &&
        (activeIngredients.length === 0 || activeIngredients.some((key) => ingredientMatches.get(key)?.has(p.handle))),
    );

    if (sort === "prix-asc") list = [...list].sort((a, b) => Number(a.minPrice.amount) - Number(b.minPrice.amount));
    if (sort === "prix-desc") list = [...list].sort((a, b) => Number(b.minPrice.amount) - Number(a.minPrice.amount));

    return list;
  }, [products, activeHandles, activeIngredients, ingredientMatches, sort]);

  const hasFilters = relatedHandles.length > 0 || availableIngredients.length > 0;
  const sidebar = hasFilters && (
    <div className="flex flex-col gap-8">
      {availableIngredients.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-ink-soft mb-3">Ingrédients</p>
          <div className="flex flex-col gap-2.5">
            {availableIngredients.map((ingredient) => (
              <div key={ingredient.key} className="flex items-center gap-2">
                <Checkbox
                  id={`ingredient-${ingredient.key}`}
                  checked={activeIngredients.includes(ingredient.key)}
                  onCheckedChange={() => toggleIngredient(ingredient.key)}
                />
                <Label htmlFor={`ingredient-${ingredient.key}`} className="text-sm font-normal cursor-pointer">
                  {ingredient.label}
                  <span className="text-ink-soft">({ingredientMatches.get(ingredient.key)?.size})</span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}
      {relatedHandles.length > 0 && (
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
      )}
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
            <p className="text-sm text-ink-soft">
              {filtered.length} produit{filtered.length > 1 ? "s" : ""}
            </p>
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

        {sidebar && mobileFiltersOpen && (
          <div className="md:hidden mb-6 border border-cream-line rounded-sm p-4">{sidebar}</div>
        )}

        {activeHandles.length + activeIngredients.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeIngredients.map((key) => (
              <button
                key={key}
                onClick={() => toggleIngredient(key)}
                className="inline-flex items-center gap-1.5 text-xs bg-cream-card border border-cream-line rounded-full pl-3 pr-2 py-1.5 hover:border-gold transition-colors"
              >
                {INGREDIENTS.find((i) => i.key === key)?.label} <X className="size-3" />
              </button>
            ))}
            {activeHandles.map((handle) => (
              <button
                key={handle}
                onClick={() => toggleFilter(handle)}
                className="inline-flex items-center gap-1.5 text-xs bg-cream-card border border-cream-line rounded-full pl-3 pr-2 py-1.5 hover:border-gold transition-colors"
              >
                {collectionTitleByHandle.get(handle)} <X className="size-3" />
              </button>
            ))}
            <button
              onClick={() => {
                setActiveHandles([]);
                setActiveIngredients([]);
              }}
              className="text-xs text-ink-soft underline underline-offset-4 ml-1"
            >
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
