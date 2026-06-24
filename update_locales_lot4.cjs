const fs = require('fs');
const path = require('path');

const frAdd = {
  about: {
    hero: {
      subtitle: "A Propos",
      title: "TOGOLIVING",
      desc: "Votre Résidence Balnéaire au Togo",
      badge: "Hôtel Classé 4 Étoiles"
    },
    intro: {
      p1: "Offrant une vue sur la ville, l'établissement <strong>Résidence Togoliving</strong> — classé <strong>Hôtel 4 Étoiles</strong> — se trouve à Toudji, très bien situé au bord du goudron National N2 et à seulement 100 m de la plage naturelle. Kpogan est un quartier calme, situé sur la route nationale menant du Bénin au Ghana, près du marché d'Agbavi.",
      p2: "Il propose un <strong>restaurant</strong>, un <strong>service d'étage</strong>, un <strong>bar</strong>, un <strong>jardin</strong> et une <strong>terrasse</strong>. Il propose gratuitement une connexion Wi-Fi rapide (516 Mb/s) et un parking privé. L'établissement sert un petit-déjeuner continental ou américain tous les matins.",
      p3: "Chaque hébergement comprend une salle de bains privative avec une douche, la climatisation, une télévision à écran plat et un réfrigérateur. L'établissement se situe à 17 km de l'Aéroport international de Lomé-Tokoin et propose un service de navette aéroport (en supplément).",
      p4: "Code Postal : <strong>36BP50</strong> — Kpogan Agbetsiko, Lomé, Togo"
    },
    stats: {
      city: "du centre-ville",
      beach: "de la plage",
      types: "types d'hébergement",
      airport: "de l'aéroport"
    },
    essentials: {
      subtitle: "Les essentiels",
      title: "Points Forts de l'Établissement",
      p1: "Piscine extérieure avec vue",
      p2: "Restaurant (Cuisine variée)",
      p3: "Connexion Wi-Fi gratuite (516 Mb/s)",
      p4: "Parking privé gratuit sur place",
      p5: "Chambres familiales et non-fumeurs",
      p6: "Navette aéroport",
      p7: "Service d'étage & Bar",
      p8: "Petit-déjeuner inclus"
    },
    facilities: {
      title: "Équipements et Services",
      general: "Général",
      g1: "• Climatisation dans tous les hébergements",
      g2: "• Établissement entièrement non-fumeurs",
      g3: "• Sécurité 24h/24 & Caméras de surveillance",
      g4: "• Extincteurs & Détecteurs de fumée",
      g5: "• Service de ménage quotidien (en supplément)",
      g6: "• Bureau d'excursions & Enregistrement rapide",
      outdoor: "Extérieur & Activités",
      o1: "• Plage naturelle à 100m",
      o2: "• Jardin, Terrasse bien exposée & Patio",
      o3: "• Installations pour barbecue (en supplément)",
      o4: "• Piscine avec vue et bar dans la piscine",
      o5: "• Chaises longues et parasols",
      o6: "• Balades à pied (en supplément)",
      food: "Restauration & Boissons",
      f1: "• Restaurant Living’s (africaine, française, etc.)",
      f2: "• Café sur place & Snack-bar",
      f3: "• Menus enfants (en supplément)",
      f4: "• Vin/champagne (en supplément)",
      f5: "• Petit-déjeuner en chambre",
      f6: "• Supérette sur place"
    },
    license: {
      title: "Classement Officiel",
      desc: "Résidence Togoliving — Hôtel classé 4 Étoiles"
    },
    values: {
      subtitle: "Nos Valeurs",
      title: "Pourquoi nous choisir",
      v1_title: "Accueil Chaleureux",
      v1_desc: "Une équipe disponible 24h/24 pour votre confort et un service personnalisé.",
      v2_title: "Cadre Unique",
      v2_desc: "Vue mer, piscine et plage naturelle en un seul lieu.",
      v3_title: "Confort & Sécurité",
      v3_desc: "Appartements meublés, parking privé sécurisé 24h/24, WiFi ultra-rapide."
    }
  },
  careers: {
    hero: {
      subtitle: "Recrutement",
      title: "Rejoignez l'Aventure",
      desc: "Faites carrière au sein d'une équipe passionnée par l'excellence et l'hospitalité. Découvrez nos opportunités et grandissez avec nous."
    },
    philosophy: {
      subtitle: "Pourquoi TOGOLIVING ?",
      title: "Notre Philosophie Employeur",
      v1_title: "Esprit de Famille",
      v1_desc: "Nous cultivons un environnement de travail bienveillant où le respect mutuel et l'entraide sont primordiaux.",
      v2_title: "Évolution Rapide",
      v2_desc: "Nous privilégions la promotion interne et l'accompagnement de nos talents vers des postes à responsabilité.",
      v3_title: "Excellence & Formation",
      v3_desc: "Nous offrons des formations continues pour maintenir nos standards élevés dans l'hôtellerie de luxe."
    },
    jobs: {
      subtitle: "Opportunités Actuelles",
      title: "Postes à Pourvoir",
      spontaneous: "Candidature Spontanée",
      empty: "Aucun poste n'est actuellement ouvert. N'hésitez pas à envoyer une candidature spontanée !",
      apply: "Postuler"
    },
    process: {
      title: "Processus de Recrutement",
      s1: "Envoi du CV & Lettre",
      s2: "Entretien Téléphonique",
      s3: "Entretien Physique",
      s4: "Intégration"
    },
    form: {
      title: "Postuler",
      subtitle: "Candidature Spontanée",
      success_title: "Candidature Envoyée !",
      success_desc: "Nous avons bien reçu votre candidature. Notre équipe des ressources humaines reviendra vers vous très vite.",
      personal: "Informations Personnelles",
      name: "Nom Complet",
      name_placeholder: "Ex: Jean Dupont",
      email: "Adresse Email",
      email_placeholder: "jean.dupont@email.com",
      phone: "Numéro de Téléphone",
      phone_placeholder: "+228 XX XX XX XX",
      message_title: "Message / Motivation",
      message_label: "Présentez-vous brièvement",
      message_placeholder: "Quelles sont vos motivations pour rejoindre l'équipe TOGOLIVING ?",
      cv_title: "Curriculum Vitae (CV)",
      cv_change: "Cliquez pour changer de fichier",
      cv_upload: "Cliquez ou glissez votre CV ici",
      cv_format: "Format accepté : PDF (Max 5MB)",
      back: "Retour",
      next: "Suivant",
      confirm: "Confirmer l'envoi"
    }
  },
  contact: {
    hero: {
      subtitle: "Contact",
      title: "Parlons de votre Séjour"
    },
    info: {
      title: "Nos Coordonnées",
      open: "Ouvert 24h/24, 7j/7"
    },
    form: {
      title: "Envoyez un Message",
      name: "Nom complet",
      email: "Email",
      subject: "Objet",
      message: "Message",
      send: "Envoyer via WhatsApp",
      s1: "Réservation",
      s2: "Renseignements",
      s3: "Événement",
      s4: "Autre"
    },
    msg: {
      greeting: "Bonjour TOGOLIVING,",
      name: "Nom:",
      email: "Email:",
      subject: "Objet:",
      message: "Message:"
    }
  }
};

