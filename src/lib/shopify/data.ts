import { getAllProducts } from "./products";
import type { Collection, Product } from "./types";

export async function getProductsForCollection(collection: Collection): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((p) => p.collectionHandles.includes(collection.handle));
}
