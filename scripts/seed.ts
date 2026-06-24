/**
 * Seed script for TOGOLIVING Supabase migration.
 * 
 * PREREQUISITES:
 * 1. Run supabase_setup.sql in your Supabase SQL editor first.
 * 2. Create a public "media" storage bucket in Supabase dashboard.
 * 
 * Run with: npx tsx scripts/seed.ts
 */
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── MENU ITEMS ────────────────────────────────────────────────
const MENU_ITEMS = [
  // PETIT-DÉJEUNER
  { name: "Continental", category: "Petit-Déjeuner", price: 3000, description: "Toast, Confiture, Beurre, Jus d'Orange, Œuf, Café" },
  { name: "Parisien", category: "Petit-Déjeuner", price: 3500, description: "Croissant, Confiture, Beurre, Jus d'Orange, Café" },
  { name: "Américain", category: "Petit-Déjeuner", price: 3500, description: "Toast, Saucisse, Haricot, Sauce Tomate, Œuf, Pancake, Café" },
  { name: "Togoliving", category: "Petit-Déjeuner", price: 3500, description: "Baguette, Omelettes, Beurre, Jus d'Orange, Café" },
  // ENTRÉES
  { name: "Salade Verte", category: "Entrées", price: 2000, description: "Concombre, Tomate, Œuf, Vinaigrette" },
  { name: "Salade Composée", category: "Entrées", price: 4000, description: "Concombre, Tomate, Œuf, Pâtes, Betteraves, Poulet" },
  { name: "Soupe de Tomates", category: "Entrées", price: 2500, description: "À la Basile, Croûtons" },
  { name: "Avocado", category: "Entrées", price: 2500, description: "Baguette, Tomate, Oignons, Avocat" },
  // PLATS
  { name: "Poisson Braisé", category: "Plats", price: 6000, description: "Jus de Tomate au Poivron, Akpan" },
  { name: "Sifio", category: "Plats", price: 6000, description: "Bien pimenté avec jus et Pinon" },
  { name: "Fruit de Mer Tropical", category: "Plats", price: 7500, description: "Sauté à la Sauce Provençale, Riz Blanc" },
  { name: "FouFou", category: "Plats", price: 6000, description: "Avec sauce de Bœuf ou de Poisson" },
  { name: "Cuisse de Poulet", category: "Plats", price: 5500, description: "Pommes Frites et Cole Slaw" },
  { name: "½ Poulet Braisé", category: "Plats", price: 7500, description: "Salade garnie, Oignons, Atseke" },
  { name: "Ragoût de Bœuf", category: "Plats", price: 7500, description: "Sauce Champignon crémée, Riz parfumé" },
  { name: "Côtelettes d'Agneau", category: "Plats", price: 8000, description: "Légumes et Pommes Frites" },
  { name: "Plateau de Grill Togoliving", category: "Plats", price: 12000, description: "Brochettes de Bœuf, Brochettes de Poulet, Brochettes de Poissons, Pommes Frites, Aloko, Salade garnie, Riz Curry, Sauce séparée" },
  { name: "Spaghetti Rouge / Blanc", category: "Plats", price: 2500, description: "Viande de Bœuf, Saucisse, Légumes, Omelette" },
  { name: "Spaghetti Bolognaise", category: "Plats", price: 3500, description: "Viande hachée de Bœuf, sauce Tomate, Fromage, Persil" },
  { name: "Tagliatelle Fruiti di Mare", category: "Plats", price: 5500, description: "Fruit de mer, Olive, sauce Tomate" },
  { name: "Taglioni Fungi", category: "Plats", price: 4000, description: "Champignons, Sauce crémée, Persil" },
  { name: "Accompagnements", category: "Plats", price: 1500, description: "Riz Blanc, Curry, Cantonne, Pommes Frites, Koliko, Aloko, Akpan, Atseke, Couscous" },
  // FAST FOOD & PIZZAS
  { name: "Cheese Burger", category: "Fast Food & Pizzas", price: 4500, description: "Pommes Frites, Cole Slaw" },
  { name: "Shawarma Poulet", category: "Fast Food & Pizzas", price: 4500, description: "Viande Hachée, Pommes Frites" },
  { name: "Pizza Margherita", category: "Fast Food & Pizzas", price: 4000, description: "Sauce Tomate, Tomate, Fromage" },
  { name: "Pizza Bolognaise", category: "Fast Food & Pizzas", price: 4500, description: "Sauce Tomate, Fromage, Bolognaise" },
  { name: "Pizza Chicken", category: "Fast Food & Pizzas", price: 4500, description: "Sauce Tomate, Fromage, Poulet, Poivron" },
  { name: "Pizza Reine", category: "Fast Food & Pizzas", price: 5000, description: "Sauce Tomate, Fromage, Champignons, Jambon" },
  { name: "Pizza Living", category: "Fast Food & Pizzas", price: 5500, description: "Sauce Tomate, Fromage, Poulet, Légumes, Viande Hachée" },
  // DESSERTS
  { name: "Pancake", category: "Desserts", price: 1500 },
  { name: "Gaufre de Bruxelles", category: "Desserts", price: 2000 },
  { name: "Muffin aux Chocolat", category: "Desserts", price: 1500 },
  { name: "Cup de Glaces 3", category: "Desserts", price: 1500 },
  { name: "Banana Boat", category: "Desserts", price: 2000, description: "3 Cup de Glaces Banane, Chocolat râpé" },
  { name: "Ananas Split", category: "Desserts", price: 2500, description: "3 Cup de Glaces Ananas, Chocolat râpé" },
  { name: "Extra : 1 Glace", category: "Desserts", price: 500 },
  { name: "Sauce Chocolat", category: "Desserts", price: 500 },
  // COCKTAILS — Avec Alcool
  { name: "Vodka Orange / Maracuja / Ananas", category: "Cocktails", price: 3000, description: "Avec Alcool" },
  { name: "Gin Tonic / Gin Orange / Gin Maracuja", category: "Cocktails", price: 3000, description: "Avec Alcool" },
  { name: "Whisky Cola / Whisky Orange / Whisky Ananas", category: "Cocktails", price: 3000, description: "Avec Alcool" },
  { name: "Campari Orange / Ananas / Tonic", category: "Cocktails", price: 3000, description: "Avec Alcool" },
  { name: "Mojito", category: "Cocktails", price: 3500, description: "Rhum blanc, Citron, Canne à sucre, Eau gazeuse" },
  { name: "Blue Lagoon", category: "Cocktails", price: 4000, description: "Vodka, Blue de Curaçao, Jus de Citron, Sprite" },
  { name: "Tequila Sunrise", category: "Cocktails", price: 4000, description: "Tequila, Jus de Orange, Grenadine" },
  { name: "Daïquiri Citron", category: "Cocktails", price: 3500, description: "Rhum blanc, Citron, Canne à Sucre" },
  { name: "Mai Tai", category: "Cocktails", price: 4000, description: "Rhum blanc, Jus de Orange, Grenadine" },
  { name: "Pina Colada", category: "Cocktails", price: 4000, description: "Rhum blanc, Jus de Ananas, Lait de Coco" },
  { name: "Togoliving Sunset", category: "Cocktails", price: 4500, description: "Rhum blanc, Jus de Ananas/Orange, Grenadine, Citron" },
  // COCKTAILS — Sans Alcool
  { name: "Virgin Mojito", category: "Cocktails", price: 2500, description: "Citron, Eau gazeuse, Canne à Sucre, Menthe (Sans Alcool)" },
  { name: "Tropical Sunrise", category: "Cocktails", price: 2500, description: "Jus de Orange/Ananas, Grenadine (Sans Alcool)" },
  { name: "Ginger Togoliving", category: "Cocktails", price: 3000, description: "Jus d'Orange/Gingembre, Canne à Sucre, Grenadine (Sans Alcool)" },
  { name: "Pool Coco Fresh", category: "Cocktails", price: 3000, description: "Jus d'Ananas/Pomme/Maracuja, Lait de Coco (Sans Alcool)" },
  { name: "Maracuja Garden", category: "Cocktails", price: 3000, description: "Jus d'Orange/Maracuja/Pomme, Grenadine (Sans Alcool)" },
  { name: "Tropical Appel", category: "Cocktails", price: 2500, description: "Jus de Maracuja/Pomme/Ananas (Sans Alcool)" },
  // VINS & SPIRITUEUX
  { name: "Bordeaux", category: "Vins & Spiritueux", price: 10000, description: "Vin Rouge" },
  { name: "Merlot", category: "Vins & Spiritueux", price: 10000, description: "Vin Rouge" },
  { name: "Cabernet", category: "Vins & Spiritueux", price: 10000, description: "Vin Rouge" },
  { name: "Syrah", category: "Vins & Spiritueux", price: 10000, description: "Vin Rouge" },
  { name: "Chianti", category: "Vins & Spiritueux", price: 12000, description: "Vin Rouge" },
  { name: "Gran Réserva", category: "Vins & Spiritueux", price: 8000, description: "Vin Rouge" },
  { name: "Chardonnay", category: "Vins & Spiritueux", price: 10000, description: "Vin Blanc / Mousseux" },
  { name: "Sauvignon", category: "Vins & Spiritueux", price: 10000, description: "Vin Blanc / Mousseux" },
  { name: "Duc de Paris", category: "Vins & Spiritueux", price: 9500, description: "Vin Blanc / Mousseux" },
  { name: "Muscados", category: "Vins & Spiritueux", price: 10000, description: "Vin Blanc / Mousseux" },
  { name: "J. Kiefer", category: "Vins & Spiritueux", price: 12000, description: "Vin Blanc / Mousseux" },
  { name: "Balantines", category: "Vins & Spiritueux", price: 20000, description: "Whisky (Bouteille)" },
  { name: "Grants", category: "Vins & Spiritueux", price: 20000, description: "Whisky (Bouteille)" },
  { name: "JW Red Label", category: "Vins & Spiritueux", price: 20000, description: "Whisky (Bouteille)" },
  { name: "Jack Daniels", category: "Vins & Spiritueux", price: 40000, description: "Whisky (Bouteille)" },
  { name: "Jägermeister", category: "Vins & Spiritueux", price: 20000, description: "Liqueur (Bouteille)" },
  { name: "Martini", category: "Vins & Spiritueux", price: 20000, description: "Liqueur (Bouteille)" },
  { name: "Campari", category: "Vins & Spiritueux", price: 20000, description: "Liqueur (Bouteille)" },
  { name: "Baileys", category: "Vins & Spiritueux", price: 30000, description: "Liqueur (Bouteille)" },
  { name: "Rum — Bacardi", category: "Vins & Spiritueux", price: 20000, description: "Spiritueux (Bouteille)" },
  { name: "Gin — Gordon's", category: "Vins & Spiritueux", price: 20000, description: "Spiritueux (Bouteille)" },
  { name: "Tequila — Jose Cuervo", category: "Vins & Spiritueux", price: 20000, description: "Spiritueux (Bouteille)" },
  { name: "Vodka — Smirnoff", category: "Vins & Spiritueux", price: 20000, description: "Spiritueux (Bouteille)" },
  { name: "Vodka Smirnoff — Verre 4cl", category: "Vins & Spiritueux", price: 2000, description: "Un Petit Verre 4cl" },
  { name: "Rum Bacardi — Verre 4cl", category: "Vins & Spiritueux", price: 2000, description: "Un Petit Verre 4cl" },
  { name: "Sodabi (Local) — Verre 4cl", category: "Vins & Spiritueux", price: 1000, description: "Un Petit Verre 4cl" },
  { name: "Jägermeister / Campari / Martini — Verre 4cl", category: "Vins & Spiritueux", price: 2000, description: "Un Petit Verre 4cl" },
  { name: "Whisky Label 5 — Verre 4cl", category: "Vins & Spiritueux", price: 2000, description: "Un Petit Verre 4cl" },
  { name: "Gin Gordon's — Verre 4cl", category: "Vins & Spiritueux", price: 2000, description: "Un Petit Verre 4cl" },
  { name: "Tequila Jose Cuervo — Verre 4cl", category: "Vins & Spiritueux", price: 2000, description: "Un Petit Verre 4cl" },
  // BOISSONS
  { name: "Voltic 1,5 l", category: "Boissons", price: 1500, description: "Eaux" },
  { name: "Eau Gazeuse 0,7 l", category: "Boissons", price: 2000, description: "Eaux" },
  { name: "Cocktail / Pompom / Chap", category: "Boissons", price: 1500, description: "Boissons Gazeuses" },
  { name: "Coca / Youzou / Tonic / Cocktail PM", category: "Boissons", price: 1000, description: "Boissons Gazeuses" },
  { name: "World Cola / Youzou / Agrumes", category: "Boissons", price: 1500, description: "Boissons Gazeuses" },
  { name: "Malta / Sport Active / XXL PM", category: "Boissons", price: 1500, description: "Boissons Gazeuses" },
  { name: "Jus Nature — Orange / Ananas / Bissap / Mangue", category: "Boissons", price: 1500, description: "Jus Nature" },
  { name: "Lager / Pils / Beaufort", category: "Boissons", price: 1500, description: "Bière" },
  { name: "Dj Lager / Dj Pils / Doppel / Chill / Racine", category: "Boissons", price: 1500, description: "Bière" },
  { name: "Heineken / Desperados / Awooyo", category: "Boissons", price: 2000, description: "Bière" },
  { name: "Guinness PM", category: "Boissons", price: 1500, description: "Bière" },
  { name: "Thé", category: "Boissons", price: 1000, description: "Boissons Chaudes" },
  { name: "Café au Lait", category: "Boissons", price: 2000, description: "Boissons Chaudes" },
  { name: "Capuccino", category: "Boissons", price: 2000, description: "Boissons Chaudes" },
  { name: "Latte Macchiato", category: "Boissons", price: 2500, description: "Boissons Chaudes" },
  { name: "Café", category: "Boissons", price: 1500, description: "Boissons Chaudes" },
  { name: "Chocolat Chaud", category: "Boissons", price: 2000, description: "Boissons Chaudes" },
  { name: "Expresso", category: "Boissons", price: 1500, description: "Boissons Chaudes" },
  { name: "Red Bull / Vody", category: "Boissons", price: 2000, description: "Energy" },
];

