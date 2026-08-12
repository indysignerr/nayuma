import type { Accent } from "@/lib/shopify/types";

export type JournalCategory = "Recettes" | "Origines" | "Rituels" | "Actualités";

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
    slug: "the-glace-maison-en-3-etapes",
    title: "Le thé glacé maison, en 3 étapes",
    category: "Recettes",
    accent: "green",
    excerpt: "Une méthode simple pour un thé glacé maison qui n'a rien à envier aux versions industrielles.",
    date: "2026-07-20",
    readMinutes: 4,
    relatedCollectionHandle: "the-glace",
    paragraphs: [
      "Le thé glacé maison n'a rien de compliqué, à condition de respecter une règle simple : ne jamais faire infuser à froid un thé pensé pour l'eau chaude sans ajuster le temps de contact. Trop court, l'infusion manque de caractère. Trop long, elle vire à l'amertume.",
      "Étape 1 : infusez votre thé deux fois plus concentré que d'habitude, à la bonne température pour le type choisi. Étape 2 : laissez refroidir à température ambiante avant de réfrigérer — verser du thé chaud directement sur des glaçons dilue les arômes. Étape 3 : servez sur glace pilée, avec une rondelle de citron ou quelques feuilles de menthe fraîche.",
      "Pour les journées les plus chaudes, notre sélection de thés glacés est déjà pensée pour l'infusion à froid : comptez simplement 4 heures au réfrigérateur pour un résultat tout en fraîcheur, sans aucune amertume.",
    ],
  },
  {
    slug: "voyage-a-uji-matcha-ceremoniel",
    title: "Voyage à Uji, sur les traces du matcha cérémoniel",
    category: "Origines",
    accent: "matcha",
    excerpt: "Direction la région d'Uji, berceau historique du matcha japonais, pour comprendre ce qui distingue un grand cru.",
    date: "2026-06-15",
    readMinutes: 6,
    relatedCollectionHandle: "matcha",
    paragraphs: [
      "À une trentaine de kilomètres de Kyoto, la région d'Uji cultive le thé depuis plus de huit siècles. C'est ici que naît la majorité des matchas de cérémonie les plus recherchés au monde, sur des parcelles ombragées durant les trois semaines précédant la récolte — une technique appelée ombrage qui concentre la chlorophylle et les acides aminés responsables de la douceur umami si particulière du matcha.",
      "Les feuilles récoltées à la main, appelées tencha, sont étuvées, séchées puis débarrassées de leurs nervures avant d'être broyées lentement entre des meules de pierre. Ce processus, qui peut prendre plus d'une heure pour obtenir seulement 40 grammes de poudre, explique en grande partie l'écart de prix entre un matcha cérémoniel et un matcha culinaire.",
      "Notre Matcha Cérémonie Uji est sourcé directement auprès d'un producteur familial de la région, engagé dans une troisième génération de culture traditionnelle. Une référence rare, à réserver à la préparation usucha — fouettée, jamais bouillie.",
    ],
  },
  {
    slug: "rituel-du-soir-rooibos",
    title: "Le rituel du soir : pourquoi le rooibos apaise",
    category: "Rituels",
    accent: "rooibos",
    excerpt: "Sans théine, riche en antioxydants : le rooibos s'impose naturellement comme le compagnon des fins de journée.",
    date: "2026-05-02",
    readMinutes: 5,
    relatedCollectionHandle: "infusions-rooibos",
    paragraphs: [
      "Contrairement au thé, le rooibos ne provient pas du théier mais d'un arbuste originaire de la région du Cederberg, en Afrique du Sud. Naturellement dépourvu de théine, il peut se consommer à toute heure sans perturber le sommeil — un atout de poids pour qui cherche un rituel apaisant en fin de journée.",
      "Sa richesse en antioxydants, notamment l'aspalathine qu'on ne trouve que dans le rooibos, en fait une infusion appréciée pour accompagner la détente. Sa robe rouge cuivrée et ses notes naturellement boisées et légèrement sucrées se prêtent particulièrement bien aux associations gourmandes : vanille, fruits rouges, caramel.",
      "Notre conseil : infusez 5 à 8 minutes dans une eau frémissante — contrairement au thé, le rooibos ne craint pas la surinfusion et ne développe jamais d'amertume, quelle que soit la durée.",
    ],
  },
  {
    slug: "comprendre-le-first-flush-darjeeling",
    title: "Comprendre le first flush : la récolte de printemps",
    category: "Origines",
    accent: "black",
    excerpt: "Chaque printemps, les jardins de Darjeeling produisent une récolte rare et recherchée : le first flush.",
    date: "2026-04-10",
    readMinutes: 5,
    relatedCollectionHandle: "origine-inde",
    paragraphs: [
      "Dans les jardins de Darjeeling, nichés entre 600 et 2 000 mètres d'altitude sur les contreforts himalayens, la première récolte de l'année — le first flush — a lieu entre fin février et avril, dès la repousse des bourgeons après l'hiver.",
      "Cette récolte se distingue par sa liqueur claire, ses notes florales et légèrement astringentes, très éloignées du profil corsé qu'on associe généralement au thé noir. Les puristes la considèrent souvent comme la plus fine de l'année, avant que les récoltes suivantes ne développent des arômes plus ronds et maltés.",
      "Produite en quantités limitées et sujette aux aléas climatiques, elle fait partie de nos sélections Grand Cru — disponible uniquement le temps d'une saison, jusqu'à épuisement du lot.",
    ],
  },
  {
    slug: "5-facons-de-preparer-un-chai-latte",
    title: "5 façons de préparer un chai latté maison",
    category: "Recettes",
    accent: "chai",
    excerpt: "Du plus classique au plus gourmand, cinq variations autour du chai latté à tester chez vous.",
    date: "2026-03-05",
    readMinutes: 4,
    relatedCollectionHandle: "chai-latte",
    paragraphs: [
      "Le chai latté classique s'obtient en infusant un thé noir épicé (cannelle, cardamome, gingembre, clou de girofle) puis en l'allongeant à parts égales avec du lait chaud mousseux. Simple, réconfortant, redoutablement efficace.",
      "Pour une version plus gourmande, ajoutez une cuillère de miel et une pointe de vanille en fin de préparation. Version glacée : infusez plus concentré, laissez refroidir, puis versez sur glaçons avec du lait froid. Version végétale : le lait d'avoine, plus riche, sublime particulièrement les épices du chai.",
      "Dernière variation, la plus proche de l'originale indienne : faites chauffer directement le lait et les épices ensemble à feu doux pendant 10 minutes avant d'ajouter les feuilles de thé hors du feu, pour une infusion plus ronde et moins astringente.",
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
