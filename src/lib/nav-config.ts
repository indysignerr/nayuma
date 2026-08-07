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
    label: "Boutique",
    href: "/collections/rituels-cheveux",
    featuredHandles: ["rituel-chute-fortification", "rituel-douce-lune"],
    columns: [
      {
        title: "Rituels Cheveux",
        links: [
          { label: "Tous les rituels cheveux", href: "/collections/rituels-cheveux" },
          { label: "Chute & Fortification", href: "/collections/chute-fortification" },
          { label: "Densité & Volume", href: "/collections/densite-volume" },
          { label: "Brillance & Texture", href: "/collections/brillance-texture" },
          { label: "Cuir Chevelu & Équilibre", href: "/collections/cuir-chevelu-equilibre" },
          { label: "Anti-Stress & Beauté", href: "/collections/anti-stress-beaute" },
          { label: "Éclat & Protection", href: "/collections/eclat-protection" },
        ],
      },
      {
        title: "Rituels Féminins",
        links: [
          { label: "Tous les rituels féminins", href: "/collections/rituels-feminins" },
          { label: "Cycle féminin", href: "/collections/cycle-feminin" },
          { label: "Confort prémenstruel", href: "/collections/confort-premenstruel" },
          { label: "Vitalité féminine", href: "/collections/vitalite-feminine" },
          { label: "Confort intime", href: "/collections/confort-intime" },
          { label: "Équilibre hormonal", href: "/collections/equilibre-hormonal" },
        ],
      },
      {
        title: "Cosmétiques",
        links: [{ label: "Cosmétiques NAYUMA", href: "/collections/cosmetiques-nayuma" }],
      },
    ],
  },
  { label: "Rituels", href: "/rituels" },
  { label: "Ingrédients", href: "/ingredients" },
  { label: "Journal", href: "/journal" },
];
