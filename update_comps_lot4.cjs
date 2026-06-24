const fs = require('fs');

const file1 = 'src/routes/a-propos.tsx';
let content1 = fs.readFileSync(file1, 'utf8');
content1 = content1.replace(
  'import { createFileRoute } from "@tanstack/react-router";',
  'import { createFileRoute } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content1 = content1.replace('function Page() {', 'function Page() {\n  const { t } = useTranslation();');

content1 = content1.replace('>A Propos<', '>{t("about.hero.subtitle")}<');
content1 = content1.replace('>TOGOLIVING<', '>{t("about.hero.title")}<');
content1 = content1.replace('>Votre Résidence Balnéaire au Togo<', '>{t("about.hero.desc")}<');
content1 = content1.replace('>Hôtel Classé 4 Étoiles<', '>{t("about.hero.badge")}<');

content1 = content1.replace(
  '>\n            Offrant une vue sur la ville, l\'établissement <strong>Résidence Togoliving</strong> — classé <strong>Hôtel 4 Étoiles</strong> — se trouve à Toudji, très bien situé au bord du goudron National N2 et à seulement 100 m de la plage naturelle. \n            Kpogan est un quartier calme, situé sur la route nationale menant du Bénin au Ghana, près du marché d\'Agbavi.\n          <',
  ' dangerouslySetInnerHTML={{ __html: t("about.intro.p1") }} />'
);
content1 = content1.replace(
  '>\n            Il propose un <strong>restaurant</strong>, un <strong>service d\'étage</strong>, un <strong>bar</strong>, un <strong>jardin</strong> et une <strong>terrasse</strong>. \n            Il propose gratuitement une connexion Wi-Fi rapide (516 Mb/s) et un parking privé. L\'établissement sert un petit-déjeuner continental ou américain tous les matins.\n          <',
  ' dangerouslySetInnerHTML={{ __html: t("about.intro.p2") }} />'
);
content1 = content1.replace(
  '>\n            Chaque hébergement comprend une salle de bains privative avec une douche, la climatisation, une télévision à écran plat et un réfrigérateur. \n            L\'établissement se situe à 17 km de l\'Aéroport international de Lomé-Tokoin et propose un service de navette aéroport (en supplément).\n          <',
  ' dangerouslySetInnerHTML={{ __html: t("about.intro.p3") }} />'
);
content1 = content1.replace(
  '>\n            Code Postal : <strong>36BP50</strong> — Kpogan Agbetsiko, Lomé, Togo\n          <',
  ' dangerouslySetInnerHTML={{ __html: t("about.intro.p4") }} />'
);

content1 = content1.replace('"du centre-ville"', 't("about.stats.city")');
content1 = content1.replace('"de la plage"', 't("about.stats.beach")');
content1 = content1.replace('"types d\'hebergement"', 't("about.stats.types")');
content1 = content1.replace('"de l\'aeroport"', 't("about.stats.airport")');

content1 = content1.replace('>Les essentiels<', '>{t("about.essentials.subtitle")}<');
content1 = content1.replace('>Points Forts de l\'Établissement<', '>{t("about.essentials.title")}<');
content1 = content1.replace('"Piscine extérieure avec vue"', 't("about.essentials.p1")');
content1 = content1.replace('"Restaurant (Cuisine variée)"', 't("about.essentials.p2")');
content1 = content1.replace('"Connexion Wi-Fi gratuite (516 Mb/s)"', 't("about.essentials.p3")');
content1 = content1.replace('"Parking privé gratuit sur place"', 't("about.essentials.p4")');
content1 = content1.replace('"Chambres familiales et non-fumeurs"', 't("about.essentials.p5")');
content1 = content1.replace('"Navette aéroport"', 't("about.essentials.p6")');
content1 = content1.replace('"Service d\'étage & Bar"', 't("about.essentials.p7")');
content1 = content1.replace('"Petit-déjeuner inclus"', 't("about.essentials.p8")');

content1 = content1.replace('>Équipements et Services<', '>{t("about.facilities.title")}<');
content1 = content1.replace('>Général<', '>{t("about.facilities.general")}<');
content1 = content1.replace('>• Climatisation dans tous les hébergements<', '>{t("about.facilities.g1")}<');
content1 = content1.replace('>• Établissement entièrement non-fumeurs<', '>{t("about.facilities.g2")}<');
content1 = content1.replace('>• Sécurité 24h/24 & Caméras de surveillance<', '>{t("about.facilities.g3")}<');
content1 = content1.replace('>• Extincteurs & Détecteurs de fumée<', '>{t("about.facilities.g4")}<');
content1 = content1.replace('>• Service de ménage quotidien (en supplément)<', '>{t("about.facilities.g5")}<');
content1 = content1.replace('>• Bureau d\'excursions & Enregistrement rapide<', '>{t("about.facilities.g6")}<');

content1 = content1.replace('>Extérieur & Activités<', '>{t("about.facilities.outdoor")}<');
content1 = content1.replace('>• Plage naturelle à 100m<', '>{t("about.facilities.o1")}<');
content1 = content1.replace('>• Jardin, Terrasse bien exposée & Patio<', '>{t("about.facilities.o2")}<');
content1 = content1.replace('>• Installations pour barbecue (en supplément)<', '>{t("about.facilities.o3")}<');
content1 = content1.replace('>• Piscine avec vue et bar dans la piscine<', '>{t("about.facilities.o4")}<');
content1 = content1.replace('>• Chaises longues et parasols<', '>{t("about.facilities.o5")}<');
content1 = content1.replace('>• Balades à pied (en supplément)<', '>{t("about.facilities.o6")}<');

content1 = content1.replace('>Restauration & Boissons<', '>{t("about.facilities.food")}<');
content1 = content1.replace('>• Restaurant Living’s (africaine, française, etc.)<', '>{t("about.facilities.f1")}<');
content1 = content1.replace('>• Café sur place & Snack-bar<', '>{t("about.facilities.f2")}<');
content1 = content1.replace('>• Menus enfants (en supplément)<', '>{t("about.facilities.f3")}<');
content1 = content1.replace('>• Vin/champagne (en supplément)<', '>{t("about.facilities.f4")}<');
content1 = content1.replace('>• Petit-déjeuner en chambre<', '>{t("about.facilities.f5")}<');
content1 = content1.replace('>• Supérette sur place<', '>{t("about.facilities.f6")}<');

content1 = content1.replace('>Classement Officiel<', '>{t("about.license.title")}<');
content1 = content1.replace('>Résidence Togoliving — Hôtel classé 4 Étoiles<', '>{t("about.license.desc")}<');

content1 = content1.replace('>Nos Valeurs<', '>{t("about.values.subtitle")}<');
content1 = content1.replace('>Pourquoi nous choisir<', '>{t("about.values.title")}<');
content1 = content1.replace('t: "Accueil Chaleureux", d: "Une equipe disponible 24h/24 pour votre confort et un service personnalisé."', 't: t("about.values.v1_title"), d: t("about.values.v1_desc")');
content1 = content1.replace('t: "Cadre Unique",       d: "Vue mer, piscine et plage naturelle en un seul lieu."', 't: t("about.values.v2_title"),       d: t("about.values.v2_desc")');
content1 = content1.replace('t: "Confort & Securite", d: "Appartements meubles, parking prive sécurisé 24h/24, WiFi ultra-rapide."', 't: t("about.values.v3_title"), d: t("about.values.v3_desc")');

fs.writeFileSync(file1, content1);


const file2 = 'src/routes/carrieres.tsx';
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(
  'import { createFileRoute } from "@tanstack/react-router";',
  'import { createFileRoute } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content2 = content2.replace('function CarrieresPage() {', 'function CarrieresPage() {\n  const { t } = useTranslation();');

content2 = content2.replace('>Recrutement<', '>{t("careers.hero.subtitle")}<');
content2 = content2.replace('>Rejoignez l\'Aventure<', '>{t("careers.hero.title")}<');
content2 = content2.replace(
  '>\n            Faites carrière au sein d\'une équipe passionnée par l\'excellence et l\'hospitalité. Découvrez nos opportunités et grandissez avec nous.\n          <',
  '>\n            {t("careers.hero.desc")}\n          <'
);

content2 = content2.replace('>Pourquoi TOGOLIVING ?<', '>{t("careers.philosophy.subtitle")}<');
content2 = content2.replace('>Notre Philosophie Employeur<', '>{t("careers.philosophy.title")}<');

content2 = content2.replace('title: "Esprit de Famille", desc: "Nous cultivons un environnement de travail bienveillant où le respect mutuel et l\'entraide sont primordiaux."', 'title: t("careers.philosophy.v1_title"), desc: t("careers.philosophy.v1_desc")');
content2 = content2.replace('title: "Évolution Rapide", desc: "Nous privilégions la promotion interne et l\'accompagnement de nos talents vers des postes à responsabilité."', 'title: t("careers.philosophy.v2_title"), desc: t("careers.philosophy.v2_desc")');
content2 = content2.replace('title: "Excellence & Formation", desc: "Nous offrons des formations continues pour maintenir nos standards élevés dans l\'hôtellerie de luxe."', 'title: t("careers.philosophy.v3_title"), desc: t("careers.philosophy.v3_desc")');

content2 = content2.replace('>Opportunités Actuelles<', '>{t("careers.jobs.subtitle")}<');
content2 = content2.replace('>Postes à Pourvoir<', '>{t("careers.jobs.title")}<');
content2 = content2.replace('> Candidature Spontanée<', '> {t("careers.jobs.spontaneous")}<');
content2 = content2.replace(
  '>\n                Aucun poste n\'est actuellement ouvert. N\'hésitez pas à envoyer une candidature spontanée !\n              <',
  '>\n                {t("careers.jobs.empty")}\n              <'
);
content2 = content2.replace('Postuler <', '{t("careers.jobs.apply")} <');

content2 = content2.replace('>Processus de Recrutement<', '>{t("careers.process.title")}<');
content2 = content2.replace('"Envoi du CV & Lettre"', 't("careers.process.s1")');
content2 = content2.replace('"Entretien Téléphonique"', 't("careers.process.s2")');
content2 = content2.replace('"Entretien Physique"', 't("careers.process.s3")');
content2 = content2.replace('"Intégration"', 't("careers.process.s4")');

content2 = content2.replace('>Postuler<', '>{t("careers.form.title")}<');
content2 = content2.replace('? "Candidature Spontanée" :', '? t("careers.form.subtitle") :');
content2 = content2.replace('>Candidature Envoyée !<', '>{t("careers.form.success_title")}<');
content2 = content2.replace('>Nous avons bien reçu votre candidature. Notre équipe des ressources humaines reviendra vers vous très vite.<', '>{t("careers.form.success_desc")}<');

content2 = content2.replace('>Informations Personnelles<', '>{t("careers.form.personal")}<');
content2 = content2.replace('>Nom Complet<', '>{t("careers.form.name")}<');
content2 = content2.replace('placeholder="Ex: Jean Dupont"', 'placeholder={t("careers.form.name_placeholder")}');
content2 = content2.replace('>Adresse Email<', '>{t("careers.form.email")}<');
content2 = content2.replace('placeholder="jean.dupont@email.com"', 'placeholder={t("careers.form.email_placeholder")}');
content2 = content2.replace('>Numéro de Téléphone<', '>{t("careers.form.phone")}<');
content2 = content2.replace('placeholder="+228 XX XX XX XX"', 'placeholder={t("careers.form.phone_placeholder")}');

content2 = content2.replace('>Message / Motivation<', '>{t("careers.form.message_title")}<');
content2 = content2.replace('>Présentez-vous brièvement<', '>{t("careers.form.message_label")}<');
content2 = content2.replace('placeholder="Quelles sont vos motivations pour rejoindre l\'équipe TOGOLIVING ?"', 'placeholder={t("careers.form.message_placeholder")}');

content2 = content2.replace('>Curriculum Vitae (CV)<', '>{t("careers.form.cv_title")}<');
content2 = content2.replace('>Cliquez pour changer de fichier<', '>{t("careers.form.cv_change")}<');
content2 = content2.replace('>Cliquez ou glissez votre CV ici<', '>{t("careers.form.cv_upload")}<');
content2 = content2.replace('>Format accepté : PDF (Max 5MB)<', '>{t("careers.form.cv_format")}<');

content2 = content2.replace('>Retour<', '>{t("careers.form.back")}<');
content2 = content2.replace('? "Suivant" : "Confirmer l\'envoi"', '? t("careers.form.next") : t("careers.form.confirm")');

fs.writeFileSync(file2, content2);


const file3 = 'src/routes/contact.tsx';
let content3 = fs.readFileSync(file3, 'utf8');
content3 = content3.replace(
  'import { createFileRoute } from "@tanstack/react-router";',
  'import { createFileRoute } from "@tanstack/react-router";\nimport { useTranslation } from "react-i18next";'
);
content3 = content3.replace('function Page() {', 'function Page() {\n  const { t } = useTranslation();');

content3 = content3.replace('>Contact<', '>{t("contact.hero.subtitle")}<');
content3 = content3.replace('>Parlons de votre Sejour<', '>{t("contact.hero.title")}<');

content3 = content3.replace('>Nos Coordonnees<', '>{t("contact.info.title")}<');
content3 = content3.replace('"Ouvert 24h/24, 7j/7"', 't("contact.info.open")');

content3 = content3.replace('>Envoyez un Message<', '>{t("contact.form.title")}<');
content3 = content3.replace('>Nom complet<', '>{t("contact.form.name")}<');
content3 = content3.replace('>Email<', '>{t("contact.form.email")}<');
content3 = content3.replace('>Objet<', '>{t("contact.form.subject")}<');
content3 = content3.replace('>Reservation<', '>{t("contact.form.s1")}<');
content3 = content3.replace('>Renseignements<', '>{t("contact.form.s2")}<');
content3 = content3.replace('>Evenement<', '>{t("contact.form.s3")}<');
content3 = content3.replace('>Autre<', '>{t("contact.form.s4")}<');
content3 = content3.replace('>Message<', '>{t("contact.form.message")}<');
content3 = content3.replace('Envoyer via WhatsApp', '{t("contact.form.send")}');

// message formation
content3 = content3.replace(
  '`Bonjour TOGOLIVING,\\nNom: ${f.nom}\\nEmail: ${f.email}\\nObjet: ${f.objet}\\nMessage: ${f.message}`',
  '`${t("contact.msg.greeting")}\\n${t("contact.msg.name")} ${f.nom}\\n${t("contact.msg.email")} ${f.email}\\n${t("contact.msg.subject")} ${f.objet}\\n${t("contact.msg.message")} ${f.message}`'
);

fs.writeFileSync(file3, content3);

console.log("Lot 4 components updated.");
