export type Money = {
  amount: string;
  currencyCode: "EUR";
};

export type ShopifyImage = {
  url: string;
  altText: string;
};

export type ProductCategory = "infusion" | "cosmetique";

export type RitualLine = "cheveux" | "feminin";

export type HairNeed = "chute" | "densite" | "brillance" | "cuir-chevelu" | "anti-stress" | "eclat";

export type FeminineNeed = "cycle" | "premenstruel" | "vitalite" | "intime" | "hormonal";

export type Accent =
  | "rose"
  | "terracotta"
  | "sauge"
  | "brun"
  | "creme"
  | "taupe"
  | "cuivre"
  | "or"
  | "vert-fonce";

export type Preparation = {
  temperatureC: number;
  minutesMin: number;
  minutesMax: number;
  advice: string;
};

export type WeightVariant = {
  id: string;
  format: string;
  sku: string;
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  vendor: "NAYUMA";
  category: ProductCategory;
  line?: RitualLine;
  hairNeeds: HairNeed[];
  feminineNeeds: FeminineNeed[];
  accent: Accent;
  shortDescription: string;
  descriptionHtml: string;
  actifs: string;
  preparation?: Preparation;
  images: ShopifyImage[];
  variants: WeightVariant[];
  rating: number;
  reviewCount: number;
};

export type Collection = {
  handle: string;
  title: string;
  category: ProductCategory;
  line?: RitualLine;
  accent: Accent;
  description: string;
  filterKey?: "hairNeed" | "feminineNeed";
  filterValue?: string;
};
