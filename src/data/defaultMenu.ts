export type MenuCategory =
  | "Tout"
  | "Petit-Déjeuner"
  | "Entrées"
  | "Plats"
  | "Fast Food & Pizzas"
  | "Desserts"
  | "Cocktails"
  | "Vins & Spiritueux"
  | "Boissons";

export const MENU_CATEGORIES: MenuCategory[] = [
  "Tout",
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
