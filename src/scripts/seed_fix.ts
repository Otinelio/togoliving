import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const FALLBACK_ROOMS = [
  {
    title: "Studios",
    subtitle: "Appartement 1 pièce",
    badge: "1 Pièce",
    isPremium: false,
    imageUrl: "/images/appartements/IMG_4201.jpg",
    videoUrl: "/videos/IMG_0077.mp4",
    posterUrl: "/images/appartements/IMG_4201.jpg",
    description: "Espace confortable, ventilé et climatisé, idéal pour un séjour solo ou en couple avec patio privatif.",
    prices: [
      { variant: "Studio Standard", num: "N° 4, 5, 6, 7", day: "30 000 F", month: "300 000 F" },
      { variant: "Studio Pro", num: "N° 34", day: "35 000 F", month: "350 000 F" },
    ],
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Canal+ / Satellite" },
      { label: "Réfrigérateur" }, { label: "Patio privé" },
    ],
  },
  {
    title: "Chambre Salon",
    subtitle: "Appartement 2 pièces",
    badge: "2 Pièces",
    isPremium: false,
    imageUrl: "/images/appartements/IMG_4211.jpg",
    videoUrl: "/videos/IMG_0085.MP4",
    posterUrl: "/images/appartements/IMG_4211.jpg",
    description: "Grand salon avec espace de vie confortable, idéal pour des séjours prolongés en toute sérénité.",
    prices: [
      { variant: "Chambre Salon Standard", num: "N° 8, 9, 20", day: "40 000 F", month: "420 000 F" },
      { variant: "Chambre Salon Confort", num: "N° 1, 56", day: "50 000 F", month: "500 000 F" },
    ],
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Satellite" },
      { label: "Table à manger" }, { label: "Canapés" }, { label: "Patio" },
    ],
  },
  {
    title: "2 Chambres Salon",
    subtitle: "Appartement 3 pièces",
    badge: "3 Pièces",
    isPremium: true,
    imageUrl: "/images/appartements/IMG_4212.jpg",
    videoUrl: "/videos/IMG_0285.MP4",
    posterUrl: "/images/appartements/IMG_4212.jpg",
    description: "Appartement spacieux avec deux chambres séparées et terrasse vue mer. Parfait pour les familles.",
    prices: [
      { variant: "2 Chambres Salon Standard", num: "N° 2, 3", day: "80 000 F", month: "600 000 F" },
      { variant: "2 Chambres Salon Pro", num: "N° 78", day: "100 000 F", month: "700 000 F" },
    ],
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Satellite" },
      { label: "Terrasse vue mer" }, { label: "Literie premium" }, { label: "Table à manger" },
    ],
  },
  {
    title: "3 Chambres Salon",
    subtitle: "Appartement VIP · 4 pièces",
    badge: "VIP · 4 Pièces",
    isPremium: true,
    imageUrl: "/images/appartements/IMG_4247.jpg",
    videoUrl: "/videos/IMG_1684.MP4",
    posterUrl: "/images/appartements/IMG_4247.jpg",
    description: "Immense espace de vie avec trois chambres pour les grandes familles ou groupes, avec un confort maximal.",
    prices: [
      { variant: "3 Chambres Salon Standard", num: "N° 30", day: "100 000 F", month: "700 000 F" },
      { variant: "3 Chambres Salon Pro", num: "N° 10", day: "100 000 F", month: "750 000 F" },
    ],
    features: [
      { label: "WiFi Gratuit" }, { label: "Climatisation" }, { label: "TV Satellite" },
      { label: "Grande Terrasse" }, { label: "Lits King Size" }, { label: "Salle à manger" },
    ],
  },
];

async function seed() {
  console.log("Emptying accommodations...");
  const { error: delError } = await supabase.from("accommodations").delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) console.error("Error emptying accommodations:", delError.message);

  console.log("Seeding exact accommodations...");
  for (const acc of FALLBACK_ROOMS) {
    const { error } = await supabase.from("accommodations").insert(acc);
    if (error) console.error("Error inserting", acc.title, error.message);
  }

  console.log("Fixing admin PIN...");
  const { error: pinError } = await supabase.from("site_settings").update({ pinAdmin: "9999" }).eq("id", "default");
  if (pinError) console.error("Error fixing pin:", pinError.message);

  console.log("All done!");
}

seed();
