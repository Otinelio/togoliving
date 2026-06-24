const fs = require('fs');
const path = require('path');

const frAdd = {
  home: {
    booking: {
      arrival: "Arrivée",
      departure: "Départ",
      guests: "Personnes",
      type: "Type",
      checkAvailability: "Vérifier la disponibilité"
    },
    hero: {
      subtitle: "Villa Balnéaire Tropicale · Hôtel ★★★★",
      title_pt1: "Hôtel 4★ à Lomé —",
      title_highlight: "Résidence Balnéaire",
      title_pt2: "Vue Mer",
      tagline: "L'Océan à votre Porte",
      location: "Kpogan Agbetsiko · Lomé, Togo",
      book_btn: "Réserver un Séjour",
      rooms_btn: "Voir les Hébergements"
    },
    highlights: {
      beach_title: "Accès Plage Direct",
      beach_sub: "de la plage naturelle",
      apartments_title: "Appartements Meublés",
      apartments_sub: "types d'hébergement",
      pool_title: "Piscine Vue Mer",
      pool_sub: "Vue panoramique sur l'océan",
      restaurant_title: "Restaurant & Bar",
      restaurant_sub: "Saveurs africaines & monde"
    },
    rooms: {
      subtitle: "Nos Espaces",
      title: "Hébergements d'Exception",
      types: {
        studio: {
          title: "Studios",
          badge: "1 Pièce",
          desc: "Espace confortable, idéal pour un séjour solo ou en couple."
        },
        chambre_salon: {
          title: "Chambre Salon",
          badge: "2 Pièces",
          desc: "Grand salon avec espace de vie idéal pour séjours prolongés."
        },
        "2_chambres": {
          title: "2 Chambres Salon",
          badge: "3 Pièces",
          desc: "Appartement spacieux avec deux chambres séparées. Parfait pour familles."
        },
        "3_chambres": {
          title: "3 Chambres Salon",
          badge: "VIP · 4 Pièces",
          desc: "Immense espace de vie avec trois chambres pour un maximum de confort."
        }
      },
      features: {
        "WiFi": "WiFi",
        "AC": "AC",
        "TV Satellite": "TV Satellite",
        "Refrigerateur": "Réfrigérateur",
        "Patio": "Patio",
        "Table a manger": "Table à manger",
        "Canapes": "Canapés",
        "Vue mer": "Vue mer",
        "Terrasse": "Terrasse",
        "Literie premium": "Literie premium",
        "Grande Terrasse": "Grande Terrasse",
        "Lits King Size": "Lits King Size"
      },
      btn_details: "Détails",
      btn_book: "Réserver"
    },
    leisure: {
      subtitle: "Détente & Saveurs",
      title: "Piscine, Plage & Cocktail Bar",
      pool_title: "Piscine Panoramique",
      pool_desc: "Vue directe sur l'océan, détente garantie au coucher du soleil.",
      beach_title: "Plage Naturelle",
      beach_desc: "100 mètres de la villa, plage quasi naturelle préservée.",
      bar_title: "Cocktail Bar",
      bar_desc: "Bientôt disponible, ambiance tropicale en bord de mer."
    },
    restaurant: {
      subtitle: "Au Restaurant",
      title: "Saveurs du Monde",
      desc: "Cuisine africaine, française et américaine — vue sur l'océan.",
      breakfast: "Petit-Déjeuner",
      international: "Menu International",
      pizzas: "Pizzas & Snacks",
      cocktails: "Cocktails & Vins",
      btn: "Découvrir le Menu"
    },
    reviews: {
      subtitle: "Ce que disent nos clients",
      title: "Avis Voyageurs",
      exceptional: "Exceptionnel",
      average_note: "Note moyenne sur nos plateformes partenaires."
    },
    booking_msg: {
      greeting: "Bonjour TOGOLIVING,\nJe souhaite réserver :\nType: {{type}}\nArrivée: {{arrivee}}\nDépart: {{depart}}\nPersonnes: {{personnes}}\nMerci de confirmer la disponibilité.",
      tbd: "à définir"
    }
  }
};

