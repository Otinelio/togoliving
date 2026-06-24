const fs = require('fs');
const path = require('path');

const frAdd = {
  accommodations: {
    hero: {
      subtitle: "Nos Espaces",
      title: "Appartements & Studios Vue Mer à Lomé, Togo",
      desc: "4 types d'appartements meublés, climatisés, avec WiFi gratuit et accès direct à la plage."
    },
    amenities: {
      subtitle: "Tout inclus",
      title: "Équipements & Services",
      items: {
        wifi: "WiFi Gratuit",
        ac: "Climatisation",
        tv: "TV Satellite + Canal+",
        breakfast: "Petit-déjeuner disponible",
        parking: "Parking Privé Gratuit",
        shuttle: "Navette Aéroport (sur demande)",
        beach: "Accès Plage",
        pool: "Piscine",
        bar: "Cocktail Bar",
        restaurant: "Restaurant sur place"
      }
    },
    category: {
      back: "Retour aux catégories",
      desc: "Découvrez en détail toutes nos chambres de type {{category}}.",
      not_found: "Catégorie Introuvable",
      back_link: "Retour aux hébergements",
      empty: "Aucune chambre configurée pour cette catégorie actuellement.",
      why_title: "Pourquoi séjourner dans nos {{category}} à Lomé ?",
      why_p1: "La Résidence TOGOLIVING vous propose une expérience unique à Lomé. En réservant l'un de nos <strong>{{category}}</strong>, vous bénéficiez non seulement d'un confort optimal avec des équipements modernes (climatisation, WiFi très haut débit, smart TV), mais aussi d'un emplacement privilégié dans le quartier paisible de Kpogan Agbetsiko.",
      why_p2: "<strong>Un environnement exceptionnel :</strong> Située à seulement 100 mètres de la plage naturelle, notre résidence balnéaire vous offre un accès rapide à l'Océan Atlantique. Nos clients apprécient particulièrement les promenades matinales sur la plage et les couchers de soleil spectaculaires depuis notre piscine panoramique.",
      why_p3: "<strong>Services et Commodités :</strong> Séjourner chez nous, c'est profiter de services hôteliers de qualité (ménage régulier, sécurité 24/7) tout en gardant l'indépendance d'un appartement. Vous aurez accès à notre restaurant proposant des saveurs du monde, ainsi qu'à nos espaces de loisirs incluant un espace jeux pour enfants et un billard.",
      review: "Un séjour inoubliable ! Le {{category}} était d'une propreté impeccable, spacieux et idéalement situé face à la mer. Le personnel est aux petits soins et le restaurant offre d'excellents plats. Nous reviendrons sans hésiter.",
      review_author: "— Avis Client, Voyageur vérifié",
      media_preview: "Aperçu",
      loading: "Chargement...",
      no_media: "Aucun média",
      video_badge: "▶ Vidéo",
      capacity: "Capacité & Espace : {{capacity}}",
      price_request: "Prix sur demande",
      per_night: "/ nuit",
      per_month: "/ mois",
      description_title: "Description",
      amenities_title: "Équipements",
      amenities_more: "+ {{count}} autres",
      show_more: "Voir tous les détails",
      show_less: "Voir moins de détails",
      book_room: "Réserver cette chambre",
      unavailable: "Non disponible actuellement"
    }
  },
  booking: {
    hero: {
      subtitle: "Réservation",
      title: "Confirmez votre Séjour",
      desc: "Confirmation rapide via WhatsApp · Pas de paiement en ligne"
    },
    steps: {
      s1: "Hébergement",
      s2: "Séjour & Occupants",
      s3: "Coordonnées",
      s4: "Récapitulatif"
    },
    step1: {
      title: "Choisir l'hébergement",
      app_type: "Type d'appartement",
      room_cat: "Catégorie de chambre",
      full: "Complet",
      available: "Disponibles : N° {{rooms}}",
      per_night: "/nuit",
      per_month: "/mois",
      desired_room: "Chambre souhaitée",
      optional: "(optionnel)",
      no_pref: "Pas de préférence",
      room_n: "Chambre N° {{n}}"
    },
    step2: {
      title: "Dates & Occupants",
      stay_type: "Type de séjour",
      by_night: "À la nuit",
      by_month: "Au mois",
      arrival: "Arrivée",
      departure: "Départ",
      duration_est: "Durée estimée",
      nights: "{{count}} nuit",
      nights_plural: "{{count}} nuits",
      adults: "Adultes",
      children: "Enfants",
      special_req: "Demandes spéciales",
      req_placeholder: "Vue mer souhaitée, lit bébé, transfert aéroport...",
      price_est: "Tarif estimé"
    },
    step3: {
      title: "Vos coordonnées",
      name: "Nom complet *",
      name_placeholder: "Prénom et Nom",
      phone: "Téléphone / WhatsApp *",
      email: "Email",
      time: "Heure d'arrivée prévue"
    },
    step4: {
      title: "Récapitulatif",
      chosen_room: "Hébergement choisi",
      type: "Type",
      category: "Catégorie",
      room: "Chambre",
      stay: "Séjour",
      occupants: "Occupants",
      adult: "adulte",
      adult_plural: "adultes",
      child: "enfant",
      child_plural: "enfants",
      contact: "Coordonnées",
      disclaimer: "En cliquant sur confirmer, vous serez redirigé vers WhatsApp pour finaliser votre réservation avec l'équipe TOGOLIVING.",
      back: "Retour",
      next: "Suivant",
      confirm: "Confirmer via WhatsApp"
    },
    faq: {
      title: "Questions Fréquentes",
      subtitle: "Tout ce que vous devez savoir avant de réserver.",
      q1: "Quelle est la politique d'annulation ?",
      a1: "Les annulations sont gratuites jusqu'à 48 heures avant la date d'arrivée prévue. Passé ce délai, la première nuit sera facturée.",
      q2: "Y a-t-il une navette depuis l'aéroport ?",
      a2: "Oui, nous proposons un service de navette aéroport VIP sur demande. Veuillez l'indiquer dans la section \"Demandes spéciales\" lors de votre réservation.",
      q3: "Les animaux de compagnie sont-ils acceptés ?",
      a3: "Pour garantir le confort de tous nos clients, les animaux de compagnie ne sont malheureusement pas admis au sein de la résidence."
    },
    msg: {
      greeting: "Bonjour TOGOLIVING,\n═══ NOUVELLE DEMANDE DE RÉSERVATION ═══\n",
      room: "Hébergement : {{category}} — {{variant}}",
      room_num: "Chambre N° {{n}}",
      room_any: "Une chambre disponible de la catégorie {{variant}}",
      price: "Tarif estimé : {{price}}",
      arrival: "Arrivée : {{date}} à {{time}}",
      tbd: "À définir",
      departure: "Départ  : {{date}}",
      duration: "Durée   : {{n}} nuit(s)",
      adults: "Adultes : {{n}}",
      children: "Enfants : {{n}}",
      name: "Nom      : {{name}}",
      phone: "Tél      : {{phone}}",
      email: "Email    : {{email}}",
      empty_field: "—",
      reqs: "\nDemandes spéciales : {{reqs}}",
      footer: "\nMerci de confirmer la disponibilité."
    }
  }
};

