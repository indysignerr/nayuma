"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { X, SlidersHorizontal } from "lucide-react";
import type { Collection, Product } from "@/lib/shopify/types";
import { NOTE_LABELS, ORIGIN_LABELS, NEED_LABELS, ACCESSORY_LABELS } from "@/lib/shopify/collections";
import { SELECTION_LABELS, unique } from "@/lib/facets";
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

type FacetKey = "notes" | "origin" | "need" | "selections" | "accessoryType";

type FilterState = Record<FacetKey, string[]>;

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function CollectionGrid({ collection, products }: { collection: Collection; products: Product[] }) {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>(() => ({
    notes: searchParams.get("notes")?.split(",").filter(Boolean) ?? [],
    origin: searchParams.get("origin")?.split(",").filter(Boolean) ?? [],
    need: searchParams.get("need")?.split(",").filter(Boolean) ?? [],
    selections: searchParams.get("selection")?.split(",").filter(Boolean) ?? [],
    accessoryType: searchParams.get("type")?.split(",").filter(Boolean) ?? [],
  }));
  const [sort, setSort] = useState<"pertinence" | "prix-asc" | "prix-desc">("pertinence");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const availableNotes = useMemo(() => unique(products.flatMap((p) => p.notes)), [products]);
  const availableOrigins = useMemo(() => unique(products.map((p) => p.origin).filter(Boolean)) as string[], [products]);
  const availableNeeds = useMemo(() => unique(products.flatMap((p) => p.need)), [products]);
  const availableSelections = useMemo(() => unique(products.flatMap((p) => p.selections)), [products]);
  const availableAccessoryTypes = useMemo(
    () => unique(products.map((p) => p.accessoryType).filter(Boolean)) as string[],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.notes.length && !filters.notes.some((n) => p.notes.includes(n as never))) return false;
      if (filters.origin.length && !(p.origin && filters.origin.includes(p.origin))) return false;
      if (filters.need.length && !filters.need.some((n) => p.need.includes(n as never))) return false;
      if (filters.selections.length && !filters.selections.some((s) => p.selections.includes(s as never))) return false;
      if (filters.accessoryType.length && !(p.accessoryType && filters.accessoryType.includes(p.accessoryType)))
        return false;
      return true;
    });

    if (sort === "prix-asc") list = [...list].sort((a, b) => Number(a.variants[0].price.amount) - Number(b.variants[0].price.amount));
    if (sort === "prix-desc") list = [...list].sort((a, b) => Number(b.variants[0].price.amount) - Number(a.variants[0].price.amount));

    return list;
  }, [products, filters, sort]);

  const activeChips = useMemo(() => {
    const chips: { key: FacetKey; value: string; label: string }[] = [];
    filters.notes.forEach((v) => chips.push({ key: "notes", value: v, label: NOTE_LABELS[v] ?? v }));
    filters.origin.forEach((v) => chips.push({ key: "origin", value: v, label: ORIGIN_LABELS[v] ?? v }));
    filters.need.forEach((v) => chips.push({ key: "need", value: v, label: NEED_LABELS[v] ?? v }));
    filters.selections.forEach((v) => chips.push({ key: "selections", value: v, label: SELECTION_LABELS[v] ?? v }));
    filters.accessoryType.forEach((v) => chips.push({ key: "accessoryType", value: v, label: ACCESSORY_LABELS[v] ?? v }));
    return chips;
  }, [filters]);

  function toggleFilter(key: FacetKey, value: string) {
    setFilters((prev) => ({ ...prev, [key]: toggle(prev[key], value) }));
  }

  function clearAll() {
    setFilters({ notes: [], origin: [], need: [], selections: [], accessoryType: [] });
  }

  const FacetGroup = ({ title, options, labels, facetKey }: { title: string; options: string[]; labels: Record<string, string>; facetKey: FacetKey }) =>
    options.length > 0 ? (
      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-ink-soft mb-3">{title}</p>
        <div className="flex flex-col gap-2.5">
          {options.map((opt) => (
            <div key={opt} className="flex items-center gap-2">
              <Checkbox
                id={`${facetKey}-${opt}`}
                checked={filters[facetKey].includes(opt)}
                onCheckedChange={() => toggleFilter(facetKey, opt)}
              />
              <Label htmlFor={`${facetKey}-${opt}`} className="text-sm font-normal cursor-pointer">
                {labels[opt] ?? opt}
              </Label>
            </div>
          ))}
        </div>
      </div>
    ) : null;

  const sidebar = (
    <div>
      <FacetGroup title="Notes aromatiques" options={availableNotes} labels={NOTE_LABELS} facetKey="notes" />
      <FacetGroup title="Origine" options={availableOrigins} labels={ORIGIN_LABELS} facetKey="origin" />
      <FacetGroup title="Besoin" options={availableNeeds} labels={NEED_LABELS} facetKey="need" />
      <FacetGroup title="Sélection" options={availableSelections} labels={SELECTION_LABELS} facetKey="selections" />
      <FacetGroup title="Catégorie" options={availableAccessoryTypes} labels={ACCESSORY_LABELS} facetKey="accessoryType" />
    </div>
  );

  return (
    <div className="grid md:grid-cols-[220px_1fr] gap-10">
      <aside className="hidden md:block">{sidebar}</aside>

      <div>
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFiltersOpen((v) => !v)}
              className="md:hidden inline-flex items-center gap-2 text-sm border border-cream-line rounded-sm px-3 py-2"
            >
              <SlidersHorizontal className="size-4" /> Filtres
            </button>
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

        {mobileFiltersOpen && <div className="md:hidden mb-6 border border-cream-line rounded-sm p-4">{sidebar}</div>}

        {activeChips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value}`}
                onClick={() => toggleFilter(chip.key, chip.value)}
                className="inline-flex items-center gap-1.5 text-xs bg-cream-card border border-cream-line rounded-full pl-3 pr-2 py-1.5 hover:border-gold transition-colors"
              >
                {chip.label} <X className="size-3" />
              </button>
            ))}
            <button onClick={clearAll} className="text-xs text-ink-soft underline underline-offset-4 ml-1">
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