const enAdd = {
  home: {
    booking: {
      arrival: "Check-in",
      departure: "Check-out",
      guests: "Guests",
      type: "Type",
      checkAvailability: "Check Availability"
    },
    hero: {
      subtitle: "Tropical Seaside Villa · ★★★★ Hotel",
      title_pt1: "4★ Hotel in Lomé —",
      title_highlight: "Seaside Residence",
      title_pt2: "with Ocean View",
      tagline: "The Ocean at your Doorstep",
      location: "Kpogan Agbetsiko · Lomé, Togo",
      book_btn: "Book a Stay",
      rooms_btn: "View Accommodations"
    },
    highlights: {
      beach_title: "Direct Beach Access",
      beach_sub: "of natural beach",
      apartments_title: "Furnished Apartments",
      apartments_sub: "accommodation types",
      pool_title: "Sea View Pool",
      pool_sub: "Panoramic view of the ocean",
      restaurant_title: "Restaurant & Bar",
      restaurant_sub: "African & world flavors"
    },
    rooms: {
      subtitle: "Our Spaces",
      title: "Exceptional Accommodations",
      types: {
        studio: {
          title: "Studios",
          badge: "1 Room",
          desc: "Comfortable space, ideal for a solo stay or couple."
        },
        chambre_salon: {
          title: "Bedroom & Living Room",
          badge: "2 Rooms",
          desc: "Large living room, ideal for extended stays."
        },
        "2_chambres": {
          title: "2 Bedrooms & Living Room",
          badge: "3 Rooms",
          desc: "Spacious apartment with two separate bedrooms. Perfect for families."
        },
        "3_chambres": {
          title: "3 Bedrooms & Living Room",
          badge: "VIP · 4 Rooms",
          desc: "Huge living space with three bedrooms for maximum comfort."
        }
      },
      features: {
        "WiFi": "WiFi",
        "AC": "AC",
        "TV Satellite": "Satellite TV",
        "Refrigerateur": "Refrigerator",
        "Patio": "Patio",
        "Table a manger": "Dining table",
        "Canapes": "Sofas",
        "Vue mer": "Sea view",
        "Terrasse": "Terrace",
        "Literie premium": "Premium bedding",
        "Grande Terrasse": "Large Terrace",
        "Lits King Size": "King Size Beds"
      },
      btn_details: "Details",
      btn_book: "Book"
    },
    leisure: {
      subtitle: "Relaxation & Flavors",
      title: "Pool, Beach & Cocktail Bar",
      pool_title: "Panoramic Pool",
      pool_desc: "Direct view of the ocean, guaranteed relaxation at sunset.",
      beach_title: "Natural Beach",
      beach_desc: "100 meters from the villa, preserved near-natural beach.",
      bar_title: "Cocktail Bar",
      bar_desc: "Coming soon, tropical atmosphere by the sea."
    },
    restaurant: {
      subtitle: "At the Restaurant",
      title: "Flavors of the World",
      desc: "African, French, and American cuisine — overlooking the ocean.",
      breakfast: "Breakfast",
      international: "International Menu",
      pizzas: "Pizzas & Snacks",
      cocktails: "Cocktails & Wine",
      btn: "Discover the Menu"
    },
    reviews: {
      subtitle: "What our guests say",
      title: "Traveler Reviews",
      exceptional: "Exceptional",
      average_note: "Average rating on our partner platforms."
    },
    booking_msg: {
      greeting: "Hello TOGOLIVING,\nI would like to book:\nType: {{type}}\nCheck-in: {{arrivee}}\nCheck-out: {{depart}}\nGuests: {{personnes}}\nPlease confirm availability.",
      tbd: "to be determined"
    }
  }
};