const enAdd = {
  accommodations: {
    hero: {
      subtitle: "Our Spaces",
      title: "Sea View Apartments & Studios in Lomé, Togo",
      desc: "4 types of furnished, air-conditioned apartments with free WiFi and direct beach access."
    },
    amenities: {
      subtitle: "All inclusive",
      title: "Amenities & Services",
      items: {
        wifi: "Free WiFi",
        ac: "Air Conditioning",
        tv: "Satellite TV + Canal+",
        breakfast: "Breakfast available",
        parking: "Free Private Parking",
        shuttle: "Airport Shuttle (on request)",
        beach: "Beach Access",
        pool: "Swimming Pool",
        bar: "Cocktail Bar",
        restaurant: "On-site Restaurant"
      }
    },
    category: {
      back: "Back to categories",
      desc: "Discover in detail all our {{category}} rooms.",
      not_found: "Category Not Found",
      back_link: "Back to accommodations",
      empty: "No rooms currently configured for this category.",
      why_title: "Why stay in our {{category}} in Lomé?",
      why_p1: "TOGOLIVING Residence offers you a unique experience in Lomé. By booking one of our <strong>{{category}}</strong>, you not only enjoy optimal comfort with modern amenities (air conditioning, high-speed WiFi, smart TV), but also a privileged location in the peaceful neighborhood of Kpogan Agbetsiko.",
      why_p2: "<strong>An exceptional environment:</strong> Located just 100 meters from the natural beach, our seaside residence offers quick access to the Atlantic Ocean. Our guests particularly appreciate morning walks on the beach and spectacular sunsets from our panoramic pool.",
      why_p3: "<strong>Services and Amenities:</strong> Staying with us means enjoying quality hotel services (regular cleaning, 24/7 security) while keeping the independence of an apartment. You will have access to our restaurant offering world flavors, as well as our leisure areas including a children's play area and billiards.",
      review: "An unforgettable stay! The {{category}} was impeccably clean, spacious, and ideally located facing the sea. The staff is very caring and the restaurant offers excellent dishes. We will definitely come back.",
      review_author: "— Customer Review, Verified Traveler",
      media_preview: "Preview",
      loading: "Loading...",
      no_media: "No media",
      video_badge: "▶ Video",
      capacity: "Capacity & Space: {{capacity}}",
      price_request: "Price on request",
      per_night: "/ night",
      per_month: "/ month",
      description_title: "Description",
      amenities_title: "Amenities",
      amenities_more: "+ {{count}} more",
      show_more: "Show all details",
      show_less: "Show fewer details",
      book_room: "Book this room",
      unavailable: "Currently unavailable"
    }
  },
  booking: {
    hero: {
      subtitle: "Booking",
      title: "Confirm Your Stay",
      desc: "Fast confirmation via WhatsApp · No online payment"
    },
    steps: {
      s1: "Accommodation",
      s2: "Stay & Guests",
      s3: "Contact Info",
      s4: "Summary"
    },
    step1: {
      title: "Choose accommodation",
      app_type: "Apartment type",
      room_cat: "Room category",
      full: "Full",
      available: "Available: N° {{rooms}}",
      per_night: "/night",
      per_month: "/month",
      desired_room: "Desired room",
      optional: "(optional)",
      no_pref: "No preference",
      room_n: "Room N° {{n}}"
    },
    step2: {
      title: "Dates & Guests",
      stay_type: "Type of stay",
      by_night: "By night",
      by_month: "By month",
      arrival: "Check-in",
      departure: "Check-out",
      duration_est: "Estimated duration",
      nights: "{{count}} night",
      nights_plural: "{{count}} nights",
      adults: "Adults",
      children: "Children",
      special_req: "Special requests",
      req_placeholder: "Sea view desired, baby cot, airport transfer...",
      price_est: "Estimated price"
    },
    step3: {
      title: "Your details",
      name: "Full name *",
      name_placeholder: "First and Last Name",
      phone: "Phone / WhatsApp *",
      email: "Email",
      time: "Expected arrival time"
    },
    step4: {
      title: "Summary",
      chosen_room: "Chosen accommodation",
      type: "Type",
      category: "Category",
      room: "Room",
      stay: "Stay",
      occupants: "Guests",
      adult: "adult",
      adult_plural: "adults",
      child: "child",
      child_plural: "children",
      contact: "Contact Details",
      disclaimer: "By clicking confirm, you will be redirected to WhatsApp to finalize your booking with the TOGOLIVING team.",
      back: "Back",
      next: "Next",
      confirm: "Confirm via WhatsApp"
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know before booking.",
      q1: "What is the cancellation policy?",
      a1: "Cancellations are free up to 48 hours before the scheduled arrival date. After this time, the first night will be charged.",
      q2: "Is there an airport shuttle?",
      a2: "Yes, we offer a VIP airport shuttle service on request. Please indicate this in the \"Special requests\" section when booking.",
      q3: "Are pets allowed?",
      a3: "To ensure the comfort of all our guests, pets are unfortunately not allowed in the residence."
    },
    msg: {
      greeting: "Hello TOGOLIVING,\n═══ NEW BOOKING REQUEST ═══\n",
      room: "Accommodation : {{category}} — {{variant}}",
      room_num: "Room N° {{n}}",
      room_any: "An available room of category {{variant}}",
      price: "Estimated price : {{price}}",
      arrival: "Check-in : {{date}} at {{time}}",
      tbd: "To be determined",
      departure: "Check-out  : {{date}}",
      duration: "Duration   : {{n}} night(s)",
      adults: "Adults : {{n}}",
      children: "Children : {{n}}",
      name: "Name      : {{name}}",
      phone: "Phone      : {{phone}}",
      email: "Email    : {{email}}",
      empty_field: "—",
      reqs: "\nSpecial requests : {{reqs}}",
      footer: "\nPlease confirm availability."
    }
  }
};