// ─── ACCOMMODATIONS ─────────────────────────────────────────────
const ACCOMMODATIONS = [
  {
    title: "Studios",
    subtitle: "Appartement 1 pièce",
    badge: "1 Pièce",
    isPremium: false,
    description: "Espace confortable, ventilé et climatisé, idéal pour un séjour solo ou en couple avec patio privatif.",
    videoUrl: "/videos/IMG_0077.mp4",
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Canal+ / Satellite" },
      { label: "Réfrigérateur" }, { label: "Patio privé" },
    ],
    prices: [
      { variant: "Studio Standard", num: "N° 4, 5, 6, 7", day: "30 000 F", month: "300 000 F" },
      { variant: "Studio Pro", num: "N° 34", day: "35 000 F", month: "350 000 F" },
    ],
  },
  {
    title: "1 Chambre Salon",
    subtitle: "Appartement 2 pièces",
    badge: "2 Pièces",
    isPremium: false,
    description: "Grand salon avec espace de vie confortable, idéal pour des séjours prolongés en toute sérénité.",
    videoUrl: "/videos/IMG_0085.MP4",
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Satellite" },
      { label: "Table à manger" }, { label: "Canapés" }, { label: "Patio" },
    ],
    prices: [
      { variant: "Chambre Salon Standard", num: "N° 8, 9, 20", day: "40 000 F", month: "420 000 F" },
      { variant: "Chambre Salon Confort", num: "N° 1, 56", day: "50 000 F", month: "500 000 F" },
    ],
  },
  {
    title: "2 Chambres Salon",
    subtitle: "Appartement 3 pièces",
    badge: "3 Pièces",
    isPremium: true,
    description: "Appartement spacieux avec deux chambres séparées et terrasse vue mer. Parfait pour les familles.",
    videoUrl: "/videos/IMG_0285.MP4",
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Satellite" },
      { label: "Terrasse vue mer" }, { label: "Literie premium" }, { label: "Table à manger" },
    ],
    prices: [
      { variant: "2 Chambres Salon Standard", num: "N° 2, 3", day: "80 000 F", month: "600 000 F" },
      { variant: "2 Chambres Salon Pro", num: "N° 78", day: "100 000 F", month: "700 000 F" },
    ],
  },
  {
    title: "3 Chambres Salon",
    subtitle: "Appartement VIP · 4 pièces",
    badge: "VIP · 4 Pièces",
    isPremium: true,
    description: "Immense espace de vie avec trois chambres pour les grandes familles ou groupes, avec un confort maximal.",
    videoUrl: "/videos/IMG_1684.MP4",
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Satellite" },
      { label: "Grande Terrasse" }, { label: "Lits King Size" }, { label: "Salle à manger" },
    ],
    prices: [
      { variant: "3 Chambres Salon Standard", num: "N° 30", day: "100 000 F", month: "700 000 F" },
      { variant: "3 Chambres Salon Pro", num: "N° 10", day: "100 000 F", month: "750 000 F" },
    ],
  },
];

