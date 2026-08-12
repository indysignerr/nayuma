// Raw product specs — plain JS so both the TS data layer and the
// placeholder-image generation script can share a single source of truth.
export const productSpecs = [
  // --- THÉS VERTS ---
  { handle: "sencha-du-japon", title: "Sencha du Japon", universe: "thes", type: "vert", origin: "japon", notes: ["floral"], need: [], selections: ["best-sellers", "bio"], fineTea: false, accent: "green", basePrice100: 7.5 },
  { handle: "gyokuro-imperial", title: "Gyokuro Impérial", universe: "thes", type: "vert", origin: "japon", notes: ["gourmand"], need: [], selections: ["grand-cru"], fineTea: true, accent: "green", basePrice100: 18 },
  { handle: "longjing-dragon-puits", title: "Longjing Dragon Puits", universe: "thes", type: "vert", origin: "chine", notes: ["floral"], need: [], selections: ["grand-cru"], fineTea: false, accent: "green", basePrice100: 13 },
  { handle: "the-vert-menthe", title: "Thé Vert à la Menthe", universe: "thes", type: "vert", origin: "chine", notes: ["mentholé"], need: [], selections: ["best-sellers"], fineTea: false, accent: "green", basePrice100: 8 },
  { handle: "gunpowder-de-chine", title: "Gunpowder de Chine", universe: "thes", type: "vert", origin: "chine", notes: ["epice"], need: [], selections: [], fineTea: false, accent: "green", basePrice100: 7 },
  { handle: "the-vert-du-vietnam-fume", title: "Thé Vert du Vietnam Fumé", universe: "thes", type: "vert", origin: "vietnam", notes: ["epice"], need: [], selections: [], fineTea: false, accent: "green", basePrice100: 9 },
  { handle: "the-vert-de-coree-ujeon", title: "Thé Vert de Corée Ujeon", universe: "thes", type: "vert", origin: "coree", notes: ["floral"], need: [], selections: ["grand-cru"], fineTea: true, accent: "green", basePrice100: 16 },
  { handle: "sencha-bio-du-japon", title: "Sencha Bio du Japon", universe: "thes", type: "vert", origin: "japon", notes: ["floral"], need: [], selections: ["bio"], fineTea: false, accent: "green", basePrice100: 8.5 },

  // --- THÉS BLANCS ---
  { handle: "bai-mu-dan", title: "Bai Mu Dan", universe: "thes", type: "blanc", origin: "chine", notes: ["floral"], need: [], selections: [], fineTea: false, accent: "white", basePrice100: 9.5 },
  { handle: "yin-zhen-aiguilles-argent", title: "Yin Zhen — Aiguilles d'Argent", universe: "thes", type: "blanc", origin: "chine", notes: ["floral"], need: [], selections: ["grand-cru"], fineTea: true, accent: "white", basePrice100: 22 },
  { handle: "the-blanc-peche-abricot", title: "Thé Blanc Pêche Abricot", universe: "thes", type: "blanc", origin: "chine", notes: ["fruite", "gourmand"], need: [], selections: ["best-sellers"], fineTea: false, accent: "white", basePrice100: 8.5 },

  // --- THÉS NOIRS ---
  { handle: "darjeeling-premier-flush", title: "Darjeeling Premier Flush", universe: "thes", type: "noir", origin: "inde", notes: ["floral"], need: [], selections: ["grand-cru"], fineTea: true, accent: "black", basePrice100: 15 },
  { handle: "assam-malty", title: "Assam Malty", universe: "thes", type: "noir", origin: "inde", notes: ["gourmand"], need: [], selections: ["best-sellers"], fineTea: false, accent: "black", basePrice100: 7 },
  { handle: "earl-grey-bergamote", title: "Earl Grey Bergamote", universe: "thes", type: "noir", origin: "sri-lanka", notes: ["bergamote"], need: [], selections: ["best-sellers", "bio"], fineTea: false, accent: "black", basePrice100: 7.5 },
  { handle: "ceylan-orange-pekoe", title: "Ceylan Orange Pekoe", universe: "thes", type: "noir", origin: "sri-lanka", notes: ["fruite"], need: [], selections: [], fineTea: false, accent: "black", basePrice100: 6.5 },
  { handle: "the-noir-du-nepal-ilam", title: "Thé Noir du Népal Ilam", universe: "thes", type: "noir", origin: "nepal", notes: ["floral"], need: [], selections: [], fineTea: false, accent: "black", basePrice100: 9 },
  { handle: "keemun-de-chine", title: "Keemun de Chine", universe: "thes", type: "noir", origin: "chine", notes: ["epice"], need: [], selections: [], fineTea: false, accent: "black", basePrice100: 8 },
  { handle: "the-noir-caramel-beurre-sale", title: "Thé Noir Caramel Beurre Salé", universe: "thes", type: "noir", origin: "sri-lanka", notes: ["gourmand"], need: [], selections: ["best-sellers"], fineTea: false, accent: "black", basePrice100: 7.5 },
  { handle: "the-noir-vanille-bourbon", title: "Thé Noir Vanille Bourbon", universe: "thes", type: "noir", origin: "inde", notes: ["gourmand"], need: [], selections: [], fineTea: false, accent: "black", basePrice100: 8 },

  // --- MATCHA ---
  { handle: "matcha-ceremonie-uji", title: "Matcha Cérémonie Uji", universe: "thes", type: "matcha", origin: "japon", notes: ["gourmand"], need: [], selections: ["grand-cru"], fineTea: true, accent: "matcha", basePrice100: 24 },
  { handle: "matcha-culinaire-bio", title: "Matcha Culinaire Bio", universe: "thes", type: "matcha", origin: "japon", notes: [], need: [], selections: ["bio"], fineTea: false, accent: "matcha", basePrice100: 14 },
  { handle: "matcha-latte-vanille", title: "Matcha Latte Vanille", universe: "thes", type: "matcha", origin: "japon", notes: ["gourmand"], need: [], selections: ["best-sellers"], fineTea: false, accent: "matcha", basePrice100: 12 },

  // --- INFUSIONS & ROOIBOS ---
  { handle: "rooibos-vanille", title: "Rooibos Vanille", universe: "infusions-rooibos", notes: ["gourmand"], need: ["relaxation"], selections: ["best-sellers"], fineTea: false, accent: "rooibos", basePrice100: 6.5 },
  { handle: "rooibos-orange-cannelle", title: "Rooibos Orange Cannelle", universe: "infusions-rooibos", notes: ["epice", "fruite"], need: ["energie"], selections: [], fineTea: false, accent: "rooibos", basePrice100: 6.5 },
  { handle: "tisane-verveine-menthe", title: "Tisane Verveine Menthe", universe: "infusions-rooibos", notes: ["mentholé"], need: ["digestion"], selections: [], fineTea: false, accent: "rooibos", basePrice100: 6 },
  { handle: "tisane-camomille-tilleul", title: "Tisane Camomille Tilleul", universe: "infusions-rooibos", notes: ["floral"], need: ["sommeil"], selections: [], fineTea: false, accent: "rooibos", basePrice100: 6 },
  { handle: "infusion-detox-gingembre-citron", title: "Infusion Détox Gingembre Citron", universe: "infusions-rooibos", notes: ["epice", "fruite"], need: ["detox", "energie"], selections: [], fineTea: false, accent: "rooibos", basePrice100: 6.5 },
  { handle: "rooibos-fruits-des-bois", title: "Rooibos Rouge Fruits des Bois", universe: "infusions-rooibos", notes: ["fruite"], need: ["relaxation"], selections: ["best-sellers"], fineTea: false, accent: "rooibos", basePrice100: 6.5 },
  { handle: "tisane-fenouil-anis", title: "Tisane Fenouil Anis", universe: "infusions-rooibos", notes: ["epice"], need: ["digestion"], selections: [], fineTea: false, accent: "rooibos", basePrice100: 6 },
  { handle: "infusion-immunite-echinacee-miel", title: "Infusion Immunité Échinacée Miel", universe: "infusions-rooibos", notes: ["gourmand"], need: ["immunite"], selections: [], fineTea: false, accent: "rooibos", basePrice100: 7 },

  // --- CHAI LATTÉ ---
  { handle: "chai-latte-classique", title: "Chai Latté Classique", universe: "chai-latte", notes: ["epice"], need: [], selections: ["best-sellers"], fineTea: false, accent: "chai", basePrice100: 8 },
  { handle: "chai-latte-vanille", title: "Chai Latté Vanille", universe: "chai-latte", notes: ["epice", "gourmand"], need: [], selections: [], fineTea: false, accent: "chai", basePrice100: 8.5 },
  { handle: "chai-latte-sans-theine", title: "Chai Latté Sans Théine", universe: "chai-latte", notes: ["epice"], need: [], selections: [], fineTea: false, accent: "chai", basePrice100: 8 },

  // --- THÉS GLACÉS ---
  { handle: "the-glace-peche-blanche", title: "Thé Glacé Pêche Blanche", universe: "thes-glaces", notes: ["fruite"], need: [], selections: ["best-sellers"], fineTea: false, accent: "green", basePrice100: 8 },
  { handle: "the-glace-citron-menthe", title: "Thé Glacé Citron Menthe", universe: "thes-glaces", notes: ["mentholé", "fruite"], need: [], selections: [], fineTea: false, accent: "green", basePrice100: 7.5 },
  { handle: "the-glace-hibiscus-fruits-rouges", title: "Thé Glacé Hibiscus Fruits Rouges", universe: "thes-glaces", notes: ["fruite"], need: [], selections: [], fineTea: false, accent: "rooibos", basePrice100: 7.5 },
  { handle: "the-glace-vert-litchi", title: "Thé Glacé Vert Litchi", universe: "thes-glaces", notes: ["fruite", "floral"], need: [], selections: [], fineTea: false, accent: "green", basePrice100: 8 },

  // --- BIEN-ÊTRE & DETOX ---
  { handle: "tisane-sommeil-profond", title: "Tisane Sommeil Profond", universe: "bien-etre-detox", notes: ["floral"], need: ["sommeil"], selections: [], fineTea: false, accent: "wellness", basePrice100: 7.5 },
  { handle: "infusion-digestion-facile", title: "Infusion Digestion Facile", universe: "bien-etre-detox", notes: ["epice"], need: ["digestion"], selections: [], fineTea: false, accent: "wellness", basePrice100: 7 },
  { handle: "melange-energie-ginseng", title: "Mélange Énergie Ginseng", universe: "bien-etre-detox", notes: ["epice"], need: ["energie"], selections: [], fineTea: false, accent: "wellness", basePrice100: 8.5 },
  { handle: "cure-detox-21-jours", title: "Cure Detox 21 Jours", universe: "bien-etre-detox", notes: ["fruite"], need: ["detox"], selections: ["best-sellers"], fineTea: false, accent: "wellness", basePrice100: 9 },
  { handle: "immunite-hiver", title: "Immunité Hiver", universe: "bien-etre-detox", notes: ["epice", "fruite"], need: ["immunite"], selections: [], fineTea: false, accent: "wellness", basePrice100: 8 },
  { handle: "relaxation-lavande-camomille", title: "Relaxation Lavande Camomille", universe: "bien-etre-detox", notes: ["floral"], need: ["relaxation"], selections: [], fineTea: false, accent: "wellness", basePrice100: 7.5 },

  // --- COFFRETS & ACCESSOIRES (single "Unique" variant, price = basePrice100 as flat price) ---
  { handle: "carte-cadeau-25", title: "Carte Cadeau NAYUMA — 25€", universe: "coffrets-accessoires", notes: [], need: [], selections: [], accessoryType: "carte-cadeau", fineTea: false, accent: "gold", basePrice100: 25, flatPrice: true },
  { handle: "carte-cadeau-50", title: "Carte Cadeau NAYUMA — 50€", universe: "coffrets-accessoires", notes: [], need: [], selections: [], accessoryType: "carte-cadeau", fineTea: false, accent: "gold", basePrice100: 50, flatPrice: true },
  { handle: "infuseur-boule-inox", title: "Infuseur Boule Inox", universe: "coffrets-accessoires", notes: [], need: [], selections: [], accessoryType: "infuseur", fineTea: false, accent: "gold", basePrice100: 9.9, flatPrice: true },
  { handle: "infuseur-piston-verre", title: "Infuseur à Piston en Verre", universe: "coffrets-accessoires", notes: [], need: [], selections: [], accessoryType: "infuseur", fineTea: false, accent: "gold", basePrice100: 24, flatPrice: true },
  { handle: "tasse-gres-emaille", title: "Tasse en Grès Émaillé", universe: "coffrets-accessoires", notes: [], need: [], selections: [], accessoryType: "tasse", fineTea: false, accent: "gold", basePrice100: 18, flatPrice: true },
  { handle: "boite-a-the-laquee", title: "Boîte à Thé Laquée", universe: "coffrets-accessoires", notes: [], need: [], selections: [], accessoryType: "boite", fineTea: false, accent: "gold", basePrice100: 22, flatPrice: true },
  { handle: "coffret-decouverte-6-thes", title: "Coffret Découverte 6 Thés", universe: "coffrets-accessoires", notes: [], need: [], selections: ["best-sellers"], accessoryType: "coffret", fineTea: false, accent: "gold", basePrice100: 29, flatPrice: true },
  { handle: "coffret-fine-tea-prestige", title: "Coffret FINE TEA Prestige", universe: "coffrets-accessoires", notes: [], need: [], selections: ["grand-cru"], accessoryType: "coffret", fineTea: true, accent: "gold", basePrice100: 59, flatPrice: true },
];
