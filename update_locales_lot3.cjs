const fs = require('fs');
const path = require('path');

const frAdd = {
  restaurant: {
    hero: {
      subtitle: "Au Restaurant",
      title: "Restaurant Vue Océan à Lomé — Saveurs du Monde",
      desc: "Vue sur l'Océan"
    },
    search: "Rechercher un plat, boisson...",
    article: "article",
    articles: "articles",
    empty_menu: "Le menu est actuellement vide.",
    empty_category: "Aucun article dans cette catégorie.",
    categories: {
      "Tout": "Tout",
      "Petit-Déjeuner": "Petit-Déjeuner",
      "Entrées": "Entrées",
      "Plats": "Plats",
      "Fast Food & Pizzas": "Fast Food & Pizzas",
      "Desserts": "Desserts",
      "Cocktails": "Cocktails",
      "Vins & Spiritueux": "Vins & Spiritueux",
      "Boissons": "Boissons"
    },
    cart: {
      title: "Panier",
      order: "Votre commande",
      selected: "Articles sélectionnés",
      reception: "Réception",
      pickup: "Retrait au restaurant",
      delivery: "Livraison",
      address: "Adresse de livraison",
      address_placeholder: "Quartier, rue, repère, numéro...",
      per_unit: "/ unité",
      total: "Total",
      send_whatsapp: "Envoyer sur WhatsApp",
      tap_to_view: "Tap pour voir le panier",
      order_btn: "Commander"
    },
    popup: {
      unit_price: "Prix unitaire",
      add: "Ajouter au panier",
      unavailable: "Indisponible actuellement"
    },
    card: {
      unavailable: "Indisponible",
      see_more: "Voir plus"
    },
    msg: {
      greeting: "Bonjour TOGOLIVING,",
      intent: "Je souhaite commander au restaurant :",
      reception: "Mode de réception: {{method}}",
      address: "Adresse de livraison: {{address}}",
      total: "Total: {{total}}",
      footer: "Merci de confirmer la disponibilité."
    }
  },
  loisirs: {
    hero: {
      subtitle: "Loisirs & Détente",
      title: "Détendez-vous à TOGOLIVING",
      desc: "Entre océan et piscine panoramique, profitez d'un cadre conçu pour le repos, le divertissement et les moments en famille."
    },
    pool: {
      subtitle: "Vue imprenable",
      title: "Piscine Panoramique & Pool Bar",
      desc: "Plongez dans notre vaste piscine extérieure offrant une vue dégagée sur l'océan Atlantique. Que ce soit pour une baignade matinale rafraîchissante ou pour vous détendre au coucher du soleil avec un cocktail à la main.",
      b1: "Bassin pour adultes et petit bassin pour enfants",
      b2: "Pool bar avec service de rafraîchissements directement dans l'eau",
      b3: "Transats confortables et parasols pour profiter du soleil"
    },
    activities: {
      subtitle: "Pour tous les âges",
      title: "Espaces de Jeux & Activités",
      games_title: "Jeux & Divertissements",
      games_desc: "Profitez de notre espace loisirs équipé d'un billard, de baby-foot et de divers jeux de société pour vos soirées entre amis ou en famille.",
      kids_title: "Espace Enfants Sécurisé",
      kids_desc: "Une aire de jeux spécialement aménagée pour les plus petits, sous la supervision des parents, pour s'amuser en toute sécurité.",
      garden_title: "Jardin & Espaces Verts",
      garden_desc: "Promenez-vous dans notre jardin tropical, profitez du patio ombragé ou détendez-vous sur la terrasse avec vue sur la nature."
    },
    beach: {
      subtitle: "L'Océan à votre porte",
      title: "Plage Naturelle à 100m",
      desc: "Traversez la route et vous y êtes. La plage sauvage et préservée de Kpogan vous offre des kilomètres de sable fin pour vos balades matinales, votre jogging ou simplement pour écouter le bruit des vagues.",
      book: "Réserver votre séjour",
      restaurant: "Découvrir le Restaurant"
    },
    gallery: {
      title: "Galerie des Installations",
      desc: "Découvrez nos espaces de jeux et de détente en images."
    }
  },
  galerie: {
    hero: {
      subtitle: "Notre Cadre",
      title: "Kpogan Agbetsiko"
    },
    categories: {
      "Tout": "Tout",
      "Piscine": "Piscine",
      "Plage": "Plage",
      "Appartements": "Appartements",
      "Intérieur": "Intérieur",
      "Bar": "Bar"
    },
    empty: "Aucune photo disponible dans cette catégorie pour le moment."
  }
};

