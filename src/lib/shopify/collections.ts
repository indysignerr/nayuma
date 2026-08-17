import { cache } from "react";
import { shopifyFetch } from "./storefront-client";
import type { Collection } from "./types";

const COLLECTIONS_QUERY = `
  query Collections($first: Int!, $after: String) {
    collections(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node {
          id
          handle
          title
          description
          image { url altText }
        }
      }
    }
  }
`;

type RawCollectionNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: { url: string; altText: string | null } | null;
};

export const getAllCollections = cache(async (): Promise<Collection[]> => {
  const all: RawCollectionNode[] = [];
  let after: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const data: {
      collections: {
        pageInfo: { hasNextPage: boolean; endCursor: string | null };
        edges: { node: RawCollectionNode }[];
      };
    } = await shopifyFetch(COLLECTIONS_QUERY, { first: 100, after });

    all.push(...data.collections.edges.map((e) => e.node));
    hasNextPage = data.collections.pageInfo.hasNextPage;
    after = data.collections.pageInfo.endCursor;
  }

  return all.map((node) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    image: node.image ?? undefined,
  }));
});

export async function getCollectionByHandle(handle: string): Promise<Collection | undefined> {
  const collections = await getAllCollections();
  return collections.find((c) => c.handle === handle);
}
