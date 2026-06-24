const fs = require('fs');

let content = fs.readFileSync('src/routes/index.tsx', 'utf8');

// Import useTranslation
content = content.replace(
  'import { Link, createFileRoute } from "@tanstack/react-router";',
  'import { Link, createFileRoute } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);

// Add t to QuickBooking
content = content.replace(
  'function QuickBooking() {',
  'function QuickBooking() {\n  const { t } = useTranslation();'
);

// QuickBooking UI
content = content.replace('Arrivée</span>', '{t("home.booking.arrival")}</span>');
content = content.replace('Départ</span>', '{t("home.booking.departure")}</span>');
content = content.replace('Personnes</span>', '{t("home.booking.guests")}</span>');
content = content.replace('Type</span>', '{t("home.booking.type")}</span>');
content = content.replace('>Vérifier la disponibilité<', '>{t("home.booking.checkAvailability")}<');

// QuickBooking WhatsApp
content = content.replace(
  '`Bonjour TOGOLIVING,\\nJe souhaite reserver:\\nType: ${type}\\nArrivee: ${arrivee || "a definir"}\\nDepart: ${depart || "a definir"}\\nPersonnes: ${personnes}\\nMerci de confirmer la disponibilite.`',
  '`${t("home.booking_msg.greeting", { type, arrivee: arrivee || t("home.booking_msg.tbd"), depart: depart || t("home.booking_msg.tbd"), personnes })}`'
);

// Page component
content = content.replace('function HomePage() {', 'function HomePage() {\n  const { t } = useTranslation();');

// Hero section
content = content.replace('Villa Balnéaire Tropicale · Hôtel ★★★★', '{t("home.hero.subtitle")}');
content = content.replace('Hôtel 4★ à Lomé — <span className="text-turquoise">Résidence Balnéaire</span> Vue Mer', '{t("home.hero.title_pt1")} <span className="text-turquoise">{t("home.hero.title_highlight")}</span> {t("home.hero.title_pt2")}');
content = content.replace('L\'Ocean a votre Porte', '{t("home.hero.tagline")}');
content = content.replace('Kpogan Agbetsiko · Lome, Togo', '{t("home.hero.location")}');
content = content.replace('Reserver un Sejour', '{t("home.hero.book_btn")}');
content = content.replace('Voir les Hebergements', '{t("home.hero.rooms_btn")}');

// Highlights
content = content.replace(
  '{ icon: Waves, title: "Accès Plage Direct", sub: "100m de la plage naturelle", count: 100, suf: "m" }',
  '{ icon: Waves, title: t("home.highlights.beach_title"), sub: t("home.highlights.beach_sub"), count: 100, suf: "m" }'
);
content = content.replace(
  '{ icon: BedDouble, title: "Appartements Meublés", sub: "4 types d\'hébergement", count: 4, suf: " types" }',
  '{ icon: BedDouble, title: t("home.highlights.apartments_title"), sub: t("home.highlights.apartments_sub"), count: 4, suf: "" }'
);
content = content.replace(
  '{ icon: Droplets, title: "Piscine Vue Mer", sub: "Vue panoramique sur l\'océan", count: 1, suf: " piscine" }',
  '{ icon: Droplets, title: t("home.highlights.pool_title"), sub: t("home.highlights.pool_sub"), count: 1, suf: "" }'
);
content = content.replace(
  '{ icon: UtensilsCrossed, title: "Restaurant & Bar", sub: "Saveurs africaines & monde", count: 6, suf: " cuisines" }',
  '{ icon: UtensilsCrossed, title: t("home.highlights.restaurant_title"), sub: t("home.highlights.restaurant_sub"), count: 6, suf: "" }'
);

// Rooms header
content = content.replace('>Nos Espaces<', '>{t("home.rooms.subtitle")}<');
content = content.replace('>Hébergements d\'Exception<', '>{t("home.rooms.title")}<');

// Render loop for rooms inside HomePage
content = content.replace(
  'const rooms = [',
  'const roomsData = [\n  {\n    id: "studio",\n    key: "studio",\n    img: ASSETS.studioIMG4201,\n    features: ["WiFi", "AC", "TV Satellite", "Refrigerateur", "Patio"],\n  },\n  {\n    id: "chambre-salon",\n    key: "chambre_salon",\n    img: ASSETS.chambreSalonIMG4211,\n    features: ["WiFi", "AC", "TV Satellite", "Table a manger", "Canapes", "Patio"],\n  },\n  {\n    id: "2-chambres",\n    key: "2_chambres",\n    premium: true,\n    img: ASSETS.deuxChambresIMG4212,\n    features: ["Vue mer", "Terrasse", "Literie premium", "WiFi", "AC", "TV Satellite"],\n  },\n  {\n    id: "3-chambres",\n    key: "3_chambres",\n    premium: true,\n    img: ASSETS.troisChambresSalonIMG4247,\n    features: ["Grande Terrasse", "Lits King Size", "WiFi", "AC", "TV Satellite"],\n  },\n];\n// '
);

// Replace mapping to use translation keys
content = content.replace('rooms.map((r, i) => (', 'roomsData.map((r, i) => (');
content = content.replace('{r.badge}', '{t(`home.rooms.types.${r.key}.badge`)}');
content = content.replace('{r.title}', '{t(`home.rooms.types.${r.key}.title`)}');
content = content.replace('{r.desc}', '{t(`home.rooms.types.${r.key}.desc`)}');
content = content.replace('{f}', '{t(`home.rooms.features.${f}`)}');
content = content.replace('>Détails<', '>{t("home.rooms.btn_details")}<');
content = content.replace('>Réserver<', '>{t("home.rooms.btn_book")}<');
// Fix the URL parameter for details link
content = content.replace('r.title.toLowerCase().replace(/ /g, "-")', 'r.id');

// Leisure
content = content.replace('>Détente & Saveurs<', '>{t("home.leisure.subtitle")}<');
content = content.replace('>Piscine, Plage & Cocktail Bar<', '>{t("home.leisure.title")}<');
content = content.replace(
  '{ icon: Droplets, title: "Piscine Panoramique", desc: "Vue directe sur l\'océan, détente garantie au coucher du soleil." }',
  '{ icon: Droplets, title: t("home.leisure.pool_title"), desc: t("home.leisure.pool_desc") }'
);
content = content.replace(
  '{ icon: Waves, title: "Plage Naturelle", desc: "100 mètres de la villa, plage quasi naturelle préservée." }',
  '{ icon: Waves, title: t("home.leisure.beach_title"), desc: t("home.leisure.beach_desc") }'
);
content = content.replace(
  '{ icon: UtensilsCrossed, title: "Cocktail Bar", desc: "Bientôt disponible, ambiance tropicale en bord de mer." }',
  '{ icon: UtensilsCrossed, title: t("home.leisure.bar_title"), desc: t("home.leisure.bar_desc") }'
);

// Restaurant
content = content.replace('>Au Restaurant<', '>{t("home.restaurant.subtitle")}<');
content = content.replace('>Saveurs du Monde<', '>{t("home.restaurant.title")}<');
content = content.replace('>Cuisine africaine, française et américaine — vue sur l\'océan.<', '>{t("home.restaurant.desc")}<');
content = content.replace('{ icon: Coffee, title: "Petit-Déjeuner" }', '{ icon: Coffee, title: t("home.restaurant.breakfast") }');
content = content.replace('{ icon: Globe, title: "Menu International" }', '{ icon: Globe, title: t("home.restaurant.international") }');
content = content.replace('{ icon: Pizza, title: "Pizzas & Snacks" }', '{ icon: Pizza, title: t("home.restaurant.pizzas") }');
content = content.replace('{ icon: Wine, title: "Cocktails & Vins" }', '{ icon: Wine, title: t("home.restaurant.cocktails") }');
content = content.replace('>Découvrir le Menu<', '>{t("home.restaurant.btn")}<');

// Reviews
content = content.replace('>Avis Voyageurs<', '>{t("home.reviews.title")}<');
content = content.replace('>Ce que disent nos clients<', '>{t("home.reviews.subtitle")}<');
content = content.replace('>Exceptionnel<', '>{t("home.reviews.exceptional")}<');
content = content.replace('>Note moyenne sur nos plateformes partenaires.<', '>{t("home.reviews.average_note")}<');

fs.writeFileSync('src/routes/index.tsx', content);
console.log("Index updated.");