const enAdd = {
  about: {
    hero: {
      subtitle: "About Us",
      title: "TOGOLIVING",
      desc: "Your Seaside Residence in Togo",
      badge: "4-Star Rated Hotel"
    },
    intro: {
      p1: "Offering a view of the city, the <strong>Togoliving Residence</strong> — rated <strong>4-Star Hotel</strong> — is located in Toudji, perfectly situated along the National N2 road and only 100m from the natural beach. Kpogan is a quiet neighborhood, located on the national road leading from Benin to Ghana, near the Agbavi market.",
      p2: "It offers a <strong>restaurant</strong>, <strong>room service</strong>, a <strong>bar</strong>, a <strong>garden</strong>, and a <strong>terrace</strong>. It provides free fast Wi-Fi (516 Mbps) and private parking. The property serves a continental or American breakfast every morning.",
      p3: "Each accommodation includes a private bathroom with a shower, air conditioning, a flat-screen TV, and a refrigerator. The property is located 17 km from Lomé-Tokoin International Airport and offers an airport shuttle service (for a fee).",
      p4: "Postal Code: <strong>36BP50</strong> — Kpogan Agbetsiko, Lomé, Togo"
    },
    stats: {
      city: "from downtown",
      beach: "from the beach",
      types: "accommodation types",
      airport: "from the airport"
    },
    essentials: {
      subtitle: "The essentials",
      title: "Property Highlights",
      p1: "Outdoor pool with view",
      p2: "Restaurant (Varied cuisine)",
      p3: "Free Wi-Fi connection (516 Mbps)",
      p4: "Free private parking on site",
      p5: "Family and non-smoking rooms",
      p6: "Airport shuttle",
      p7: "Room service & Bar",
      p8: "Breakfast included"
    },
    facilities: {
      title: "Facilities and Services",
      general: "General",
      g1: "• Air conditioning in all accommodations",
      g2: "• Entirely non-smoking property",
      g3: "• 24/7 Security & Surveillance cameras",
      g4: "• Fire extinguishers & Smoke detectors",
      g5: "• Daily housekeeping service (extra charge)",
      g6: "• Tour desk & Express check-in",
      outdoor: "Outdoors & Activities",
      o1: "• Natural beach 100m away",
      o2: "• Garden, Sun terrace & Patio",
      o3: "• BBQ facilities (extra charge)",
      o4: "• Pool with a view and pool bar",
      o5: "• Sun loungers and umbrellas",
      o6: "• Walking tours (extra charge)",
      food: "Food & Drink",
      f1: "• Living’s Restaurant (African, French, etc.)",
      f2: "• On-site coffee house & Snack bar",
      f3: "• Kids' meals (extra charge)",
      f4: "• Wine/champagne (extra charge)",
      f5: "• Breakfast in the room",
      f6: "• On-site mini-market"
    },
    license: {
      title: "Official Classification",
      desc: "Togoliving Residence — 4-Star Rated Hotel"
    },
    values: {
      subtitle: "Our Values",
      title: "Why choose us",
      v1_title: "Warm Welcome",
      v1_desc: "A team available 24/7 for your comfort and personalized service.",
      v2_title: "Unique Setting",
      v2_desc: "Sea view, pool, and natural beach all in one place.",
      v3_title: "Comfort & Security",
      v3_desc: "Furnished apartments, secure private parking 24/7, ultra-fast WiFi."
    }
  },
  careers: {
    hero: {
      subtitle: "Careers",
      title: "Join the Adventure",
      desc: "Build a career within a team passionate about excellence and hospitality. Discover our opportunities and grow with us."
    },
    philosophy: {
      subtitle: "Why TOGOLIVING?",
      title: "Our Employer Philosophy",
      v1_title: "Family Spirit",
      v1_desc: "We cultivate a caring work environment where mutual respect and support are paramount.",
      v2_title: "Fast Evolution",
      v2_desc: "We favor internal promotion and supporting our talents towards management positions.",
      v3_title: "Excellence & Training",
      v3_desc: "We offer continuous training to maintain our high standards in luxury hospitality."
    },
    jobs: {
      subtitle: "Current Opportunities",
      title: "Open Positions",
      spontaneous: "Spontaneous Application",
      empty: "No positions are currently open. Feel free to send a spontaneous application!",
      apply: "Apply"
    },
    process: {
      title: "Recruitment Process",
      s1: "Send CV & Letter",
      s2: "Phone Interview",
      s3: "Physical Interview",
      s4: "Integration"
    },
    form: {
      title: "Apply",
      subtitle: "Spontaneous Application",
      success_title: "Application Sent!",
      success_desc: "We have received your application. Our human resources team will get back to you very soon.",
      personal: "Personal Information",
      name: "Full Name",
      name_placeholder: "e.g. John Doe",
      email: "Email Address",
      email_placeholder: "john.doe@email.com",
      phone: "Phone Number",
      phone_placeholder: "+228 XX XX XX XX",
      message_title: "Message / Motivation",
      message_label: "Introduce yourself briefly",
      message_placeholder: "What are your motivations for joining the TOGOLIVING team?",
      cv_title: "Curriculum Vitae (CV)",
      cv_change: "Click to change file",
      cv_upload: "Click or drag your CV here",
      cv_format: "Accepted format: PDF (Max 5MB)",
      back: "Back",
      next: "Next",
      confirm: "Confirm submission"
    }
  },
  contact: {
    hero: {
      subtitle: "Contact",
      title: "Let's Talk About Your Stay"
    },
    info: {
      title: "Our Contact Info",
      open: "Open 24/7"
    },
    form: {
      title: "Send a Message",
      name: "Full Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Send via WhatsApp",
      s1: "Reservation",
      s2: "Information",
      s3: "Event",
      s4: "Other"
    },
    msg: {
      greeting: "Hello TOGOLIVING,",
      name: "Name:",
      email: "Email:",
      subject: "Subject:",
      message: "Message:"
    }
  }
};

