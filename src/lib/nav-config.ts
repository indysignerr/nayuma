export type NavLink = { label: string; href: string };

export type NavColumn = {
  title: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  href: string;
  accentClass?: string;
  columns?: NavColumn[];
  featuredHandles?: string[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Thés",
    href: "/collections/thes",
    featuredHandles: [],
    columns: [
      {
        title: "Types",
        links: [
          { label: "Thé vert", href: "/collections/thes-verts-althea" },
          { label: "Thé noir", href: "/collections/the-noir-en-vrac" },
          { label: "Thé blanc", href: "/collections/the-blanc" },
          { label: "Matcha", href: "/collections/collection-matcha-en-vrac" },
        ],
      },
      {
        title: "Notes aromatiques",
        links: [
          { label: "Gourmand", href: "/collections/gourmand" },
          { label: "Fruité", href: "/collections/fruites" },
          { label: "Floral", href: "/collections/florales" },
          { label: "Épicé", href: "/collections/epices" },
        ],
      },
      {
        title: "Sélections",
        links: [
          { label: "Best-sellers", href: "/collections/best-sellers" },
          { label: "Bio", href: "/collections/thes-classiques-bio" },
          { label: "Grand cru", href: "/collections/grand-cru" },
        ],
      },
      {
        title: "Origines",
        links: [
          { label: "Japon", href: "/collections/japon" },
          { label: "Chine", href: "/collections/chine" },
          { label: "Inde", href: "/collections/inde" },
          { label: "Népal", href: "/collections/nepal" },
          { label: "Corée du Sud", href: "/collections/coree-du-sud" },
          { label: "Vietnam", href: "/collections/vietnam" },
          { label: "Sri Lanka", href: "/collections/sri-lanka" },
        ],
      },
    ],
  },
  {
    label: "Infusions & Rooibos",
    href: "/collections/infusions-et-rooibos",
    featuredHandles: [],
    columns: [
      {
        title: "Par besoin",
        links: [
          { label: "Sommeil", href: "/collections/infusions-rooibos-sommeil" },
          { label: "Digestion", href: "/collections/infusions-rooibos-digestion" },
          { label: "Relaxation", href: "/collections/infusion-rooibos-relaxation" },
          { label: "Énergie", href: "/collections/infusion-rooibos-energie" },
        ],
      },
      {
        title: "La sélection",
        links: [
          { label: "Tous les rooibos", href: "/collections/rooibos-et-infusions-en-vrac" },
          { label: "Toutes les infusions", href: "/collections/infusions" },
          { label: "Best-sellers", href: "/collections/best-sellers-infusions-rooibos" },
        ],
      },
    ],
  },
  { label: "Thés glacés", href: "/collections/thes-infusion-glaces-ice-cup-en-vrac-au-kg" },
  { label: "Chai Latté", href: "/collections/collection-chai-latte-en-vrac-1-kg" },
  {
    label: "Bien-être & Detox",
    href: "/collections/bien-etre-detox",
    featuredHandles: [],
    columns: [
      {
        title: "Par besoin",
        links: [
          { label: "Sommeil", href: "/collections/bien-etre-sommeil" },
          { label: "Detox", href: "/collections/bien-etre-detox-1" },
          { label: "Énergie", href: "/collections/bien-etre-energie" },
          { label: "Digestion", href: "/collections/bien-etre-digestion" },
          { label: "Immunité", href: "/collections/bien-etre-immunite" },
          { label: "Relaxation", href: "/collections/bien-etre-relaxation" },
        ],
      },
    ],
  },
  {
    label: "Coffrets & Accessoires",
    href: "/collections/coffrets-accessoires",
    columns: [
      {
        title: "La sélection",
        links: [
          { label: "Coffrets à 10€", href: "/collections/coffret-accessoires-10" },
          { label: "Coffrets à 25€", href: "/collections/coffret-accessoires-20" },
          { label: "Coffrets à 40€", href: "/collections/coffret-accessoires-40" },
          { label: "Infuseurs", href: "/collections/infuseur" },
        ],
      },
    ],
  },
  { label: "FINE TEA", href: "/fine-tea", accentClass: "text-gold-dark" },
];