const enAdd = {
  restaurant: {
    hero: {
      subtitle: "At the Restaurant",
      title: "Ocean View Restaurant in Lomé — World Flavors",
      desc: "Ocean View"
    },
    search: "Search for a dish, drink...",
    article: "item",
    articles: "items",
    empty_menu: "The menu is currently empty.",
    empty_category: "No items in this category.",
    categories: {
      "Tout": "All",
      "Petit-Déjeuner": "Breakfast",
      "Entrées": "Starters",
      "Plats": "Main Courses",
      "Fast Food & Pizzas": "Fast Food & Pizzas",
      "Desserts": "Desserts",
      "Cocktails": "Cocktails",
      "Vins & Spiritueux": "Wines & Spirits",
      "Boissons": "Drinks"
    },
    cart: {
      title: "Cart",
      order: "Your order",
      selected: "Selected items",
      reception: "Reception",
      pickup: "Pickup at restaurant",
      delivery: "Delivery",
      address: "Delivery address",
      address_placeholder: "Neighborhood, street, landmark, number...",
      per_unit: "/ unit",
      total: "Total",
      send_whatsapp: "Send on WhatsApp",
      tap_to_view: "Tap to view cart",
      order_btn: "Order"
    },
    popup: {
      unit_price: "Unit price",
      add: "Add to cart",
      unavailable: "Currently unavailable"
    },
    card: {
      unavailable: "Unavailable",
      see_more: "See more"
    },
    msg: {
      greeting: "Hello TOGOLIVING,",
      intent: "I would like to order from the restaurant :",
      reception: "Reception method: {{method}}",
      address: "Delivery address: {{address}}",
      total: "Total: {{total}}",
      footer: "Please confirm availability."
    }
  },
  loisirs: {
    hero: {
      subtitle: "Leisure & Relaxation",
      title: "Relax at TOGOLIVING",
      desc: "Between the ocean and a panoramic pool, enjoy a setting designed for rest, entertainment, and family moments."
    },
    pool: {
      subtitle: "Breathtaking view",
      title: "Panoramic Pool & Pool Bar",
      desc: "Dive into our large outdoor pool with an unobstructed view of the Atlantic Ocean. Whether for a refreshing morning swim or to relax at sunset with a cocktail in hand.",
      b1: "Adult pool and small children's pool",
      b2: "Pool bar with refreshment service directly in the water",
      b3: "Comfortable sun loungers and umbrellas to enjoy the sun"
    },
    activities: {
      subtitle: "For all ages",
      title: "Play & Activity Areas",
      games_title: "Games & Entertainment",
      games_desc: "Enjoy our leisure area equipped with billiards, table football, and various board games for your evenings with friends or family.",
      kids_title: "Secure Children's Area",
      kids_desc: "A specially designed playground for the little ones, under parental supervision, to have fun safely.",
      garden_title: "Garden & Green Spaces",
      garden_desc: "Stroll through our tropical garden, enjoy the shaded patio or relax on the terrace overlooking nature."
    },
    beach: {
      subtitle: "The Ocean at your doorstep",
      title: "Natural Beach 100m away",
      desc: "Cross the road and you're there. The wild and unspoiled beach of Kpogan offers kilometers of fine sand for your morning walks, your jogging, or simply to listen to the sound of the waves.",
      book: "Book your stay",
      restaurant: "Discover the Restaurant"
    },
    gallery: {
      title: "Facilities Gallery",
      desc: "Discover our play and relaxation areas in pictures."
    }
  },
  galerie: {
    hero: {
      subtitle: "Our Setting",
      title: "Kpogan Agbetsiko"
    },
    categories: {
      "Tout": "All",
      "Piscine": "Pool",
      "Plage": "Beach",
      "Appartements": "Apartments",
      "Intérieur": "Interior",
      "Bar": "Bar"
    },
    empty: "No photos available in this category at the moment."
  }
};