const deAdd = {
  about: {
    hero: {
      subtitle: "Über uns",
      title: "TOGOLIVING",
      desc: "Ihre Strandresidenz in Togo",
      badge: "4-Sterne-Hotel"
    },
    intro: {
      p1: "Die <strong>Togoliving Residence</strong> — bewertet als <strong>4-Sterne-Hotel</strong> — bietet einen Blick auf die Stadt und befindet sich in Toudji, perfekt gelegen an der Nationalstraße N2 und nur 100 m vom Naturstrand entfernt. Kpogan ist ein ruhiges Viertel an der Nationalstraße von Benin nach Ghana, in der Nähe des Agbavi-Marktes.",
      p2: "Es bietet ein <strong>Restaurant</strong>, <strong>Zimmerservice</strong>, eine <strong>Bar</strong>, einen <strong>Garten</strong> und eine <strong>Terrasse</strong>. Es bietet kostenloses, schnelles WLAN (516 Mbit/s) und Privatparkplätze. Die Unterkunft serviert jeden Morgen ein kontinentales oder amerikanisches Frühstück.",
      p3: "Jede Unterkunft verfügt über ein eigenes Bad mit Dusche, Klimaanlage, Flachbild-TV und Kühlschrank. Die Unterkunft befindet sich 17 km vom internationalen Flughafen Lomé-Tokoin entfernt und bietet einen Flughafentransfer (gegen Gebühr).",
      p4: "Postleitzahl: <strong>36BP50</strong> — Kpogan Agbetsiko, Lomé, Togo"
    },
    stats: {
      city: "vom Stadtzentrum",
      beach: "vom Strand",
      types: "Unterkunftsarten",
      airport: "vom Flughafen"
    },
    essentials: {
      subtitle: "Das Wesentliche",
      title: "Highlights der Unterkunft",
      p1: "Außenpool mit Aussicht",
      p2: "Restaurant (Vielfältige Küche)",
      p3: "Kostenlose WLAN-Verbindung (516 Mbit/s)",
      p4: "Kostenlose Privatparkplätze vor Ort",
      p5: "Familien- und Nichtraucherzimmer",
      p6: "Flughafentransfer",
      p7: "Zimmerservice & Bar",
      p8: "Frühstück inbegriffen"
    },
    facilities: {
      title: "Einrichtungen und Dienstleistungen",
      general: "Allgemein",
      g1: "• Klimaanlage in allen Unterkünften",
      g2: "• Komplett rauchfreie Unterkunft",
      g3: "• 24/7 Sicherheit & Überwachungskameras",
      g4: "• Feuerlöscher & Rauchmelder",
      g5: "• Täglicher Reinigungsservice (gegen Aufpreis)",
      g6: "• Tourenschalter & Express-Check-in",
      outdoor: "Draußen & Aktivitäten",
      o1: "• Naturstrand in 100m Entfernung",
      o2: "• Garten, Sonnenterrasse & Innenhof",
      o3: "• Grillmöglichkeiten (gegen Aufpreis)",
      o4: "• Pool mit Aussicht und Poolbar",
      o5: "• Sonnenliegen und Sonnenschirme",
      o6: "• Wandertouren (gegen Aufpreis)",
      food: "Speisen & Getränke",
      f1: "• Living’s Restaurant (Afrikanisch, Französisch, etc.)",
      f2: "• Café vor Ort & Snackbar",
      f3: "• Kindermenüs (gegen Aufpreis)",
      f4: "• Wein/Champagner (gegen Aufpreis)",
      f5: "• Frühstück auf dem Zimmer",
      f6: "• Minimarkt vor Ort"
    },
    license: {
      title: "Offizielle Klassifizierung",
      desc: "Togoliving Residence — 4-Sterne-Hotel"
    },
    values: {
      subtitle: "Unsere Werte",
      title: "Warum uns wählen",
      v1_title: "Herzlicher Empfang",
      v1_desc: "Ein Team, das 24/7 für Ihren Komfort und persönlichen Service zur Verfügung steht.",
      v2_title: "Einzigartige Umgebung",
      v2_desc: "Meerblick, Pool und Naturstrand an einem Ort.",
      v3_title: "Komfort & Sicherheit",
      v3_desc: "Möblierte Apartments, sicherer Privatparkplatz 24/7, ultraschnelles WiFi."
    }
  },
  careers: {
    hero: {
      subtitle: "Karriere",
      title: "Nehmen Sie am Abenteuer teil",
      desc: "Machen Sie Karriere in einem Team, das sich für Exzellenz und Gastfreundschaft begeistert. Entdecken Sie unsere Möglichkeiten und wachsen Sie mit uns."
    },
    philosophy: {
      subtitle: "Warum TOGOLIVING?",
      title: "Unsere Arbeitgeberphilosophie",
      v1_title: "Familiengeist",
      v1_desc: "Wir pflegen ein fürsorgliches Arbeitsumfeld, in dem gegenseitiger Respekt und Unterstützung an erster Stelle stehen.",
      v2_title: "Schnelle Entwicklung",
      v2_desc: "Wir bevorzugen die interne Beförderung und unterstützen unsere Talente auf dem Weg in Führungspositionen.",
      v3_title: "Exzellenz & Ausbildung",
      v3_desc: "Wir bieten kontinuierliche Schulungen an, um unsere hohen Standards in der Luxushotellerie aufrechtzuerhalten."
    },
    jobs: {
      subtitle: "Aktuelle Möglichkeiten",
      title: "Offene Stellen",
      spontaneous: "Spontane Bewerbung",
      empty: "Derzeit sind keine Stellen offen. Senden Sie uns gerne eine Initiativbewerbung!",
      apply: "Bewerben"
    },
    process: {
      title: "Rekrutierungsprozess",
      s1: "CV & Anschreiben senden",
      s2: "Telefoninterview",
      s3: "Persönliches Gespräch",
      s4: "Integration"
    },
    form: {
      title: "Bewerben",
      subtitle: "Spontane Bewerbung",
      success_title: "Bewerbung gesendet!",
      success_desc: "Wir haben Ihre Bewerbung erhalten. Unser Personalteam wird sich in Kürze bei Ihnen melden.",
      personal: "Persönliche Daten",
      name: "Vollständiger Name",
      name_placeholder: "z.B. Max Mustermann",
      email: "E-Mail-Adresse",
      email_placeholder: "max.mustermann@email.com",
      phone: "Telefonnummer",
      phone_placeholder: "+228 XX XX XX XX",
      message_title: "Nachricht / Motivation",
      message_label: "Stellen Sie sich kurz vor",
      message_placeholder: "Was sind Ihre Motivationen, dem TOGOLIVING-Team beizutreten?",
      cv_title: "Lebenslauf (CV)",
      cv_change: "Klicken, um die Datei zu ändern",
      cv_upload: "Klicken oder ziehen Sie Ihren Lebenslauf hierher",
      cv_format: "Akzeptiertes Format: PDF (Max 5MB)",
      back: "Zurück",
      next: "Weiter",
      confirm: "Versand bestätigen"
    }
  },
  contact: {
    hero: {
      subtitle: "Kontakt",
      title: "Sprechen wir über Ihren Aufenthalt"
    },
    info: {
      title: "Unsere Kontaktdaten",
      open: "Rund um die Uhr geöffnet"
    },
    form: {
      title: "Nachricht senden",
      name: "Vollständiger Name",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      send: "Über WhatsApp senden",
      s1: "Reservierung",
      s2: "Informationen",
      s3: "Ereignis",
      s4: "Andere"
    },
    msg: {
      greeting: "Hallo TOGOLIVING,",
      name: "Name:",
      email: "E-Mail:",
      subject: "Betreff:",
      message: "Nachricht:"
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

console.log("Updated locale files for Lot 4");
