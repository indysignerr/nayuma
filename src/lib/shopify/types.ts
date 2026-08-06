export type Money = {
  amount: string;
  currencyCode: "EUR";
};

export type ShopifyImage = {
  url: string;
  altText: string;
};

export type Universe =
  | "thes"
  | "infusions-rooibos"
  | "thes-glaces"
  | "chai-latte"
  | "bien-etre-detox"
  | "coffrets-accessoires";

export type TeaType = "vert" | "blanc" | "noir" | "matcha";

export type AromaticNote =
  | "fruite"
  | "bergamote"
  | "floral"
  | "epice"
  | "gourmand"
  | "mentholé";

export type Origin =
  | "japon"
  | "chine"
  | "inde"
  | "nepal"
  | "coree"
  | "vietnam"
  | "sri-lanka";

export type Need =
  | "sommeil"
  | "digestion"
  | "relaxation"
  | "energie"
  | "detox"
  | "immunite";

export type Selection = "best-sellers" | "bio" | "grand-cru";

export type AccessoryType =
  | "carte-cadeau"
  | "infuseur"
  | "tasse"
  | "boite"
  | "coffret";

export type Accent =
  | "green"
  | "black"
  | "rooibos"
  | "white"
  | "matcha"
  | "chai"
  | "wellness"
  | "gold";

export type WeightVariant = {
  id: string;
  weight: "100g" | "500g" | "1kg" | "Unique";
  sku: string;
  price: Money;
  compareAtPrice?: Money;
  availableForSale: boolean;
};

export type Preparation = {
  temperatureC: number;
  minutesMin: number;
  minutesMax: number;
  advice: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  vendor: "NAYUMA";
  universe: Universe;
  type?: TeaType;
  notes: AromaticNote[];
  origin?: Origin;
  need: Need[];
  selections: Selection[];
  accessoryType?: AccessoryType;
  fineTea: boolean;
  accent: Accent;
  shortDescription: string;
  descriptionHtml: string;
  composition: string;
  preparation?: Preparation;
  images: ShopifyImage[];
  variants: WeightVariant[];
  rating: number;
  reviewCount: number;
};

export type Collection = {
  handle: string;
  title: string;
  universe: Universe;
  accent: Accent;
  description: string;
  filterKey?: "type" | "need" | "selection" | "origin";
  filterValue?: string;
};