const deAdd = {
  accommodations: {
    hero: {
      subtitle: "Unsere Räume",
      title: "Meerblick Apartments & Studios in Lomé, Togo",
      desc: "4 Arten von möblierten, klimatisierten Apartments mit kostenlosem WLAN und direktem Strandzugang."
    },
    amenities: {
      subtitle: "Alles inklusive",
      title: "Ausstattung & Services",
      items: {
        wifi: "Kostenloses WLAN",
        ac: "Klimaanlage",
        tv: "Satelliten-TV + Canal+",
        breakfast: "Frühstück verfügbar",
        parking: "Kostenloser Privatparkplatz",
        shuttle: "Flughafentransfer (auf Anfrage)",
        beach: "Strandzugang",
        pool: "Schwimmbad",
        bar: "Cocktailbar",
        restaurant: "Vor-Ort-Restaurant"
      }
    },
    category: {
      back: "Zurück zu den Kategorien",
      desc: "Entdecken Sie im Detail alle unsere {{category}} Zimmer.",
      not_found: "Kategorie nicht gefunden",
      back_link: "Zurück zu den Unterkünften",
      empty: "Für diese Kategorie sind derzeit keine Zimmer konfiguriert.",
      why_title: "Warum in unseren {{category}} in Lomé übernachten?",
      why_p1: "Die TOGOLIVING Residence bietet Ihnen ein einzigartiges Erlebnis in Lomé. Wenn Sie eines unserer <strong>{{category}}</strong> buchen, genießen Sie nicht nur optimalen Komfort mit modernen Annehmlichkeiten (Klimaanlage, Highspeed-WLAN, Smart-TV), sondern auch eine privilegierte Lage im ruhigen Viertel Kpogan Agbetsiko.",
      why_p2: "<strong>Eine außergewöhnliche Umgebung:</strong> Unsere Strandresidenz liegt nur 100 Meter vom Naturstrand entfernt und bietet schnellen Zugang zum Atlantischen Ozean. Unsere Gäste schätzen besonders die morgendlichen Strandspaziergänge und die spektakulären Sonnenuntergänge von unserem Panorama-Pool.",
      why_p3: "<strong>Dienstleistungen und Annehmlichkeiten:</strong> Bei uns zu übernachten bedeutet, hochwertige Hoteldienstleistungen (regelmäßige Reinigung, 24/7-Sicherheit) zu genießen und gleichzeitig die Unabhängigkeit eines Apartments zu behalten. Sie haben Zugang zu unserem Restaurant mit weltweiten Aromen sowie zu unseren Freizeitbereichen, einschließlich eines Kinderspielplatzes und Billard.",
      review: "Ein unvergesslicher Aufenthalt! Das {{category}} war makellos sauber, geräumig und ideal am Meer gelegen. Das Personal ist sehr aufmerksam und das Restaurant bietet ausgezeichnete Gerichte. Wir werden auf jeden Fall wiederkommen.",
      review_author: "— Kundenbewertung, Verifizierter Reisender",
      media_preview: "Vorschau",
      loading: "Laden...",
      no_media: "Keine Medien",
      video_badge: "▶ Video",
      capacity: "Kapazität & Raum: {{capacity}}",
      price_request: "Preis auf Anfrage",
      per_night: "/ Nacht",
      per_month: "/ Monat",
      description_title: "Beschreibung",
      amenities_title: "Ausstattung",
      amenities_more: "+ {{count}} weitere",
      show_more: "Alle Details anzeigen",
      show_less: "Weniger Details anzeigen",
      book_room: "Dieses Zimmer buchen",
      unavailable: "Derzeit nicht verfügbar"
    }
  },
  booking: {
    hero: {
      subtitle: "Buchung",
      title: "Bestätigen Sie Ihren Aufenthalt",
      desc: "Schnelle Bestätigung per WhatsApp · Keine Online-Zahlung"
    },
    steps: {
      s1: "Unterkunft",
      s2: "Aufenthalt & Gäste",
      s3: "Kontaktdaten",
      s4: "Zusammenfassung"
    },
    step1: {
      title: "Unterkunft wählen",
      app_type: "Apartmenttyp",
      room_cat: "Zimmerkategorie",
      full: "Ausgebucht",
      available: "Verfügbar: N° {{rooms}}",
      per_night: "/Nacht",
      per_month: "/Monat",
      desired_room: "Gewünschtes Zimmer",
      optional: "(optional)",
      no_pref: "Keine Präferenz",
      room_n: "Zimmer N° {{n}}"
    },
    step2: {
      title: "Daten & Gäste",
      stay_type: "Art des Aufenthalts",
      by_night: "Pro Nacht",
      by_month: "Pro Monat",
      arrival: "Anreise",
      departure: "Abreise",
      duration_est: "Geschätzte Dauer",
      nights: "{{count}} Nacht",
      nights_plural: "{{count}} Nächte",
      adults: "Erwachsene",
      children: "Kinder",
      special_req: "Sonderwünsche",
      req_placeholder: "Meerblick erwünscht, Babybett, Flughafentransfer...",
      price_est: "Geschätzter Preis"
    },
    step3: {
      title: "Ihre Daten",
      name: "Vollständiger Name *",
      name_placeholder: "Vorname und Nachname",
      phone: "Telefon / WhatsApp *",
      email: "E-Mail",
      time: "Voraussichtliche Ankunftszeit"
    },
    step4: {
      title: "Zusammenfassung",
      chosen_room: "Gewählte Unterkunft",
      type: "Typ",
      category: "Kategorie",
      room: "Zimmer",
      stay: "Aufenthalt",
      occupants: "Gäste",
      adult: "Erwachsener",
      adult_plural: "Erwachsene",
      child: "Kind",
      child_plural: "Kinder",
      contact: "Kontaktdaten",
      disclaimer: "Durch Klicken auf Bestätigen werden Sie zu WhatsApp weitergeleitet, um Ihre Buchung mit dem TOGOLIVING-Team abzuschließen.",
      back: "Zurück",
      next: "Weiter",
      confirm: "Per WhatsApp bestätigen"
    },
    faq: {
      title: "Häufig gestellte Fragen",
      subtitle: "Alles, was Sie vor der Buchung wissen müssen.",
      q1: "Wie lauten die Stornierungsbedingungen?",
      a1: "Stornierungen sind bis zu 48 Stunden vor dem geplanten Anreisedatum kostenlos. Nach dieser Zeit wird die erste Nacht in Rechnung gestellt.",
      q2: "Gibt es einen Flughafentransfer?",
      a2: "Ja, wir bieten auf Anfrage einen VIP-Flughafentransfer an. Bitte geben Sie dies bei der Buchung unter \"Sonderwünsche\" an.",
      q3: "Sind Haustiere erlaubt?",
      a3: "Um den Komfort all unserer Gäste zu gewährleisten, sind Haustiere in der Residenz leider nicht gestattet."
    },
    msg: {
      greeting: "Hallo TOGOLIVING,\n═══ NEUE BUCHUNGSANFRAGE ═══\n",
      room: "Unterkunft : {{category}} — {{variant}}",
      room_num: "Zimmer N° {{n}}",
      room_any: "Ein verfügbares Zimmer der Kategorie {{variant}}",
      price: "Geschätzter Preis : {{price}}",
      arrival: "Anreise : {{date}} um {{time}}",
      tbd: "Noch festzulegen",
      departure: "Abreise  : {{date}}",
      duration: "Dauer   : {{n}} Nacht(Nächte)",
      adults: "Erwachsene : {{n}}",
      children: "Kinder : {{n}}",
      name: "Name      : {{name}}",
      phone: "Telefon      : {{phone}}",
      email: "E-Mail    : {{email}}",
      empty_field: "—",
      reqs: "\nSonderwünsche : {{reqs}}",
      footer: "\nBitte bestätigen Sie die Verfügbarkeit."
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

console.log("Updated locale files for Lot 2");
