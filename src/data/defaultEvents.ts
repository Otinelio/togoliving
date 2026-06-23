import { ASSETS } from "@/lib/assets";

export type AppEvent = {
  id: string;
  title: string;
  date: string;
  description: string;
  img: string; // Main image (thumbnail)
  images?: string[]; // Additional images for gallery
  videoUrls?: string[]; // Additional videos for gallery
  status: "published" | "draft";
};

export const DEFAULT_EVENTS: AppEvent[] = [
  {
    id: "evt_1",
    title: "Soirée DJ Set Pool Party",
    date: "Samedi Prochain - 20h00",
    description: "Ambiance tropicale autour de la piscine avec notre DJ invité. Cocktails spéciaux et tapas.",
    img: ASSETS.bar69A51,
    status: "published",
  },
  {
    id: "evt_2",
    title: "Dîner & Concert Live",
    date: "Vendredi Prochain - 19h30",
    description: "Dîner spectacle au restaurant Living's accompagné d'un groupe de musique live.",
    img: ASSETS.interieurIMG4683,
    status: "published",
  },
  {
    id: "evt_3",
    title: "Soirée Blanche VIP",
    date: "À venir le mois prochain",
    description: "Tenue blanche exigée. Accès privilégié à la terrasse panoramique, champagne et surprises.",
    img: ASSETS.barIMG4009,
    status: "published",
  }
];