const deAdd = {
  restaurant: {
    hero: {
      subtitle: "Im Restaurant",
      title: "Meerblick-Restaurant in Lomé — Aromen der Welt",
      desc: "Blick auf den Ozean"
    },
    search: "Suchen Sie nach einem Gericht, Getränk...",
    article: "Artikel",
    articles: "Artikel",
    empty_menu: "Die Speisekarte ist derzeit leer.",
    empty_category: "Keine Artikel in dieser Kategorie.",
    categories: {
      "Tout": "Alle",
      "Petit-Déjeuner": "Frühstück",
      "Entrées": "Vorspeisen",
      "Plats": "Hauptgerichte",
      "Fast Food & Pizzas": "Fast Food & Pizzas",
      "Desserts": "Desserts",
      "Cocktails": "Cocktails",
      "Vins & Spiritueux": "Weine & Spirituosen",
      "Boissons": "Getränke"
    },
    cart: {
      title: "Warenkorb",
      order: "Ihre Bestellung",
      selected: "Ausgewählte Artikel",
      reception: "Empfang",
      pickup: "Abholung im Restaurant",
      delivery: "Lieferung",
      address: "Lieferadresse",
      address_placeholder: "Nachbarschaft, Straße, Orientierungspunkt, Nummer...",
      per_unit: "/ Einheit",
      total: "Gesamt",
      send_whatsapp: "Über WhatsApp senden",
      tap_to_view: "Tippen, um den Warenkorb anzuzeigen",
      order_btn: "Bestellen"
    },
    popup: {
      unit_price: "Stückpreis",
      add: "In den Warenkorb",
      unavailable: "Derzeit nicht verfügbar"
    },
    card: {
      unavailable: "Nicht verfügbar",
      see_more: "Mehr sehen"
    },
    msg: {
      greeting: "Hallo TOGOLIVING,",
      intent: "Ich möchte im Restaurant bestellen :",
      reception: "Empfangsmethode: {{method}}",
      address: "Lieferadresse: {{address}}",
      total: "Gesamt: {{total}}",
      footer: "Bitte bestätigen Sie die Verfügbarkeit."
    }
  },
  loisirs: {
    hero: {
      subtitle: "Freizeit & Entspannung",
      title: "Entspannen Sie bei TOGOLIVING",
      desc: "Genießen Sie zwischen dem Ozean und einem Panorama-Pool eine Umgebung, die auf Ruhe, Unterhaltung und Familienmomente ausgelegt ist."
    },
    pool: {
      subtitle: "Atemberaubende Aussicht",
      title: "Panorama-Pool & Poolbar",
      desc: "Tauchen Sie in unseren großen Außenpool mit freiem Blick auf den Atlantischen Ozean ein. Ob für ein erfrischendes morgendliches Schwimmen oder zum Entspannen bei Sonnenuntergang mit einem Cocktail in der Hand.",
      b1: "Erwachsenenpool und kleines Kinderbecken",
      b2: "Poolbar mit Erfrischungsservice direkt im Wasser",
      b3: "Bequeme Sonnenliegen und Sonnenschirme, um die Sonne zu genießen"
    },
    activities: {
      subtitle: "Für alle Altersgruppen",
      title: "Spiel- & Aktivitätsbereiche",
      games_title: "Spiele & Unterhaltung",
      games_desc: "Genießen Sie unseren Freizeitbereich, der mit Billard, Tischfußball und verschiedenen Brettspielen für Ihre Abende mit Freunden oder der Familie ausgestattet ist.",
      kids_title: "Sicherer Kinderbereich",
      kids_desc: "Ein speziell eingerichteter Spielplatz für die Kleinen unter elterlicher Aufsicht, um sicher Spaß zu haben.",
      garden_title: "Garten & Grünflächen",
      garden_desc: "Spazieren Sie durch unseren tropischen Garten, genießen Sie die schattige Terrasse oder entspannen Sie auf der Terrasse mit Blick auf die Natur."
    },
    beach: {
      subtitle: "Der Ozean vor der Haustür",
      title: "Naturstrand in 100m Entfernung",
      desc: "Überqueren Sie die Straße und Sie sind da. Der wilde und unberührte Strand von Kpogan bietet kilometerlangen feinen Sand für Ihre morgendlichen Spaziergänge, Ihr Joggen oder einfach um dem Rauschen der Wellen zu lauschen.",
      book: "Buchen Sie Ihren Aufenthalt",
      restaurant: "Entdecken Sie das Restaurant"
    },
    gallery: {
      title: "Einrichtungsgalerie",
      desc: "Entdecken Sie unsere Spiel- und Entspannungsbereiche in Bildern."
    }
  },
  galerie: {
    hero: {
      subtitle: "Unsere Umgebung",
      title: "Kpogan Agbetsiko"
    },
    categories: {
      "Tout": "Alle",
      "Piscine": "Pool",
      "Plage": "Strand",
      "Appartements": "Apartments",
      "Intérieur": "Innere",
      "Bar": "Bar"
    },
    empty: "Derzeit sind in dieser Kategorie keine Fotos verfügbar."
  }
};

const updateFile = (filename, additions) => {
  const p = path.join(process.cwd(), 'src', 'locales', filename);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  Object.assign(data, additions);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
};

updateFile('fr.json', frAdd);
updateFile('en.json', enAdd);
updateFile('de.json', deAdd);

console.log("Updated locale files for Lot 3");
