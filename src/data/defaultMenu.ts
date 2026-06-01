export type MenuCategory =
  | "Petit-Dejeuner"
  | "Plats Africains"
  | "Plats Francais"
  | "Plats Americains"
  | "Cocktails & Boissons"
  | "Snacks";

export const MENU_CATEGORIES: MenuCategory[] = [
  "Petit-Dejeuner",
  "Plats Africains",
  "Plats Francais",
  "Plats Americains",
  "Cocktails & Boissons",
  "Snacks",
];

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description?: string;
  soldOut?: boolean;
  image?: string;
};

export const DEFAULT_MENU: MenuItem[] = [
  // Petit-Dejeuner
  { id: "bf-1", name: "Continental", category: "Petit-Dejeuner", price: 2500, description: "Cafe, jus orange, pain grille, beurre, confiture" },
  { id: "bf-2", name: "Americain", category: "Petit-Dejeuner", price: 3500, description: "Oeufs, bacon, toast, jus, cafe" },
  { id: "bf-3", name: "Supplement en chambre", category: "Petit-Dejeuner", price: 500, description: "Service en chambre" },
  // Africains
  { id: "af-1", name: "Riz sauce arachide (poulet)", category: "Plats Africains", price: 3000 },
  { id: "af-2", name: "Fufu soupe de palme", category: "Plats Africains", price: 2500 },
  { id: "af-3", name: "Akpessi poisson grille", category: "Plats Africains", price: 3500 },
  { id: "af-4", name: "Poulet yassa", category: "Plats Africains", price: 3200 },
  { id: "af-5", name: "Brochettes de boeuf", category: "Plats Africains", price: 2800 },
  // Francais
  { id: "fr-1", name: "Omelette fromage-jambon", category: "Plats Francais", price: 2500 },
  { id: "fr-2", name: "Steak frites", category: "Plats Francais", price: 4500 },
  { id: "fr-3", name: "Salade nicoise", category: "Plats Francais", price: 3000 },
  { id: "fr-4", name: "Croque-monsieur", category: "Plats Francais", price: 2000 },
  // Americains
  { id: "us-1", name: "Burger maison", category: "Plats Americains", price: 4000 },
  { id: "us-2", name: "Club sandwich", category: "Plats Americains", price: 3500 },
  { id: "us-3", name: "Chicken wings", category: "Plats Americains", price: 3200 },
  { id: "us-4", name: "Caesar salad", category: "Plats Americains", price: 2800 },
  // Cocktails
  { id: "co-1", name: "Cocktail Togoliving", category: "Cocktails & Boissons", price: 2500, description: "Signature maison" },
  { id: "co-2", name: "Mojito", category: "Cocktails & Boissons", price: 2000 },
  { id: "co-3", name: "Pina Colada", category: "Cocktails & Boissons", price: 2200 },
  { id: "co-4", name: "Gin Tonic", category: "Cocktails & Boissons", price: 2000 },
  { id: "co-5", name: "Biere locale (Castel, Flag)", category: "Cocktails & Boissons", price: 1000 },
  { id: "co-6", name: "Jus naturels (mangue, bissap, gingembre)", category: "Cocktails & Boissons", price: 1200 },
  { id: "co-7", name: "Eau minerale", category: "Cocktails & Boissons", price: 500 },
  { id: "co-8", name: "Cafe express", category: "Cocktails & Boissons", price: 800 },
  // Snacks
  { id: "sn-1", name: "Chips et dips", category: "Snacks", price: 1000 },
  { id: "sn-2", name: "Calamars frits", category: "Snacks", price: 2500 },
  { id: "sn-3", name: "Spring rolls", category: "Snacks", price: 1800 },
];