const deAdd = {
  home: {
    booking: {
      arrival: "Anreise",
      departure: "Abreise",
      guests: "Gäste",
      type: "Typ",
      checkAvailability: "Verfügbarkeit prüfen"
    },
    hero: {
      subtitle: "Tropische Strandvilla · ★★★★ Hotel",
      title_pt1: "4★ Hotel in Lomé —",
      title_highlight: "Strandresidenz",
      title_pt2: "mit Meerblick",
      tagline: "Der Ozean vor Ihrer Tür",
      location: "Kpogan Agbetsiko · Lomé, Togo",
      book_btn: "Aufenthalt buchen",
      rooms_btn: "Unterkünfte ansehen"
    },
    highlights: {
      beach_title: "Direkter Strandzugang",
      beach_sub: "Naturstrand",
      apartments_title: "Möblierte Apartments",
      apartments_sub: "Unterkunftsarten",
      pool_title: "Pool mit Meerblick",
      pool_sub: "Panoramablick auf den Ozean",
      restaurant_title: "Restaurant & Bar",
      restaurant_sub: "Afrikanische & weltweite Aromen"
    },
    rooms: {
      subtitle: "Unsere Räume",
      title: "Außergewöhnliche Unterkünfte",
      types: {
        studio: {
          title: "Studios",
          badge: "1 Zimmer",
          desc: "Gemütlicher Raum, ideal für Alleinreisende oder Paare."
        },
        chambre_salon: {
          title: "Schlafzimmer & Wohnzimmer",
          badge: "2 Zimmer",
          desc: "Großes Wohnzimmer, ideal für längere Aufenthalte."
        },
        "2_chambres": {
          title: "2 Schlafzimmer & Wohnzimmer",
          badge: "3 Zimmer",
          desc: "Geräumiges Apartment mit zwei separaten Schlafzimmern. Perfekt für Familien."
        },
        "3_chambres": {
          title: "3 Schlafzimmer & Wohnzimmer",
          badge: "VIP · 4 Zimmer",
          desc: "Riesiger Wohnbereich mit drei Schlafzimmern für maximalen Komfort."
        }
      },
      features: {
        "WiFi": "WLAN",
        "AC": "Klimaanlage",
        "TV Satellite": "Satelliten-TV",
        "Refrigerateur": "Kühlschrank",
        "Patio": "Terrasse",
        "Table a manger": "Esstisch",
        "Canapes": "Sofas",
        "Vue mer": "Meerblick",
        "Terrasse": "Balkon",
        "Literie premium": "Premium-Bettwäsche",
        "Grande Terrasse": "Große Terrasse",
        "Lits King Size": "Kingsize-Betten"
      },
      btn_details: "Details",
      btn_book: "Buchen"
    },
    leisure: {
      subtitle: "Entspannung & Genuss",
      title: "Pool, Strand & Cocktailbar",
      pool_title: "Panorama-Pool",
      pool_desc: "Direkter Blick auf den Ozean, garantierte Entspannung bei Sonnenuntergang.",
      beach_title: "Naturstrand",
      beach_desc: "100 Meter von der Villa entfernt, erhaltener fast natürlicher Strand.",
      bar_title: "Cocktailbar",
      bar_desc: "Bald verfügbar, tropische Atmosphäre am Meer."
    },
    restaurant: {
      subtitle: "Im Restaurant",
      title: "Aromen der Welt",
      desc: "Afrikanische, französische und amerikanische Küche — mit Blick auf den Ozean.",
      breakfast: "Frühstück",
      international: "Internationales Menü",
      pizzas: "Pizzen & Snacks",
      cocktails: "Cocktails & Wein",
      btn: "Menü entdecken"
    },
    reviews: {
      subtitle: "Was unsere Gäste sagen",
      title: "Gästebewertungen",
      exceptional: "Außergewöhnlich",
      average_note: "Durchschnittliche Bewertung auf unseren Partnerplattformen."
    },
    booking_msg: {
      greeting: "Hallo TOGOLIVING,\nich möchte buchen:\nTyp: {{type}}\nAnreise: {{arrivee}}\nAbreise: {{depart}}\nGäste: {{personnes}}\nBitte bestätigen Sie die Verfügbarkeit.",
      tbd: "noch festzulegen"
    }
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

console.log("Updated locale files");
