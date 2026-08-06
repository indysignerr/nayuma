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
    featuredHandles: ["sencha-du-japon", "darjeeling-premier-flush", "matcha-ceremonie-uji"],
    columns: [
      {
        title: "Types",
        links: [
          { label: "Thé vert", href: "/collections/the-vert" },
          { label: "Thé blanc", href: "/collections/the-blanc" },
          { label: "Thé noir", href: "/collections/the-noir" },
          { label: "Matcha", href: "/collections/matcha" },
        ],
      },
      {
        title: "Notes aromatiques",
        links: [
          { label: "Fruité", href: "/collections/thes?notes=fruite" },
          { label: "Bergamote", href: "/collections/thes?notes=bergamote" },
          { label: "Floral", href: "/collections/thes?notes=floral" },
          { label: "Épicé", href: "/collections/thes?notes=epice" },
        ],
      },
      {
        title: "Sélections",
        links: [
          { label: "Best-sellers", href: "/collections/best-sellers" },
          { label: "Bio", href: "/collections/bio" },
          { label: "Grand cru", href: "/collections/grand-cru" },
        ],
      },
      {
        title: "Origines",
        links: [
          { label: "Japon", href: "/collections/origine-japon" },
          { label: "Chine", href: "/collections/origine-chine" },
          { label: "Inde", href: "/collections/origine-inde" },
          { label: "Népal", href: "/collections/origine-nepal" },
          { label: "Corée", href: "/collections/origine-coree" },
          { label: "Vietnam", href: "/collections/origine-vietnam" },
          { label: "Sri Lanka", href: "/collections/origine-sri-lanka" },
        ],
      },
    ],
  },
  {
    label: "Infusions & Rooibos",
    href: "/collections/infusions-rooibos",
    featuredHandles: ["rooibos-vanille", "tisane-camomille-tilleul"],
    columns: [
      {
        title: "Par besoin",
        links: [
          { label: "Sommeil", href: "/collections/infusions-rooibos?need=sommeil" },
          { label: "Digestion", href: "/collections/infusions-rooibos?need=digestion" },
          { label: "Relaxation", href: "/collections/infusions-rooibos?need=relaxation" },
          { label: "Énergie", href: "/collections/infusions-rooibos?need=energie" },
        ],
      },
      {
        title: "La sélection",
        links: [
          { label: "Tous les rooibos", href: "/collections/infusions-rooibos" },
          { label: "Toutes les tisanes", href: "/collections/infusions-rooibos" },
        ],
      },
    ],
  },
  { label: "Thés glacés", href: "/collections/the-glace" },
  { label: "Chai Latté", href: "/collections/chai-latte" },
  {
    label: "Bien-être & Detox",
    href: "/collections/bien-etre-detox",
    featuredHandles: ["cure-detox-21-jours", "relaxation-lavande-camomille"],
    columns: [
      {
        title: "Par besoin",
        links: [
          { label: "Sommeil", href: "/collections/bien-etre-detox?need=sommeil" },
          { label: "Detox", href: "/collections/bien-etre-detox?need=detox" },
          { label: "Énergie", href: "/collections/bien-etre-detox?need=energie" },
          { label: "Digestion", href: "/collections/bien-etre-detox?need=digestion" },
          { label: "Immunité", href: "/collections/bien-etre-detox?need=immunite" },
        ],
      },
    ],
  },
  {
    label: "Coffrets & Accessoires",
    href: "/collections/coffrets-accessoires",
    featuredHandles: ["coffret-decouverte-6-thes", "infuseur-piston-verre"],
    columns: [
      {
        title: "La sélection",
        links: [
          { label: "Cartes cadeaux", href: "/collections/coffrets-accessoires?type=carte-cadeau" },
          { label: "Infuseurs", href: "/collections/coffrets-accessoires?type=infuseur" },
          { label: "Tasses", href: "/collections/coffrets-accessoires?type=tasse" },
          { label: "Boîtes", href: "/collections/coffrets-accessoires?type=boite" },
          { label: "Coffrets", href: "/collections/coffrets-accessoires?type=coffret" },
        ],
      },
    ],
  },
  { label: "FINE TEA", href: "/fine-tea", accentClass: "text-gold-dark" },
];
