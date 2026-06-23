export type RoomType = "Studios" | "Chambre Salon" | "2 Chambres Salon" | "3 Chambres Salon";
export type RoomStatus = "Disponible" | "Occupe" | "Maintenance";

export type Room = {
  id: string;
  title?: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  guest?: string;
  notes?: string;
  description?: string;
  images?: string[];
  videoUrl?: string;
  videoUrls?: string[];
  amenities?: string[];
  capacity?: string;
  price_per_night?: string;
  price_per_month?: string;
};

const studioAmenities = ["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Réfrigérateur", "Ustensiles de cuisine", "Table à manger", "Salle de bains privative", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs", "Vue sur la ville", "Vue sur une cour intérieure"];

const deuxChambresAmenities = ["Climatisation", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Kitchenette privative", "Salle de bains privative", "Vue sur la mer", "Vue sur le jardin", "Vue sur la piscine", "Vue sur la ville", "Vue sur une cour intérieure", "Réfrigérateur", "Micro-ondes", "Ustensiles de cuisine", "Plaque de cuisson", "Table à manger", "Canapé", "Coin salon", "Plateau / bouilloire", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs"];

const troisChambresAmenities = ["Climatisation", "Terrasse", "Patio", "Télévision à écran plat", "Wi-Fi Gratuit", "Cuisine privative", "Salle de bains privative", "Vue sur la mer", "Vue sur le jardin", "Vue sur la piscine", "Vue sur la ville", "Vue sur une cour intérieure", "Réfrigérateur", "Machine à café", "Micro-ondes", "Ustensiles de cuisine", "Bouilloire électrique", "Plaque de cuisson", "Table à manger", "Canapé", "Coin salon", "Fer à repasser", "Ventilateur", "Très grands lits (> 2 mètres de long)", "Service de réveil / réveil", "Coin repas", "Linge de maison", "Prise près du lit", "Sol carrelé / en marbre", "Étages supérieurs accessibles uniquement par les escaliers", "Indépendant", "Barrières de sécurité pour bébés", "Détecteur de monoxyde de carbone", "Climatiseur indépendant dans les hébergements", "Fumeurs: non-fumeurs"];

const studioDesc = `Appartement entier • 20 m²

🛏️ Literie : 1 lit double (Lits confortables, notés 8,8 d'après les commentaires)
🪟 Vues : Vue sur la ville, Vue sur une cour intérieure, Vue sur un site d'intérêt

The infinity pool is a top feature of this apartment. L'appartement climatisé comprend 1 chambre et 1 salle de bains avec douche. Doté d'un patio, il dispose également d'un coin repas, de carrelage en marbre et d'une télévision à écran plat. Hébergement entièrement non-fumeurs.

Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.`;

const deuxChambresDesc = `Appartement entier • 75 m²

🛏️ Literie : 2 chambres, 2 lits doubles (Lits confortables, notés 8,8 d'après les commentaires)
🪟 Vues : Vue sur la mer, Vue sur le jardin, Vue sur la piscine, Vue sur un site d'intérêt, Vue sur la ville, Vue sur une cour intérieure

This apartment offers a pool with a view. Spacieux appartement comprenant 1 salon, 2 chambres séparées avec lits doubles, et 2 salles de bains avec douche. Cet appartement climatisé dispose également d'une télévision à écran plat, d'un plateau/bouilloire, d'un coin salon, et d'un coin repas. Hébergement non-fumeurs.

Dans votre kitchenette privative : Réfrigérateur, Micro-ondes, Ustensiles de cuisine, Plaque de cuisson, Table à manger.
Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.`;

const troisChambresDesc = `Appartement entier • 85 m²

🛏️ Literie : 3 chambres, 3 lits doubles (Lits confortables, notés 8,8 d'après les commentaires)
🪟 Vues : Vue sur la mer, Vue sur le jardin, Vue sur la piscine, Vue sur un site d'intérêt, Vue sur la ville, Vue sur une cour intérieure

The pool with a view is a top feature of this apartment. Spacieux appartement comprenant 1 salon, 3 chambres séparées avec lits doubles, et 2 salles de bains avec douche. Doté d'une terrasse avec vue sur la mer, cet appartement offre également la climatisation, une télévision à écran plat, et un fer à repasser. Hébergement non-fumeurs.

Dans votre cuisine privative : Réfrigérateur, Machine à café, Micro-ondes, Ustensiles de cuisine, Bouilloire électrique, Plaque de cuisson, Table à manger.
Dans votre salle de bains privative : Toilettes, Baignoire ou douche, Serviettes / linge de lit, Papier toilette.`;


export const DEFAULT_ROOMS: Room[] = [
  {
    id: "4", title: "Studio Standard", type: "Studios", status: "Disponible", floor: 0,
    description: studioDesc,
    capacity: "20 m²", price_per_night: "30 000 F", price_per_month: "300 000 F",
    amenities: studioAmenities,
    images: ["/images/appartements/IMG_4201.jpg", "/images/appartements/IMG_4211.jpg", "/images/appartements/IMG_4212.jpg", "/images/gallery/IMG_4188.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "5", title: "Studio Standard", type: "Studios", status: "Disponible", floor: 0,
    description: studioDesc,
    capacity: "20 m²", price_per_night: "30 000 F", price_per_month: "300 000 F",
    amenities: studioAmenities,
    images: ["/images/appartements/IMG_4212.jpg", "/images/appartements/IMG_4201.jpg", "/images/gallery/IMG_4230.jpg", "/images/gallery/IMG_4234.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "6", title: "Studio Standard", type: "Studios", status: "Disponible", floor: 1,
    description: studioDesc,
    capacity: "20 m²", price_per_night: "30 000 F", price_per_month: "300 000 F",
    amenities: studioAmenities,
    images: ["/images/appartements/IMG_4211.jpg", "/images/appartements/IMG_4247.jpg", "/images/gallery/IMG_4240.jpg", "/images/gallery/IMG_4283.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "7", title: "Studio Standard", type: "Studios", status: "Disponible", floor: 1,
    description: studioDesc,
    capacity: "20 m²", price_per_night: "30 000 F", price_per_month: "300 000 F",
    amenities: studioAmenities,
    images: ["/images/appartements/IMG_4247.jpg", "/images/appartements/IMG_4212.jpg", "/images/gallery/IMG_4009.jpg", "/images/gallery/IMG_4188.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "34", title: "Studio Pro", type: "Studios", status: "Disponible", floor: 2,
    description: "Appartement de 20 m². Finitions supérieures.\n\n" + studioDesc,
    capacity: "20 m²", price_per_night: "35 000 F", price_per_month: "350 000 F",
    amenities: studioAmenities,
    images: ["/images/gallery/IMG_4230.jpg", "/images/appartements/IMG_4201.jpg", "/images/appartements/IMG_4211.jpg", "/images/gallery/IMG_4234.jpg", "/images/gallery/piscine.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "8", title: "1 Chambre salon Standard", type: "Chambre Salon", status: "Disponible", floor: 0,
    description: studioDesc,
    capacity: "20 m²", price_per_night: "40 000 F", price_per_month: "420 000 F",
    amenities: studioAmenities,
    images: ["/images/gallery/IMG_4240.jpg", "/images/appartements/IMG_4201.jpg", "/images/gallery/IMG_4283.jpg", "/images/gallery/C21DF370-673F-4DC8-8681-D83FE80DDC88.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "9", title: "1 Chambre salon Standard", type: "Chambre Salon", status: "Disponible", floor: 0,
    description: studioDesc,
    capacity: "20 m²", price_per_night: "40 000 F", price_per_month: "420 000 F",
    amenities: studioAmenities,
    images: ["/images/gallery/IMG_4009.jpg", "/images/appartements/IMG_4212.jpg", "/images/gallery/IMG_4188.jpg", "/images/gallery/DFC0BEA9-C7FE-4500-91CF-48D6F9F02EB1.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "20", title: "1 Chambre salon Standard", type: "Chambre Salon", status: "Disponible", floor: 1,
    description: studioDesc,
    capacity: "20 m²", price_per_night: "40 000 F", price_per_month: "420 000 F",
    amenities: studioAmenities,
    images: ["/images/appartements/IMG_4211.jpg", "/images/gallery/IMG_4234.jpg", "/images/gallery/IMG_4230.jpg", "/images/gallery/BCC6E7A7-A8B1-40AD-9DD0-A73A219B7FC0.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "1", title: "1 Chambre salon Confort", type: "Chambre Salon", status: "Disponible", floor: 0,
    description: "Appartement 1 Chambre de 20 m² avec espace confort.\n\n" + studioDesc,
    capacity: "20 m²", price_per_night: "50 000 F", price_per_month: "500 000 F",
    amenities: studioAmenities,
    images: ["/images/gallery/IMG_4283.jpg", "/images/appartements/IMG_4247.jpg", "/images/gallery/IMG_4240.jpg", "/images/gallery/piscine1.jpg", "/images/gallery/IMG_4606.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "56", title: "1 Chambre salon Confort", type: "Chambre Salon", status: "Disponible", floor: 2,
    description: "Appartement 1 Chambre de 20 m² avec espace confort.\n\n" + studioDesc,
    capacity: "20 m²", price_per_night: "50 000 F", price_per_month: "500 000 F",
    amenities: studioAmenities,
    images: ["/images/gallery/IMG_4234.jpg", "/images/appartements/IMG_4201.jpg", "/images/gallery/IMG_4009.jpg", "/images/gallery/IMG_4683.jpg", "/images/gallery/piscine.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "2", title: "2 Chambres salon Standard", type: "2 Chambres Salon", status: "Disponible", floor: 0,
    description: deuxChambresDesc,
    capacity: "75 m²", price_per_night: "80 000 F", price_per_month: "600 000 F",
    amenities: deuxChambresAmenities,
    images: ["/images/appartements/IMG_4247.jpg", "/images/appartements/IMG_4211.jpg", "/images/gallery/IMG_4230.jpg", "/images/gallery/IMG_4240.jpg", "/images/gallery/piscine1.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "3", title: "2 Chambres salon Standard", type: "2 Chambres Salon", status: "Disponible", floor: 0,
    description: deuxChambresDesc,
    capacity: "75 m²", price_per_night: "80 000 F", price_per_month: "600 000 F",
    amenities: deuxChambresAmenities,
    images: ["/images/appartements/IMG_4201.jpg", "/images/appartements/IMG_4212.jpg", "/images/gallery/IMG_4283.jpg", "/images/gallery/IMG_4188.jpg", "/images/gallery/piscine.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "78", title: "2 Chambres salon Pro", type: "2 Chambres Salon", status: "Disponible", floor: 3,
    description: "Appartement 2 Chambres Pro de 75 m². Finitions et services premium.\n\n" + deuxChambresDesc,
    capacity: "75 m²", price_per_night: "100 000 F", price_per_month: "700 000 F",
    amenities: deuxChambresAmenities,
    images: ["/images/gallery/IMG_4606.jpg", "/images/appartements/IMG_4247.jpg", "/images/gallery/IMG_4234.jpg", "/images/gallery/IMG_4683.jpg", "/images/gallery/piscine1.jpg", "/images/gallery/IMG_4009.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "30", title: "3 Chambres salon Standard", type: "3 Chambres Salon", status: "Disponible", floor: 1,
    description: troisChambresDesc,
    capacity: "85 m²", price_per_night: "100 000 F", price_per_month: "700 000 F",
    amenities: troisChambresAmenities,
    images: ["/images/gallery/IMG_4683.jpg", "/images/appartements/IMG_4211.jpg", "/images/appartements/IMG_4247.jpg", "/images/gallery/IMG_4230.jpg", "/images/gallery/IMG_4240.jpg", "/images/gallery/piscine.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  },
  {
    id: "10", title: "3 Chambres salon Pro", type: "3 Chambres Salon", status: "Disponible", floor: 1,
    description: "Appartement 3 Chambres Pro de 85 m². Le sommet du confort.\n\n" + troisChambresDesc,
    capacity: "85 m²", price_per_night: "100 000 F", price_per_month: "750 000 F",
    amenities: troisChambresAmenities,
    images: ["/images/gallery/piscine1.jpg", "/images/gallery/IMG_4606.jpg", "/images/appartements/IMG_4201.jpg", "/images/gallery/IMG_4283.jpg", "/images/gallery/IMG_4234.jpg", "/images/gallery/IMG_4009.jpg", "/images/gallery/piscine.jpg"],
    videoUrls: ["/videos/IMG_0077.mp4"]
  }
];

