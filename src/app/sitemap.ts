import type { MetadataRoute } from "next";
import { getAllCollections } from "@/lib/shopify/collections";
import { getAllProducts } from "@/lib/shopify/products";
import { getAllJournalPosts } from "@/lib/journal";

export const dynamic = "force-static";

const BASE_URL = "https://nayumatea.com";

const STATIC_ROUTES = [
  "",
  "/fine-tea",
  "/professionnels",
  "/quiz",
  "/guide-du-the",
  "/journal",
  "/notre-histoire",
  "/engagement",
  "/contact",
  "/faq",
  "/livraison-retours",
  "/suivi-commande",
  "/mentions-legales",
  "/conditions-generales-de-vente",
  "/politique-de-confidentialite",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === "" ? "daily" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));

  const [collections, products] = await Promise.all([getAllCollections(), getAllProducts()]);

  const collectionEntries: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${BASE_URL}/collections/${c.handle}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/produits/${p.handle}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const journalEntries: MetadataRoute.Sitemap = getAllJournalPosts().map((post) => ({
    url: `${BASE_URL}/journal/${post.slug}`,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...collectionEntries, ...productEntries, ...journalEntries];
}