// ─── DEFAULT SETTINGS ───────────────────────────────────────────
const DEFAULT_SETTINGS = {
  id: "default",
  hotelName: "TOGOLIVING",
  whatsappNumber: "22893872088",
  domainUrl: "https://residencetogoliving.com",
  pinAdmin: "9999",
  pinReception: "9999",
  pinKitchen: "9999",
};

// ─── SEED FUNCTION ──────────────────────────────────────────────
async function seed() {
  console.log("🚀 Starting seed...\n");

  // 1. Menu Items
  console.log("📋 Seeding menu_items...");
  const { error: menuErr } = await supabase.from("menu_items").insert(MENU_ITEMS);
  if (menuErr) console.error("  ❌ Menu Error:", menuErr.message);
  else console.log(`  ✅ ${MENU_ITEMS.length} menu items inserted`);

  // 2. Accommodations
  console.log("🏠 Seeding accommodations...");
  const { error: accErr } = await supabase.from("accommodations").insert(ACCOMMODATIONS);
  if (accErr) console.error("  ❌ Accommodations Error:", accErr.message);
  else console.log(`  ✅ ${ACCOMMODATIONS.length} accommodations inserted`);

  // 3. Settings
  console.log("⚙️  Seeding site_settings...");
  const { error: settErr } = await supabase.from("site_settings").upsert(DEFAULT_SETTINGS);
  if (settErr) console.error("  ❌ Settings Error:", settErr.message);
  else console.log("  ✅ Default settings inserted");

  console.log("\n✨ Seed complete!");
  console.log("\n📸 Note: Gallery images and accommodation images need to be uploaded");
  console.log("   via the Admin panel (/admin → Galerie Photos / Hébergements).");
}

seed();
