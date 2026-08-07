import { COLLECTIONS } from "./collections";
import { PRODUCTS } from "./products";
import type { Collection, Product } from "./types";

export function getAllCollections(): Collection[] {
  return COLLECTIONS;
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.handle === handle);
}

export function getProductsForCollection(collection: Collection): Product[] {
  const base = PRODUCTS.filter((p) => {
    if (p.category !== collection.category) return false;
    if (collection.line && p.line !== collection.line) return false;
    return true;
  });

  if (!collection.filterKey || !collection.filterValue) return base;

  switch (collection.filterKey) {
    case "hairNeed":
      return base.filter((p) => p.hairNeeds.includes(collection.filterValue as never));
    case "feminineNeed":
      return base.filter((p) => p.feminineNeeds.includes(collection.filterValue as never));
    default:
      return base;
  }
}

export function getUniverseCollections(): Collection[] {
  return COLLECTIONS.filter((c) => !c.filterKey);
}
