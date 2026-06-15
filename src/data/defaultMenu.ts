export type MenuCategory =
  | "Petit-Déjeuner"
  | "Entrées"
  | "Plats"
  | "Fast Food & Pizzas"
  | "Desserts"
  | "Cocktails"
  | "Vins & Spiritueux"
  | "Boissons";

export const MENU_CATEGORIES: MenuCategory[] = [
  "Petit-Déjeuner",
  "Entrées",
  "Plats",
  "Fast Food & Pizzas",
  "Desserts",
  "Cocktails",
  "Vins & Spiritueux",
  "Boissons",
];

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  priceMax?: number;
  description?: string;
  soldOut?: boolean;
  image?: string;
  subcategory?: string;
};

export const DEFAULT_MENU: MenuItem[] = [
  // ───── PETIT-DÉJEUNER ─────
  {
    id: "bf-1",
    name: "Continental",
    category: "Petit-Déjeuner",
    price: 3000,
    description: "Toast, Confiture, Beurre, Jus d'Orange, Œuf, Café",
  },
  {
    id: "bf-2",
    name: "Parisien",
    category: "Petit-Déjeuner",
    price: 3500,
    description: "Croissant, Confiture, Beurre, Jus d'Orange, Café",
  },
  {
    id: "bf-3",
    name: "Américain",
    category: "Petit-Déjeuner",
    price: 3500,
    description: "Toast, Saucisse, Haricot, Sauce Tomate, Œuf, Pancake, Café",
  },
  {
    id: "bf-4",
    name: "Togoliving",
    category: "Petit-Déjeuner",
    price: 3500,
    description: "Baguette, Omelettes, Beurre, Jus d'Orange, Café",
  },

  // ───── ENTRÉES ─────
  {
    id: "en-1",
    name: "Salade Verte",
    category: "Entrées",
    price: 2000,
    description: "Concombre, Tomate, Œuf, Vinaigrette",
  },
  {
    id: "en-2",
    name: "Salade Composée",
    category: "Entrées",
    price: 4000,
    description: "Concombre, Tomate, Œuf, Pâtes, Betteraves, Poulet",
  },
  {
    id: "en-3",
    name: "Soupe de Tomates",
    category: "Entrées",
    price: 2500,
    description: "À la Basile, Croûtons",
  },
  {
    id: "en-4",
    name: "Avocado",
    category: "Entrées",
    price: 2500,
    description: "Baguette, Tomate, Oignons, Avocat",
  },

  // ───── PLATS ─────
  {
    id: "pl-1",
    name: "Poisson Braisé",
    category: "Plats",
    price: 6000,
    priceMax: 7000,
    description: "Jus de Tomate au Poivron, Akpan",
  },
  {
    id: "pl-2",
    name: "Sifio",
    category: "Plats",
    price: 6000,
    priceMax: 7000,
    description: "Bien pimenté avec jus et Pinon",
  },
  {
    id: "pl-3",
    name: "Fruit de Mer Tropical",
    category: "Plats",
    price: 7500,
    description: "Sauté à la Sauce Provençale, Riz Blanc",
  },
  {
    id: "pl-4",
    name: "FouFou",
    category: "Plats",
    price: 6000,
    description: "Avec sauce de Bœuf ou de Poisson",
  },
  {
    id: "pl-5",
    name: "Cuisse de Poulet",
    category: "Plats",
    price: 5500,
    description: "Pommes Frites et Cole Slaw",
  },
  {
    id: "pl-6",
    name: "½ Poulet Braisé",
    category: "Plats",
    price: 7500,
    description: "Salade garnie, Oignons, Atseke",
  },
  {
    id: "pl-7",
    name: "Ragoût de Bœuf",
    category: "Plats",
    price: 7500,
    description: "Sauce Champignon crémée, Riz parfumé",
  },
  {
    id: "pl-8",
    name: "Côtelettes d'Agneau",
    category: "Plats",
    price: 8000,
    description: "Légumes et Pommes Frites",
  },
  {
    id: "pl-9",
    name: "Plateau de Grill Togoliving",
    category: "Plats",
    price: 12000,
    description:
      "Brochettes de Bœuf, Brochettes de Poulet, Brochettes de Poissons, Pommes Frites, Aloko, Salade garnie, Riz Curry, Sauce séparée",
  },
  {
    id: "pl-10",
    name: "Spaghetti Rouge / Blanc",
    category: "Plats",
    price: 2500,
    description: "Viande de Bœuf, Saucisse, Légumes, Omelette",
  },
  {
    id: "pl-11",
    name: "Spaghetti Bolognaise",
    category: "Plats",
    price: 3500,
    description: "Viande hachée de Bœuf, sauce Tomate, Fromage, Persil",
  },
  {
    id: "pl-12",
    name: "Tagliatelle Fruiti di Mare",
    category: "Plats",
    price: 5500,
    description: "Fruit de mer, Olive, sauce Tomate",
  },
  {
    id: "pl-13",
    name: "Taglioni Fungi",
    category: "Plats",
    price: 4000,
    description: "Champignons, Sauce crémée, Persil",
  },
  {
    id: "pl-14",
    name: "Accompagnements",
    category: "Plats",
    price: 1500,
    description:
      "Riz Blanc, Curry, Cantonne, Pommes Frites, Koliko, Aloko, Akpan, Atseke, Couscous",
  },

  // ───── FAST FOOD & PIZZAS ─────
  {
    id: "ff-1",
    name: "Cheese Burger",
    category: "Fast Food & Pizzas",
    price: 4500,
    description: "Pommes Frites, Cole Slaw",
  },
  {
    id: "ff-2",
    name: "Shawarma Poulet",
    category: "Fast Food & Pizzas",
    price: 4500,
    description: "Viande Hachée, Pommes Frites",
  },
  {
    id: "ff-3",
    name: "Pizza Margherita",
    category: "Fast Food & Pizzas",
    price: 4000,
    description: "Sauce Tomate, Tomate, Fromage",
  },
  {
    id: "ff-4",
    name: "Pizza Bolognaise",
    category: "Fast Food & Pizzas",
    price: 4500,
    description: "Sauce Tomate, Fromage, Bolognaise",
  },
  {
    id: "ff-5",
    name: "Pizza Chicken",
    category: "Fast Food & Pizzas",
    price: 4500,
    description: "Sauce Tomate, Fromage, Poulet, Poivron",
  },
  {
    id: "ff-6",
    name: "Pizza Reine",
    category: "Fast Food & Pizzas",
    price: 5000,
    description: "Sauce Tomate, Fromage, Champignons, Jambon",
  },
  {
    id: "ff-7",
    name: "Pizza Living",
    category: "Fast Food & Pizzas",
    price: 5500,
    description:
      "Sauce Tomate, Fromage, Poulet, Légumes, Viande Hachée",
  },

  // ───── DESSERTS ─────
  {
    id: "ds-1",
    name: "Pancake",
    category: "Desserts",
    price: 1500,
  },
  {
    id: "ds-2",
    name: "Gaufre de Bruxelles",
    category: "Desserts",
    price: 2000,
  },
  {
    id: "ds-3",
    name: "Muffin aux Chocolat",
    category: "Desserts",
    price: 1500,
  },
  {
    id: "ds-4",
    name: "Cup de Glaces 3",
    category: "Desserts",
    price: 1500,
  },
  {
    id: "ds-5",
    name: "Banana Boat",
    category: "Desserts",
    price: 2000,
    description: "3 Cup de Glaces Banane, Chocolat râpé",
  },
  {
    id: "ds-6",
    name: "Ananas Split",
    category: "Desserts",
    price: 2500,
    description: "3 Cup de Glaces Ananas, Chocolat râpé",
  },
  {
    id: "ds-7",
    name: "Extra : 1 Glace",
    category: "Desserts",
    price: 500,
  },
  {
    id: "ds-8",
    name: "Sauce Chocolat",
    category: "Desserts",
    price: 500,
  },

  // ───── COCKTAILS ─────
  // Avec alcool
  {
    id: "ck-1",
    name: "Vodka Orange / Maracuja / Ananas",
    category: "Cocktails",
    price: 3000,
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-2",
    name: "Gin Tonic / Gin Orange / Gin Maracuja",
    category: "Cocktails",
    price: 3000,
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-3",
    name: "Whisky Cola / Whisky Orange / Whisky Ananas",
    category: "Cocktails",
    price: 3000,
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-4",
    name: "Campari Orange / Ananas / Tonic",
    category: "Cocktails",
    price: 3000,
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-5",
    name: "Mojito",
    category: "Cocktails",
    price: 3500,
    description: "Rhum blanc, Citron, Canne à sucre, Eau gazeuse",
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-6",
    name: "Blue Lagoon",
    category: "Cocktails",
    price: 4000,
    description: "Vodka, Blue de Curaçao, Jus de Citron, Sprite",
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-7",
    name: "Tequila Sunrise",
    category: "Cocktails",
    price: 4000,
    description: "Tequila, Jus de Orange, Grenadine",
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-8",
    name: "Daïquiri Citron",
    category: "Cocktails",
    price: 3500,
    description: "Rhum blanc, Citron, Canne à Sucre",
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-9",
    name: "Mai Tai",
    category: "Cocktails",
    price: 4000,
    description: "Rhum blanc, Jus de Orange, Grenadine",
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-10",
    name: "Pina Colada",
    category: "Cocktails",
    price: 4000,
    description: "Rhum blanc, Jus de Ananas, Lait de Coco",
    subcategory: "Avec Alcool",
  },
  {
    id: "ck-11",
    name: "Togoliving Sunset",
    category: "Cocktails",
    price: 4500,
    description: "Rhum blanc, Jus de Ananas/Orange, Grenadine, Citron",
    subcategory: "Avec Alcool",
  },
  // Sans alcool
  {
    id: "ck-12",
    name: "Virgin Mojito",
    category: "Cocktails",
    price: 2500,
    description: "Citron, Eau gazeuse, Canne à Sucre, Menthe",
    subcategory: "Sans Alcool",
  },
  {
    id: "ck-13",
    name: "Tropical Sunrise",
    category: "Cocktails",
    price: 2500,
    description: "Jus de Orange/Ananas, Grenadine",
    subcategory: "Sans Alcool",
  },
  {
    id: "ck-14",
    name: "Ginger Togoliving",
    category: "Cocktails",
    price: 3000,
    description: "Jus d'Orange/Gingembre, Canne à Sucre, Grenadine",
    subcategory: "Sans Alcool",
  },
  {
    id: "ck-15",
    name: "Pool Coco Fresh",
    category: "Cocktails",
    price: 3000,
    description: "Jus d'Ananas/Pomme/Maracuja, Lait de Coco",
    subcategory: "Sans Alcool",
  },
  {
    id: "ck-16",
    name: "Maracuja Garden",
    category: "Cocktails",
    price: 3000,
    description: "Jus d'Orange/Maracuja/Pomme, Grenadine",
    subcategory: "Sans Alcool",
  },
  {
    id: "ck-17",
    name: "Tropical Appel",
    category: "Cocktails",
    price: 2500,
    description: "Jus de Maracuja/Pomme/Ananas",
    subcategory: "Sans Alcool",
  },

  // ───── VINS & SPIRITUEUX ─────
  // Vin Rouge (bouteille)
  {
    id: "vs-1",
    name: "Bordeaux",
    category: "Vins & Spiritueux",
    price: 10000,
    subcategory: "Vin Rouge",
  },
  {
    id: "vs-2",
    name: "Merlot",
    category: "Vins & Spiritueux",
    price: 10000,
    subcategory: "Vin Rouge",
  },
  {
    id: "vs-3",
    name: "Cabernet",
    category: "Vins & Spiritueux",
    price: 10000,
    subcategory: "Vin Rouge",
  },
  {
    id: "vs-4",
    name: "Syrah",
    category: "Vins & Spiritueux",
    price: 10000,
    subcategory: "Vin Rouge",
  },
  {
    id: "vs-5",
    name: "Chianti",
    category: "Vins & Spiritueux",
    price: 12000,
    subcategory: "Vin Rouge",
  },
  {
    id: "vs-6",
    name: "Gran Réserva",
    category: "Vins & Spiritueux",
    price: 8000,
    subcategory: "Vin Rouge",
  },
  // Vin Blanc / Mousseux
  {
    id: "vs-7",
    name: "Chardonnay",
    category: "Vins & Spiritueux",
    price: 10000,
    subcategory: "Vin Blanc / Mousseux",
  },
  {
    id: "vs-8",
    name: "Sauvignon",
    category: "Vins & Spiritueux",
    price: 10000,
    subcategory: "Vin Blanc / Mousseux",
  },
  {
    id: "vs-9",
    name: "Duc de Paris",
    category: "Vins & Spiritueux",
    price: 9500,
    subcategory: "Vin Blanc / Mousseux",
  },
  {
    id: "vs-10",
    name: "Muscados",
    category: "Vins & Spiritueux",
    price: 10000,
    subcategory: "Vin Blanc / Mousseux",
  },
  {
    id: "vs-11",
    name: "J. Kiefer",
    category: "Vins & Spiritueux",
    price: 12000,
    subcategory: "Vin Blanc / Mousseux",
  },
  // Whisky (bouteille)
  {
    id: "vs-12",
    name: "Balantines",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Whisky",
  },
  {
    id: "vs-13",
    name: "Grants",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Whisky",
  },
  {
    id: "vs-14",
    name: "JW Red Label",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Whisky",
  },
  {
    id: "vs-15",
    name: "Jack Daniels",
    category: "Vins & Spiritueux",
    price: 40000,
    subcategory: "Whisky",
  },
  // Liqueur (bouteille)
  {
    id: "vs-16",
    name: "Jägermeister",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Liqueur",
  },
  {
    id: "vs-17",
    name: "Martini",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Liqueur",
  },
  {
    id: "vs-18",
    name: "Campari",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Liqueur",
  },
  {
    id: "vs-19",
    name: "Baileys",
    category: "Vins & Spiritueux",
    price: 30000,
    subcategory: "Liqueur",
  },
  // Spiritueux — bouteille
  {
    id: "vs-20",
    name: "Rum — Bacardi",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Spiritueux",
  },
  {
    id: "vs-21",
    name: "Gin — Gordon's",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Spiritueux",
  },
  {
    id: "vs-22",
    name: "Tequila — Jose Cuervo",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Spiritueux",
  },
  {
    id: "vs-23",
    name: "Vodka — Smirnoff",
    category: "Vins & Spiritueux",
    price: 20000,
    subcategory: "Spiritueux",
  },
  // Un Petit Verre 4cl
  {
    id: "vs-24",
    name: "Vodka Smirnoff — Verre 4cl",
    category: "Vins & Spiritueux",
    price: 2000,
    subcategory: "Un Petit Verre 4cl",
  },
  {
    id: "vs-25",
    name: "Rum Bacardi — Verre 4cl",
    category: "Vins & Spiritueux",
    price: 2000,
    subcategory: "Un Petit Verre 4cl",
  },
  {
    id: "vs-26",
    name: "Sodabi (Local) — Verre 4cl",
    category: "Vins & Spiritueux",
    price: 1000,
    subcategory: "Un Petit Verre 4cl",
  },
  {
    id: "vs-27",
    name: "Jägermeister / Campari / Martini — Verre 4cl",
    category: "Vins & Spiritueux",
    price: 2000,
    subcategory: "Un Petit Verre 4cl",
  },
  {
    id: "vs-28",
    name: "Whisky Label 5 — Verre 4cl",
    category: "Vins & Spiritueux",
    price: 2000,
    subcategory: "Un Petit Verre 4cl",
  },
  {
    id: "vs-29",
    name: "Gin Gordon's — Verre 4cl",
    category: "Vins & Spiritueux",
    price: 2000,
    subcategory: "Un Petit Verre 4cl",
  },
  {
    id: "vs-30",
    name: "Tequila Jose Cuervo — Verre 4cl",
    category: "Vins & Spiritueux",
    price: 2000,
    subcategory: "Un Petit Verre 4cl",
  },

  // ───── BOISSONS ─────
  // Eaux
  {
    id: "bo-1",
    name: "Voltic 1,5 l",
    category: "Boissons",
    price: 1500,
    subcategory: "Eaux",
  },
  {
    id: "bo-2",
    name: "Eau Gazeuse 0,7 l",
    category: "Boissons",
    price: 2000,
    subcategory: "Eaux",
  },
  // Boissons Gazeuses
  {
    id: "bo-3",
    name: "Cocktail / Pompom / Chap",
    category: "Boissons",
    price: 1500,
    subcategory: "Boissons Gazeuses",
  },
  {
    id: "bo-4",
    name: "Coca / Youzou / Tonic / Cocktail PM",
    category: "Boissons",
    price: 1000,
    subcategory: "Boissons Gazeuses",
  },
  {
    id: "bo-5",
    name: "World Cola / Youzou / Agrumes",
    category: "Boissons",
    price: 1500,
    subcategory: "Boissons Gazeuses",
  },
  {
    id: "bo-6",
    name: "Malta / Sport Active / XXL PM",
    category: "Boissons",
    price: 1500,
    subcategory: "Boissons Gazeuses",
  },
  // Jus Nature
  {
    id: "bo-7",
    name: "Jus Nature — Orange / Ananas / Bissap / Mangue",
    category: "Boissons",
    price: 1500,
    subcategory: "Jus Nature",
  },
  // Bière
  {
    id: "bo-8",
    name: "Lager / Pils / Beaufort",
    category: "Boissons",
    price: 1500,
    subcategory: "Bière",
  },
  {
    id: "bo-9",
    name: "Dj Lager / Dj Pils / Doppel / Chill / Racine",
    category: "Boissons",
    price: 1500,
    subcategory: "Bière",
  },
  {
    id: "bo-10",
    name: "Heineken / Desperados / Awooyo",
    category: "Boissons",
    price: 2000,
    subcategory: "Bière",
  },
  {
    id: "bo-11",
    name: "Guinness PM",
    category: "Boissons",
    price: 1500,
    subcategory: "Bière",
  },
  // Boissons Chaudes
  {
    id: "bo-12",
    name: "Thé",
    category: "Boissons",
    price: 1000,
    subcategory: "Boissons Chaudes",
  },
  {
    id: "bo-13",
    name: "Café au Lait",
    category: "Boissons",
    price: 2000,
    subcategory: "Boissons Chaudes",
  },
  {
    id: "bo-14",
    name: "Capuccino",
    category: "Boissons",
    price: 2000,
    subcategory: "Boissons Chaudes",
  },
  {
    id: "bo-15",
    name: "Latte Macchiato",
    category: "Boissons",
    price: 2500,
    subcategory: "Boissons Chaudes",
  },
  {
    id: "bo-16",
    name: "Café",
    category: "Boissons",
    price: 1500,
    subcategory: "Boissons Chaudes",
  },
  {
    id: "bo-17",
    name: "Chocolat Chaud",
    category: "Boissons",
    price: 2000,
    subcategory: "Boissons Chaudes",
  },
  {
    id: "bo-18",
    name: "Expresso",
    category: "Boissons",
    price: 1500,
    subcategory: "Boissons Chaudes",
  },
  // Energy
  {
    id: "bo-19",
    name: "Red Bull / Vody",
    category: "Boissons",
    price: 2000,
    subcategory: "Energy",
  },
];
