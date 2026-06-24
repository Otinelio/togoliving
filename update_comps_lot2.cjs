const fs = require('fs');

const file1 = 'src/routes/hebergements.tsx';
let content1 = fs.readFileSync(file1, 'utf8');
content1 = content1.replace(
  'import { createFileRoute, Link } from "@tanstack/react-router";',
  'import { createFileRoute, Link } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content1 = content1.replace('function Page() {', 'function Page() {\n  const { t } = useTranslation();');
content1 = content1.replace('>Nos Espaces<', '>{t("accommodations.hero.subtitle")}<');
content1 = content1.replace('>Appartements & Studios Vue Mer à Lomé, Togo<', '>{t("accommodations.hero.title")}<');
content1 = content1.replace('>4 types d\'appartements meublés, climatisés, avec WiFi gratuit et accès direct à la plage.<', '>{t("accommodations.hero.desc")}<');
content1 = content1.replace('>Tout inclus<', '>{t("accommodations.amenities.subtitle")}<');
content1 = content1.replace('>Equipements & Services<', '>{t("accommodations.amenities.title")}<');

// Amenities mapping in hebergements.tsx
content1 = content1.replace(
  '{ icon: Wifi, label: "WiFi Gratuit" }',
  '{ icon: Wifi, label: t("accommodations.amenities.items.wifi") }'
);
content1 = content1.replace(
  '{ icon: Wind, label: "Climatisation" }',
  '{ icon: Wind, label: t("accommodations.amenities.items.ac") }'
);
content1 = content1.replace(
  '{ icon: Tv, label: "TV Satellite + Canal+" }',
  '{ icon: Tv, label: t("accommodations.amenities.items.tv") }'
);
content1 = content1.replace(
  '{ icon: Coffee, label: "Petit-dejeuner disponible" }',
  '{ icon: Coffee, label: t("accommodations.amenities.items.breakfast") }'
);
content1 = content1.replace(
  '{ icon: Car, label: "Parking Prive Gratuit" }',
  '{ icon: Car, label: t("accommodations.amenities.items.parking") }'
);
content1 = content1.replace(
  '{ icon: Plane, label: "Navette Aeroport (sur demande)" }',
  '{ icon: Plane, label: t("accommodations.amenities.items.shuttle") }'
);
content1 = content1.replace(
  '{ icon: Waves, label: "Acces Plage" }',
  '{ icon: Waves, label: t("accommodations.amenities.items.beach") }'
);
content1 = content1.replace(
  '{ icon: Droplets, label: "Piscine" }',
  '{ icon: Droplets, label: t("accommodations.amenities.items.pool") }'
);
content1 = content1.replace(
  '{ icon: GlassWater, label: "Cocktail Bar" }',
  '{ icon: GlassWater, label: t("accommodations.amenities.items.bar") }'
);
content1 = content1.replace(
  '{ icon: UtensilsCrossed, label: "Restaurant sur place" }',
  '{ icon: UtensilsCrossed, label: t("accommodations.amenities.items.restaurant") }'
);

// We need to inject t into amenities array definition since it's outside. So we move it inside Page() or just replace label inline.
content1 = content1.replace(
  'const amenities = [',
  '// amenities array moved inside component'
);
content1 = content1.replace(
  'function Page() {\n  const { t } = useTranslation();',
  `function Page() {\n  const { t } = useTranslation();\n  const amenities = [\n    { icon: Wifi, label: t("accommodations.amenities.items.wifi") },\n    { icon: Wind, label: t("accommodations.amenities.items.ac") },\n    { icon: Tv, label: t("accommodations.amenities.items.tv") },\n    { icon: Coffee, label: t("accommodations.amenities.items.breakfast") },\n    { icon: Car, label: t("accommodations.amenities.items.parking") },\n    { icon: Plane, label: t("accommodations.amenities.items.shuttle") },\n    { icon: Waves, label: t("accommodations.amenities.items.beach") },\n    { icon: Droplets, label: t("accommodations.amenities.items.pool") },\n    { icon: GlassWater, label: t("accommodations.amenities.items.bar") },\n    { icon: UtensilsCrossed, label: t("accommodations.amenities.items.restaurant") },\n  ];`
);

fs.writeFileSync(file1, content1);

const file2 = 'src/routes/hebergements_.$category.tsx';
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(
  'import { createFileRoute, Link, useParams } from "@tanstack/react-router";',
  'import { createFileRoute, Link, useParams } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content2 = content2.replace('function CategoryDetailsPage() {', 'function CategoryDetailsPage() {\n  const { t } = useTranslation();');
content2 = content2.replace('> Retour aux catégories<', '> {t("accommodations.category.back")}<');
content2 = content2.replace(
  '>Découvrez en détail toutes nos chambres de type {matchedCategory.title.toLowerCase()}.<',
  ' dangerouslySetInnerHTML={{ __html: t("accommodations.category.desc", { category: matchedCategory.title.toLowerCase() }) }} />'
);
content2 = content2.replace('>Catégorie Introuvable<', '>{t("accommodations.category.not_found")}<');
content2 = content2.replace('>Retour aux hébergements<', '>{t("accommodations.category.back_link")}<');
content2 = content2.replace(
  '>Aucune chambre configurée pour cette catégorie actuellement.<',
  '>{t("accommodations.category.empty")}<'
);
content2 = content2.replace(
  '>Pourquoi séjourner dans nos {matchedCategory.title.toLowerCase()} à Lomé ?<',
  ' dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_title", { category: matchedCategory.title.toLowerCase() }) }} />'
);
content2 = content2.replace(
  '>La Résidence TOGOLIVING vous propose une expérience unique à Lomé. En réservant l\'un de nos <strong>{matchedCategory.title.toLowerCase()}</strong>, vous bénéficiez non seulement d\'un confort optimal avec des équipements modernes (climatisation, WiFi très haut débit, smart TV), mais aussi d\'un emplacement privilégié dans le quartier paisible de Kpogan Agbetsiko.<',
  ' dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_p1", { category: matchedCategory.title.toLowerCase() }) }} />'
);
content2 = content2.replace(
  '><strong>Un environnement exceptionnel :</strong> Située à seulement 100 mètres de la plage naturelle, notre résidence balnéaire vous offre un accès rapide à l\'Océan Atlantique. Nos clients apprécient particulièrement les promenades matinales sur la plage et les couchers de soleil spectaculaires depuis notre piscine panoramique.<',
  ' dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_p2") }} />'
);
content2 = content2.replace(
  '><strong>Services et Commodités :</strong> Séjourner chez nous, c\'est profiter de services hôteliers de qualité (ménage régulier, sécurité 24/7) tout en gardant l\'indépendance d\'un appartement. Vous aurez accès à notre restaurant proposant des saveurs du monde, ainsi qu\'à nos espaces de loisirs incluant un espace jeux pour enfants et un billard.<',
  ' dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_p3") }} />'
);
content2 = content2.replace(
  '>"Un séjour inoubliable ! Le {matchedCategory.title.toLowerCase()} était d\'une propreté impeccable, spacieux et idéalement situé face à la mer. Le personnel est aux petits soins et le restaurant offre d\'excellents plats. Nous reviendrons sans hésiter."<',
  ' dangerouslySetInnerHTML={{ __html: t("accommodations.category.review", { category: matchedCategory.title.toLowerCase() }) }} />'
);
content2 = content2.replace(
  '>— Avis Client, Voyageur vérifié<',
  '>{t("accommodations.category.review_author")}<'
);
content2 = content2.replace(
  'function RoomCard({ room, matchedCategory }: { room: Room; matchedCategory: any }) {',
  'function RoomCard({ room, matchedCategory }: { room: Room; matchedCategory: any }) {\n  const { t } = useTranslation();'
);
content2 = content2.replace(
  '▶ Vidéo',
  '{t("accommodations.category.video_badge")}'
);
content2 = content2.replace(
  'Capacité & Espace : {room.capacity}',
  '{t("accommodations.category.capacity", { capacity: room.capacity })}'
);
content2 = content2.replace(
  '>Prix sur demande<',
  '>{t("accommodations.category.price_request")}<'
);
content2 = content2.replace(
  '>/ nuit<',
  '>{t("accommodations.category.per_night")}<'
);
content2 = content2.replace(
  '>/ mois<',
  '>{t("accommodations.category.per_month")}<'
);
content2 = content2.replace(
  '>Description<',
  '>{t("accommodations.category.description_title")}<'
);
content2 = content2.replace(
  '>Équipements<',
  '>{t("accommodations.category.amenities_title")}<'
);
content2 = content2.replace(
  '+ {parsedAmenities.length - 6} autres',
  '{t("accommodations.category.amenities_more", { count: parsedAmenities.length - 6 })}'
);
content2 = content2.replace(
  '> Voir moins de détails<',
  '> {t("accommodations.category.show_less")}<'
);
content2 = content2.replace(
  '> Voir tous les détails<',
  '> {t("accommodations.category.show_more")}<'
);
content2 = content2.replace(
  'Réserver cette chambre',
  '{t("accommodations.category.book_room")}'
);
content2 = content2.replace(
  'Non disponible actuellement',
  '{t("accommodations.category.unavailable")}'
);
fs.writeFileSync(file2, content2);


const file3 = 'src/routes/reserver.tsx';
let content3 = fs.readFileSync(file3, 'utf8');
content3 = content3.replace(
  'import { createFileRoute } from "@tanstack/react-router";',
  'import { createFileRoute } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content3 = content3.replace('function Page() {', 'function Page() {\n  const { t } = useTranslation();');
content3 = content3.replace('>Réservation<', '>{t("booking.hero.subtitle")}<');
content3 = content3.replace('>Confirmez votre Séjour<', '>{t("booking.hero.title")}<');
content3 = content3.replace('>Confirmation rapide via WhatsApp · Pas de paiement en ligne<', '>{t("booking.hero.desc")}<');

// STEPS
content3 = content3.replace('const STEPS = ["Hébergement", "Séjour & Occupants", "Coordonnées", "Récapitulatif"];', 'const STEPS = ["booking.steps.s1", "booking.steps.s2", "booking.steps.s3", "booking.steps.s4"];');
content3 = content3.replace('{s}', '{t(s as any)}');

// We also need to inject t into StepIndicator. 
content3 = content3.replace(
  'function StepIndicator({ step }: { step: number }) {',
  'function StepIndicator({ step }: { step: number }) {\n  const { t } = useTranslation();'
);

content3 = content3.replace('> Choisir l\'hébergement<', '> {t("booking.step1.title")}<');
content3 = content3.replace('> Dates & Occupants<', '> {t("booking.step2.title")}<');
content3 = content3.replace('> Vos coordonnées<', '> {t("booking.step3.title")}<');
content3 = content3.replace('> Récapitulatif<', '> {t("booking.step4.title")}<');
content3 = content3.replace('>Type d\'appartement<', '>{t("booking.step1.app_type")}<');
content3 = content3.replace('>Catégorie de chambre<', '>{t("booking.step1.room_cat")}<');
content3 = content3.replace('>Complet<', '>{t("booking.step1.full")}<');
content3 = content3.replace('>Disponibles : N° {available.join(", ")}<', '>{t("booking.step1.available", { rooms: available.join(", ") })}<');
content3 = content3.replace('>/nuit<', '>{t("booking.step1.per_night")}<');
content3 = content3.replace('>/mois<', '>{t("booking.step1.per_month")}<');
content3 = content3.replace('>Chambre souhaitée', '>{t("booking.step1.desired_room")}');
content3 = content3.replace('>(optionnel)<', '>{t("booking.step1.optional")}<');
content3 = content3.replace('>Pas de préférence<', '>{t("booking.step1.no_pref")}<');
content3 = content3.replace('>Chambre N° {r}<', '>{t("booking.step1.room_n", { n: r })}<');

content3 = content3.replace('>Type de séjour<', '>{t("booking.step2.stay_type")}<');
content3 = content3.replace('> À la nuit<', '> {t("booking.step2.by_night")}<');
content3 = content3.replace('> Au mois<', '> {t("booking.step2.by_month")}<');
content3 = content3.replace('> Arrivée<', '> {t("booking.step2.arrival")}<');
content3 = content3.replace('> Départ<', '> {t("booking.step2.departure")}<');
content3 = content3.replace('>Durée estimée<', '>{t("booking.step2.duration_est")}<');
content3 = content3.replace('>{nbNuits} nuit{nbNuits > 1 ? "s" : ""}<', '>{nbNuits > 1 ? t("booking.step2.nights_plural", { count: nbNuits }) : t("booking.step2.nights", { count: nbNuits })}<');
content3 = content3.replace('> Adultes<', '> {t("booking.step2.adults")}<');
content3 = content3.replace('> Enfants<', '> {t("booking.step2.children")}<');
content3 = content3.replace('> Demandes spéciales<', '> {t("booking.step2.special_req")}<');
content3 = content3.replace('placeholder="Vue mer souhaitée, lit bébé, transfert aéroport..."', 'placeholder={t("booking.step2.req_placeholder")}');
content3 = content3.replace('>Tarif estimé<', '>{t("booking.step2.price_est")}<');

content3 = content3.replace('> Nom complet *<', '> {t("booking.step3.name")}<');
content3 = content3.replace('placeholder="Prénom et Nom"', 'placeholder={t("booking.step3.name_placeholder")}');
content3 = content3.replace('> Téléphone / WhatsApp *<', '> {t("booking.step3.phone")}<');
content3 = content3.replace('> Email', '> {t("booking.step3.email")}');
content3 = content3.replace('> Heure d\'arrivée prévue<', '> {t("booking.step3.time")}<');

content3 = content3.replace('>Hébergement choisi<', '>{t("booking.step4.chosen_room")}<');
content3 = content3.replace('>Type<', '>{t("booking.step4.type")}<');
content3 = content3.replace('>Catégorie<', '>{t("booking.step4.category")}<');
content3 = content3.replace('>Chambre<', '>{t("booking.step4.room")}<');
content3 = content3.replace('> Séjour<', '> {t("booking.step4.stay")}<');
content3 = content3.replace('>Arrivée<', '>{t("booking.step2.arrival")}<');
content3 = content3.replace('>Départ<', '>{t("booking.step2.departure")}<');
content3 = content3.replace('>Durée<', '>{t("booking.step2.duration_est")}<');
content3 = content3.replace('>Occupants<', '>{t("booking.step4.occupants")}<');
content3 = content3.replace(
  '>{d.adultes} adulte{d.adultes > 1 ? "s" : ""}{d.enfants > 0 ? ` + ${d.enfants} enfant${d.enfants > 1 ? "s" : ""}` : ""}<',
  '>{d.adultes} {d.adultes > 1 ? t("booking.step4.adult_plural") : t("booking.step4.adult")} {d.enfants > 0 ? `+ ${d.enfants} ${d.enfants > 1 ? t("booking.step4.child_plural") : t("booking.step4.child")}` : ""}<'
);
content3 = content3.replace('> Coordonnées<', '> {t("booking.step4.contact")}<');
content3 = content3.replace('>Nom<', '>{t("booking.step3.name").replace(" *", "")}<');
content3 = content3.replace('>Tél.<', '>{t("booking.step3.phone").replace(" *", "")}<');
content3 = content3.replace('>Email<', '>{t("booking.step3.email")}<');
content3 = content3.replace('>Demandes<', '>{t("booking.step2.special_req")}<');

content3 = content3.replace('>Tarif estimé<', '>{t("booking.step2.price_est")}<');
content3 = content3.replace('>En cliquant sur confirmer, vous serez redirigé vers WhatsApp pour finaliser votre réservation avec l\'équipe TOGOLIVING.<', '>{t("booking.step4.disclaimer")}<');
content3 = content3.replace('> Retour<', '> {t("booking.step4.back")}<');
content3 = content3.replace('Suivant <', '{t("booking.step4.next")} <');
content3 = content3.replace('> Confirmer via WhatsApp<', '> {t("booking.step4.confirm")}<');

content3 = content3.replace('>Questions Fréquentes<', '>{t("booking.faq.title")}<');
content3 = content3.replace('>Tout ce que vous devez savoir avant de réserver.<', '>{t("booking.faq.subtitle")}<');
content3 = content3.replace('>Quelle est la politique d\'annulation ?<', '>{t("booking.faq.q1")}<');
content3 = content3.replace('>Les annulations sont gratuites jusqu\'à 48 heures avant la date d\'arrivée prévue. Passé ce délai, la première nuit sera facturée.<', '>{t("booking.faq.a1")}<');
content3 = content3.replace('>Y a-t-il une navette depuis l\'aéroport ?<', '>{t("booking.faq.q2")}<');
content3 = content3.replace('>Oui, nous proposons un service de navette aéroport VIP sur demande. Veuillez l\'indiquer dans la section "Demandes spéciales" lors de votre réservation.<', '>{t("booking.faq.a2")}<');
content3 = content3.replace('>Les animaux de compagnie sont-ils acceptés ?<', '>{t("booking.faq.q3")}<');
content3 = content3.replace('>Pour garantir le confort de tous nos clients, les animaux de compagnie ne sont malheureusement pas admis au sein de la résidence.<', '>{t("booking.faq.a3")}<');

// Booking MSG content
content3 = content3.replace(
  'const msg = [\n      "Bonjour TOGOLIVING,",\n      "═══ NOUVELLE DEMANDE DE RÉSERVATION ═══",\n      "",\n      `Hébergement : ${cat.category} — ${variant.name}`,\n      `${roomInfo}`,\n      `Tarif estimé : ${priceLabel}`,\n      "",\n      `Arrivée : ${d.arrivee || "À définir"} à ${d.heure}`,\n      `Départ  : ${d.depart || "À définir"}`,\n      nbNuits > 0 ? `Durée   : ${nbNuits} nuit${nbNuits > 1 ? "s" : ""}` : "",\n      "",\n      `Adultes : ${d.adultes}`,\n      `Enfants : ${d.enfants}`,\n      "",\n      `Nom      : ${d.nom}`,\n      `Tél      : ${d.tel}`,\n      `Email    : ${d.email || "—"}`,\n      d.demandes ? `\\nDemandes spéciales : ${d.demandes}` : "",\n      "",\n      "Merci de confirmer la disponibilité.",\n    ]',
  'const msg = [\n      t("booking.msg.greeting"),\n      t("booking.msg.room", { category: cat.category, variant: variant.name }),\n      d.roomNum ? t("booking.msg.room_num", { n: d.roomNum }) : t("booking.msg.room_any", { variant: variant.name }),\n      t("booking.msg.price", { price: priceLabel }),\n      "",\n      t("booking.msg.arrival", { date: d.arrivee || t("booking.msg.tbd"), time: d.heure }),\n      t("booking.msg.departure", { date: d.depart || t("booking.msg.tbd") }),\n      nbNuits > 0 ? t("booking.msg.duration", { n: nbNuits }) : "",\n      "",\n      t("booking.msg.adults", { n: d.adultes }),\n      t("booking.msg.children", { n: d.enfants }),\n      "",\n      t("booking.msg.name", { name: d.nom }),\n      t("booking.msg.phone", { phone: d.tel }),\n      t("booking.msg.email", { email: d.email || t("booking.msg.empty_field") }),\n      d.demandes ? t("booking.msg.reqs", { reqs: d.demandes }) : "",\n      t("booking.msg.footer")\n    ]'
);

fs.writeFileSync(file3, content3);

console.log("Lot 2 components updated.");
