const fs = require('fs');

const file1 = 'src/routes/restaurant.tsx';
let content1 = fs.readFileSync(file1, 'utf8');
content1 = content1.replace(
  'import { createFileRoute } from "@tanstack/react-router";',
  'import { createFileRoute } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content1 = content1.replace('function Page() {', 'function Page() {\n  const { t } = useTranslation();');
content1 = content1.replace(
  'function MenuCard({ it, onAdd, onOpenPopup }: { it: ReturnType<typeof useMenu>["items"][0]; onAdd: () => void; onOpenPopup: () => void }) {',
  'function MenuCard({ it, onAdd, onOpenPopup }: { it: ReturnType<typeof useMenu>["items"][0]; onAdd: () => void; onOpenPopup: () => void }) {\n  const { t } = useTranslation();'
);

content1 = content1.replace('>Au Restaurant<', '>{t("restaurant.hero.subtitle")}<');
content1 = content1.replace('>Restaurant Vue Océan à Lomé — Saveurs du Monde<', '>{t("restaurant.hero.title")}<');
content1 = content1.replace('>Vue sur l\'Océan<', '>{t("restaurant.hero.desc")}<');
content1 = content1.replace('placeholder="Rechercher un plat, boisson..."', 'placeholder={t("restaurant.search")}');
content1 = content1.replace('>{catItems.length} article{catItems.length > 1 ? "s" : ""}<', '>{catItems.length} {catItems.length > 1 ? t("restaurant.articles") : t("restaurant.article")}<');
content1 = content1.replace('>Le menu est actuellement vide.<', '>{t("restaurant.empty_menu")}<');
content1 = content1.replace('>Aucun article dans cette catégorie.<', '>{t("restaurant.empty_category")}<');

content1 = content1.replace(
  '>{totals.count} article{totals.count > 1 ? "s" : ""}<',
  '>{totals.count} {totals.count > 1 ? t("restaurant.articles") : t("restaurant.article")}<'
);
content1 = content1.replace('>Tap pour voir le panier<', '>{t("restaurant.cart.tap_to_view")}<');
content1 = content1.replace('Commander <', '{t("restaurant.cart.order_btn")} <');
content1 = content1.replace('>Panier<', '>{t("restaurant.cart.title")}<');
content1 = content1.replace('>Votre commande<', '>{t("restaurant.cart.order")}<');
content1 = content1.replace('>Articles sélectionnés<', '>{t("restaurant.cart.selected")}<');
content1 = content1.replace('>Réception<', '>{t("restaurant.cart.reception")}<');

// The methods array map:
content1 = content1.replace(
  '{method}',
  '{method === "Retrait au restaurant" ? t("restaurant.cart.pickup") : t("restaurant.cart.delivery")}'
);

content1 = content1.replace('>Adresse de livraison<', '>{t("restaurant.cart.address")}<');
content1 = content1.replace('placeholder="Quartier, rue, repère, numéro..."', 'placeholder={t("restaurant.cart.address_placeholder")}');
content1 = content1.replace(' / unité<', ' {t("restaurant.cart.per_unit")}<');
content1 = content1.replace('>Total<', '>{t("restaurant.cart.total")}<');
content1 = content1.replace('Envoyer sur WhatsApp', '{t("restaurant.cart.send_whatsapp")}');

content1 = content1.replace('>Prix unitaire<', '>{t("popup.unit_price")}<');
content1 = content1.replace('? "Indisponible actuellement" : "Ajouter au panier"', '? t("restaurant.popup.unavailable") : t("restaurant.popup.add")');

content1 = content1.replace('>Indisponible<', '>{t("restaurant.card.unavailable")}<');
content1 = content1.replace('>Voir plus<', '>{t("restaurant.card.see_more")}<');
content1 = content1.replace('>Indisponible<', '>{t("restaurant.card.unavailable")}<');
content1 = content1.replace('>Voir plus<', '>{t("restaurant.card.see_more")}<'); // Need to do it twice because there are 2 places

// WhatsApp Message
content1 = content1.replace(
  '"Bonjour TOGOLIVING,",',
  't("restaurant.msg.greeting"),'
);
content1 = content1.replace(
  '"Je souhaite commander au restaurant :",',
  't("restaurant.msg.intent"),'
);
content1 = content1.replace(
  '`Mode de reception: ${fulfillment}`,',
  't("restaurant.msg.reception", { method: fulfillment === "Retrait au restaurant" ? t("restaurant.cart.pickup") : t("restaurant.cart.delivery") }),'
);
content1 = content1.replace(
  'fulfillment === "Livraison" && deliveryAddress ? `Adresse de livraison: ${deliveryAddress}` : null,',
  'fulfillment === "Livraison" && deliveryAddress ? t("restaurant.msg.address", { address: deliveryAddress }) : null,'
);
content1 = content1.replace(
  '`Total: ${formatFCFA(totals.total)}`,',
  't("restaurant.msg.total", { total: formatFCFA(totals.total) }),'
);
content1 = content1.replace(
  '"Merci de confirmer la disponibilite.",',
  't("restaurant.msg.footer"),'
);

// CATEGORY translation in restaurant tabs
content1 = content1.replace(
  '{c}',
  '{t(`restaurant.categories.${c}`)}'
);
// And in category titles:
content1 = content1.replace(
  '>{category}<',
  '>{t(`restaurant.categories.${category}`)}<'
);
// And in popup
content1 = content1.replace(
  '>{selectedItem.category}<',
  '>{t(`restaurant.categories.${selectedItem.category}`)}<'
);

fs.writeFileSync(file1, content1);


const file2 = 'src/routes/loisirs.tsx';
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(
  'import { createFileRoute, Link } from "@tanstack/react-router";',
  'import { createFileRoute, Link } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content2 = content2.replace('function LoisirsPage() {', 'function LoisirsPage() {\n  const { t } = useTranslation();');
content2 = content2.replace('>Loisirs & Détente<', '>{t("loisirs.hero.subtitle")}<');
content2 = content2.replace('>Détendez-vous à TOGOLIVING<', '>{t("loisirs.hero.title")}<');
content2 = content2.replace(
  '>\n            Entre océan et piscine panoramique, profitez d\'un cadre conçu pour le repos, le divertissement et les moments en famille.\n          <',
  '>\n            {t("loisirs.hero.desc")}\n          <'
);
content2 = content2.replace('>Vue imprenable<', '>{t("loisirs.pool.subtitle")}<');
content2 = content2.replace('>Piscine Panoramique & Pool Bar<', '>{t("loisirs.pool.title")}<');
content2 = content2.replace(
  '>\n              Plongez dans notre vaste piscine extérieure offrant une vue dégagée sur l\'océan Atlantique. Que ce soit pour une baignade matinale rafraîchissante ou pour vous détendre au coucher du soleil avec un cocktail à la main.\n            <',
  '>\n              {t("loisirs.pool.desc")}\n            <'
);
// List features
content2 = content2.replace(
  '{ icon: Droplets, text: "Bassin pour adultes et petit bassin pour enfants" },',
  '{ icon: Droplets, text: t("loisirs.pool.b1") },'
);
content2 = content2.replace(
  '{ icon: Coffee, text: "Pool bar avec service de rafraîchissements directement dans l\'eau" },',
  '{ icon: Coffee, text: t("loisirs.pool.b2") },'
);
content2 = content2.replace(
  '{ icon: Sun, text: "Transats confortables et parasols pour profiter du soleil" },',
  '{ icon: Sun, text: t("loisirs.pool.b3") },'
);

content2 = content2.replace('>Pour tous les âges<', '>{t("loisirs.activities.subtitle")}<');
content2 = content2.replace('>Espaces de Jeux & Activités<', '>{t("loisirs.activities.title")}<');

// The features array in loisirs:
content2 = content2.replace(
  'title: "Jeux & Divertissements", \n                desc: "Profitez de notre espace loisirs équipé d\'un billard, de baby-foot et de divers jeux de société pour vos soirées entre amis ou en famille.",',
  'title: t("loisirs.activities.games_title"), \n                desc: t("loisirs.activities.games_desc"),'
);
content2 = content2.replace(
  'title: "Espace Enfants Sécurisé", \n                desc: "Une aire de jeux spécialement aménagée pour les plus petits, sous la supervision des parents, pour s\'amuser en toute sécurité.",',
  'title: t("loisirs.activities.kids_title"), \n                desc: t("loisirs.activities.kids_desc"),'
);
content2 = content2.replace(
  'title: "Jardin & Espaces Verts", \n                desc: "Promenez-vous dans notre jardin tropical, profitez du patio ombragé ou détendez-vous sur la terrasse avec vue sur la nature.",',
  'title: t("loisirs.activities.garden_title"), \n                desc: t("loisirs.activities.garden_desc"),'
);

content2 = content2.replace('>L\'Océan à votre porte<', '>{t("loisirs.beach.subtitle")}<');
content2 = content2.replace('>Plage Naturelle à 100m<', '>{t("loisirs.beach.title")}<');
content2 = content2.replace(
  '>\n              Traversez la route et vous y êtes. La plage sauvage et préservée de Kpogan vous offre des kilomètres de sable fin pour vos balades matinales, votre jogging ou simplement pour écouter le bruit des vagues.\n            <',
  '>\n              {t("loisirs.beach.desc")}\n            <'
);
content2 = content2.replace('Réserver votre séjour', '{t("loisirs.beach.book")}');
content2 = content2.replace('Découvrir le Restaurant', '{t("loisirs.beach.restaurant")}');

content2 = content2.replace('>Galerie des Installations<', '>{t("loisirs.gallery.title")}<');
content2 = content2.replace('>Découvrez nos espaces de jeux et de détente en images.<', '>{t("loisirs.gallery.desc")}<');

fs.writeFileSync(file2, content2);


const file3 = 'src/routes/galerie.tsx';
let content3 = fs.readFileSync(file3, 'utf8');
content3 = content3.replace(
  'import { createFileRoute } from "@tanstack/react-router";',
  'import { createFileRoute } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content3 = content3.replace('function Page() {', 'function Page() {\n  const { t } = useTranslation();');

content3 = content3.replace('>Notre Cadre<', '>{t("galerie.hero.subtitle")}<');
content3 = content3.replace('>Kpogan Agbetsiko<', '>{t("galerie.hero.title")}<');

// CATEGORY translation in galerie tabs
content3 = content3.replace(
  '{c}',
  '{t(`galerie.categories.${c}`)}'
);

content3 = content3.replace(
  '>Aucune photo disponible dans cette catégorie pour le moment.<',
  '>{t("galerie.empty")}<'
);

fs.writeFileSync(file3, content3);

console.log("Lot 3 components updated.");
