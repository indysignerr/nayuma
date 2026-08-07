import type { Accent } from "@/lib/shopify/types";

export type JournalCategory = "Rituels" | "Ingrédients" | "Cycle & Hormones" | "Actualités";

export type JournalPost = {
  slug: string;
  title: string;
  category: JournalCategory;
  accent: Accent;
  excerpt: string;
  date: string;
  readMinutes: number;
  paragraphs: string[];
  relatedCollectionHandle?: string;
};

export const JOURNAL_POSTS: JournalPost[] = [
  {
    slug: "freiner-chute-cheveux-naturellement",
    title: "Freiner la chute de cheveux, naturellement",
    category: "Rituels",
    accent: "cuivre",
    excerpt: "Trois gestes simples pour accompagner une chevelure fragilisée, sans bouleverser sa routine.",
    date: "2026-07-20",
    readMinutes: 4,
    relatedCollectionHandle: "chute-fortification",
    paragraphs: [
      "La chute de cheveux a rarement une seule cause : stress, saison, carences ou variations hormonales s'additionnent souvent. Avant de multiplier les produits, mieux vaut agir en profondeur, sur la durée.",
      "L'ortie et la prêle, riches en fer et en silice, soutiennent la fibre à la racine tandis que la biotine végétale agit comme cofacteur de la kératine naturelle. Consommées en infusion quotidienne, ces plantes accompagnent le cycle de pousse sans le brusquer.",
      "Notre conseil : donnez-vous au moins six à huit semaines avant de juger les effets d'un rituel capillaire — le cycle du cheveu se compte en mois, pas en jours.",
    ],
  },
  {
    slug: "comprendre-silice-biotine-keratine",
    title: "Silice, biotine, kératine : comprendre les actifs qui densifient",
    category: "Ingrédients",
    accent: "or",
    excerpt: "Trois actifs reviennent sans cesse dans les soins capillaires. Voici ce qu'ils font vraiment.",
    date: "2026-06-15",
    readMinutes: 5,
    relatedCollectionHandle: "densite-volume",
    paragraphs: [
      "La kératine est la protéine structurelle du cheveu : elle lui donne sa résistance et sa forme. Avec l'âge, la couleur ou la chaleur, cette structure s'use — d'où l'intérêt d'apporter des cofacteurs qui soutiennent sa production naturelle plutôt que de la remplacer artificiellement.",
      "La silice végétale, présente en grande quantité dans le bambou et la prêle, améliore l'élasticité de la fibre et sa résistance à la casse. La biotine, elle, intervient directement dans le métabolisme des acides aminés qui composent la kératine.",
      "Associés dans la durée, ces actifs ne créent pas de cheveux nouveaux du jour au lendemain — ils créent les conditions pour que la repousse naturelle se fasse dans de meilleures conditions.",
    ],
  },
  {
    slug: "traverser-la-menopause-en-douceur",
    title: "Traverser les transitions hormonales en douceur",
    category: "Cycle & Hormones",
    accent: "taupe",
    excerpt: "Sauge, houblon, soja fermenté : les plantes traditionnellement associées à l'équilibre hormonal féminin.",
    date: "2026-05-02",
    readMinutes: 5,
    relatedCollectionHandle: "equilibre-hormonal",
    paragraphs: [
      "Les variations hormonales qui accompagnent certaines périodes de la vie féminine s'accompagnent souvent de bouffées de chaleur, de troubles du sommeil ou de sautes d'humeur. Plusieurs plantes sont traditionnellement utilisées pour accompagner cette transition en douceur.",
      "La sauge est reconnue de longue date pour son action sur la régulation thermique. Le houblon et le soja fermenté apportent des composés d'origine végétale qui interagissent doucement avec les récepteurs hormonaux, sans les bouleverser.",
      "Comme pour tout rituel botanique, la régularité prime : une tasse par jour, à heure fixe, s'intègre plus durablement qu'une consommation ponctuelle.",
    ],
  },
  {
    slug: "cycle-feminin-les-plantes-alliees",
    title: "Cycle féminin : les plantes alliées, semaine après semaine",
    category: "Cycle & Hormones",
    accent: "rose",
    excerpt: "Framboisier, camomille, gattilier : comment adapter son infusion aux différentes phases du cycle.",
    date: "2026-04-10",
    readMinutes: 5,
    relatedCollectionHandle: "cycle-feminin",
    paragraphs: [
      "Le cycle féminin traverse plusieurs phases hormonales distinctes, chacune avec ses propres besoins. La phytothérapie propose depuis longtemps des plantes adaptées à chacune de ces étapes.",
      "La feuille de framboisier est traditionnellement utilisée pour apaiser les jours de règles, tandis que la camomille agit sur les tensions et l'irritabilité. Le gattilier, lui, est surtout recherché dans les jours précédant le cycle pour son action sur le confort prémenstruel.",
      "Ces infusions ne remplacent pas un avis médical en cas de trouble persistant, mais peuvent accompagner un rituel de bien-être au quotidien, en complément d'une bonne hygiène de vie.",
    ],
  },
  {
    slug: "routine-capillaire-3-gestes",
    title: "Une routine capillaire en 3 gestes, pas plus",
    category: "Rituels",
    accent: "sauge",
    excerpt: "Pas besoin de dix produits : voici les trois gestes qui font réellement la différence.",
    date: "2026-03-05",
    readMinutes: 4,
    relatedCollectionHandle: "cuir-chevelu-equilibre",
    paragraphs: [
      "Face à la multiplication des soins capillaires, il est facile d'en faire trop. Trois gestes suffisent pourtant à couvrir l'essentiel : nettoyer en douceur, nourrir la fibre, et prendre soin du cuir chevelu — le socle de toute chevelure saine.",
      "Un cuir chevelu déséquilibré ou stressé freine la pousse avant même que la fibre ne soit concernée. La bardane et la sauge, en infusion, aident à l'apaiser de l'intérieur, en complément d'un shampoing doux adapté.",
      "Le troisième geste, souvent oublié : la régularité. Un rituel simple tenu sur plusieurs mois donne toujours de meilleurs résultats qu'une routine complexe abandonnée après deux semaines.",
    ],
  },
];

export function getAllJournalPosts(): JournalPost[] {
  return [...JOURNAL_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return JOURNAL_POSTS.find((p) => p.slug === slug);
}

export function formatJournalDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(date));
}
