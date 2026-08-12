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
  const inUniverse = PRODUCTS.filter((p) => p.universe === collection.universe);
  if (!collection.filterKey || !collection.filterValue) return inUniverse;

  switch (collection.filterKey) {
    case "type":
      return inUniverse.filter((p) => p.type === collection.filterValue);
    case "origin":
      return inUniverse.filter((p) => p.origin === collection.filterValue);
    case "need":
      return inUniverse.filter((p) => p.need.includes(collection.filterValue as never));
    case "selection":
      return inUniverse.filter((p) => p.selections.includes(collection.filterValue as never));
    default:
      return inUniverse;
  }
}

export function getUniverseCollections(): Collection[] {
  return COLLECTIONS.filter((c) => !c.filterKey);
}
