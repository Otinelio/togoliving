-- Ajout des colonnes au cas où
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS images JSONB;
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS "videoUrl" TEXT;
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS "videoUrls" JSONB;
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS amenities JSONB;
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS capacity TEXT;
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS "price_per_night" TEXT;
ALTER TABLE rooms_status ADD COLUMN IF NOT EXISTS "price_per_month" TEXT;

-- Suppression optionnelle des anciennes données pour repartir sur une base propre
-- DELETE FROM rooms_status;

-- Insertion des Chambres avec leurs données exactes (UPSERT)
INSERT INTO rooms_status (id, title, type, status, description, capacity, "price_per_night", "price_per_month", amenities)
VALUES
-- STUDIOS STANDARD
('4', 'Studio Standard', 'Studios', 'Disponible', 
'Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '30 000 F', '300 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

('5', 'Studio Standard', 'Studios', 'Disponible', 
'Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '30 000 F', '300 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

('6', 'Studio Standard', 'Studios', 'Disponible', 
'Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '30 000 F', '300 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

('7', 'Studio Standard', 'Studios', 'Disponible', 
'Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '30 000 F', '300 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

-- STUDIOS PRO
('34', 'Studio Pro', 'Studios', 'Disponible', 
'Appartement de 20 m². Finitions supérieures.

Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '35 000 F', '350 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

-- 1 CHAMBRE SALON STANDARD
('8', '1 Chambre salon Standard', 'Chambre Salon', 'Disponible', 
'Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '40 000 F', '420 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

('9', '1 Chambre salon Standard', 'Chambre Salon', 'Disponible', 
'Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '40 000 F', '420 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

('20', '1 Chambre salon Standard', 'Chambre Salon', 'Disponible', 
'Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '40 000 F', '420 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

-- 1 CHAMBRE SALON CONFORT
('1', '1 Chambre salon Confort', 'Chambre Salon', 'Disponible', 
'Appartement 1 Chambre de 20 m² avec espace confort.

Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '50 000 F', '500 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

('56', '1 Chambre salon Confort', 'Chambre Salon', 'Disponible', 
'Appartement 1 Chambre de 20 m² avec espace confort.

Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d''intérêt

The infinity pool is a top feature of this apartment. L''appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d''un patio, il dispose également d''un coin repas, de carrelage en marbre et d''une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'20 m²', '50 000 F', '500 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"]'::jsonb),

-- 2 CHAMBRES SALON STANDARD
('2', '2 Chambres salon Standard', '2 Chambres Salon', 'Disponible', 
'Appartement entier • 75 m²

🛏️ Literie : 2 chambres, 2 lits doubles (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la mer, Vue sur le jardin, Vue sur la piscine, Vue sur un site d''intérêt, Vue sur la ville, Vue sur une cour intérieure

This apartment offers a pool with a view. Spacieux appartement comprenant 1 salon, 2 chambres séparées avec lits doubles, et 2 salles de bains avec douche. Cet appartement climatisé dispose également d''une télévision à écran plat, d''un plateau/bouilloire, d''un coin salon, et d''un coin repas. Hébergement non-fumeurs.

Dans votre kitchenette privative : Réfrigérateur, Micro-ondes, Ustensiles de cuisine, Plaque de cuisson, Table à manger.
Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'75 m²', '80 000 F', '600 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Kitchenette privative", "Salle de bains privative", "Vue sur la mer", "Vue sur le jardin", "Vue sur la piscine", "Vue sur la ville", "Vue sur une cour intérieure", "Réfrigérateur", "Micro-ondes", "Ustensiles de cuisine", "Plaque de cuisson", "Table à manger", "Canapé", "Coin salon", "Plateau / bouilloire", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs"]'::jsonb),

('3', '2 Chambres salon Standard', '2 Chambres Salon', 'Disponible', 
'Appartement entier • 75 m²

🛏️ Literie : 2 chambres, 2 lits doubles (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la mer, Vue sur le jardin, Vue sur la piscine, Vue sur un site d''intérêt, Vue sur la ville, Vue sur une cour intérieure

This apartment offers a pool with a view. Spacieux appartement comprenant 1 salon, 2 chambres séparées avec lits doubles, et 2 salles de bains avec douche. Cet appartement climatisé dispose également d''une télévision à écran plat, d''un plateau/bouilloire, d''un coin salon, et d''un coin repas. Hébergement non-fumeurs.

Dans votre kitchenette privative : Réfrigérateur, Micro-ondes, Ustensiles de cuisine, Plaque de cuisson, Table à manger.
Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'75 m²', '80 000 F', '600 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Kitchenette privative", "Salle de bains privative", "Vue sur la mer", "Vue sur le jardin", "Vue sur la piscine", "Vue sur la ville", "Vue sur une cour intérieure", "Réfrigérateur", "Micro-ondes", "Ustensiles de cuisine", "Plaque de cuisson", "Table à manger", "Canapé", "Coin salon", "Plateau / bouilloire", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs"]'::jsonb),

-- 2 CHAMBRES SALON PRO
('78', '2 Chambres salon Pro', '2 Chambres Salon', 'Disponible', 
'Appartement 2 Chambres Pro de 75 m². Finitions et services premium.

Appartement entier • 75 m²

🛏️ Literie : 2 chambres, 2 lits doubles (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la mer, Vue sur le jardin, Vue sur la piscine, Vue sur un site d''intérêt, Vue sur la ville, Vue sur une cour intérieure

This apartment offers a pool with a view. Spacieux appartement comprenant 1 salon, 2 chambres séparées avec lits doubles, et 2 salles de bains avec douche. Cet appartement climatisé dispose également d''une télévision à écran plat, d''un plateau/bouilloire, d''un coin salon, et d''un coin repas. Hébergement non-fumeurs.

Dans votre kitchenette privative : Réfrigérateur, Micro-ondes, Ustensiles de cuisine, Plaque de cuisson, Table à manger.
Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'75 m²', '100 000 F', '700 000 F',
'["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Kitchenette privative", "Salle de bains privative", "Vue sur la mer", "Vue sur le jardin", "Vue sur la piscine", "Vue sur la ville", "Vue sur une cour intérieure", "Réfrigérateur", "Micro-ondes", "Ustensiles de cuisine", "Plaque de cuisson", "Table à manger", "Canapé", "Coin salon", "Plateau / bouilloire", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs"]'::jsonb),

-- 3 CHAMBRES SALON STANDARD
('30', '3 Chambres salon Standard', '3 Chambres Salon', 'Disponible', 
'Appartement entier • 85 m²

🛏️ Literie : 3 chambres, 3 lits doubles (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la mer, Vue sur le jardin, Vue sur la piscine, Vue sur un site d''intérêt, Vue sur la ville, Vue sur une cour intérieure

The pool with a view is a top feature of this apartment. Spacieux appartement comprenant 1 salon, 3 chambres séparées avec lits doubles, et 2 salles de bains avec douche. Doté d''une terrasse avec vue sur la mer, cet appartement offre également la climatisation, une télévision à écran plat, et un fer à repasser. Hébergement non-fumeurs.

Dans votre cuisine privative : Réfrigérateur, Machine à café, Micro-ondes, Ustensiles de cuisine, Bouilloire électrique, Plaque de cuisson, Table à manger.
Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'85 m²', '100 000 F', '700 000 F',
'["Climatisation", "Terrasse", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Cuisine privative", "Salle de bains privative", "Vue sur la mer", "Vue sur le jardin", "Vue sur la piscine", "Vue sur la ville", "Vue sur une cour intérieure", "Réfrigérateur", "Machine à café", "Micro-ondes", "Ustensiles de cuisine", "Bouilloire électrique", "Plaque de cuisson", "Table à manger", "Canapé", "Coin salon", "Fer à repasser", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs"]'::jsonb),

-- 3 CHAMBRES SALON PRO
('10', '3 Chambres salon Pro', '3 Chambres Salon', 'Disponible', 
'Appartement 3 Chambres Pro de 85 m². Le sommet du confort.

Appartement entier • 85 m²

🛏️ Literie : 3 chambres, 3 lits doubles (Lits confortables, notés 8,8 d''après les commentaires)
🪟 Vues : Vue sur la mer, Vue sur le jardin, Vue sur la piscine, Vue sur un site d''intérêt, Vue sur la ville, Vue sur une cour intérieure

The pool with a view is a top feature of this apartment. Spacieux appartement comprenant 1 salon, 3 chambres séparées avec lits doubles, et 2 salles de bains avec douche. Doté d''une terrasse avec vue sur la mer, cet appartement offre également la climatisation, une télévision à écran plat, et un fer à repasser. Hébergement non-fumeurs.

Dans votre cuisine privative : Réfrigérateur, Machine à café, Micro-ondes, Ustensiles de cuisine, Bouilloire électrique, Plaque de cuisson, Table à manger.
Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.', 
'85 m²', '100 000 F', '750 000 F',
'["Climatisation", "Terrasse", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Cuisine privative", "Salle de bains privative", "Vue sur la mer", "Vue sur le jardin", "Vue sur la piscine", "Vue sur la ville", "Vue sur une cour intérieure", "Réfrigérateur", "Machine à café", "Micro-ondes", "Ustensiles de cuisine", "Bouilloire électrique", "Plaque de cuisson", "Table à manger", "Canapé", "Coin salon", "Fer à repasser", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs"]'::jsonb)

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  type = EXCLUDED.type,
  description = EXCLUDED.description,
  capacity = EXCLUDED.capacity,
  "price_per_night" = EXCLUDED."price_per_night",
  "price_per_month" = EXCLUDED."price_per_month",
  amenities = EXCLUDED.amenities;

