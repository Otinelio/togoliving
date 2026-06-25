import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Wifi, Wind, Tv, Coffee, Car, Plane, Waves, Droplets, GlassWater,
  UtensilsCrossed, BedDouble, Play, Loader2,
} from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { useAccommodations } from "@/hooks/useAccommodations";
import { useRooms } from "@/hooks/useRooms";

import { ASSETS } from "@/lib/assets";
import { OptimizedImage } from "@/components/OptimizedImage";

// Fallback images from Supabase Storage
const hebergementsHero = ASSETS.piscine;
const img3ChambresSalon = ASSETS.troisChambresSalonIMG4247;
const imgStudio = ASSETS.studioIMG4201;
const imgChambreSalon = ASSETS.chambreSalonIMG4211;
const img2Chambres = ASSETS.deuxChambresIMG4212;

// Videos served from Supabase Storage
const vidStudio = ASSETS.videoIMG0077;
const vidStandard = ASSETS.videoIMG0085;
const vidSuperieur = ASSETS.videoIMG0285;
const vidSupreme = ASSETS.videoIMG1684;

// Icon map for features stored in DB
const ICON_MAP: Record<string, typeof Wifi> = {
  "WiFi Gratuit": Wifi,
  "Climatisation": Wind,
  "TV Canal+ / Satellite": Tv,
  "TV Satellite": Tv,
  "Réfrigérateur": Coffee,
  "Patio privé": Waves,
  "Patio": Waves,
  "Table à manger": UtensilsCrossed,
  "Canapés": BedDouble,
  "Terrasse vue mer": Waves,
  "Literie premium": BedDouble,
  "Grande Terrasse": Waves,
  "Lits King Size": BedDouble,
  "Salle à manger": UtensilsCrossed,
};



// VideoWithPoster: affiche une image pendant le chargement, puis la vidéo
function VideoWithPoster({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      <OptimizedImage
        src={poster}
        alt="Aperçu"
        width="800"
        height="420"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play size={20} className="text-white ml-0.5" />
            </div>
            <span className="text-xs text-white/80 font-medium bg-black/30 backdrop-blur px-2 py-0.5 rounded-full">Chargement...</span>
          </div>
        </div>
      )}
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}




export const Route = createFileRoute("/hebergements")({
  head: () => ({
    meta: [
      { title: "Appartements Vue Mer à Lomé | TOGOLIVING Résidence" },
      { name: "description", content: "Studio, Chambre Salon Standard 40m2 et Supérieur 50m2 vue mer à Kpogan Agbetsiko, Lomé." },
      { property: "og:title", content: "Hébergements TOGOLIVING" },
      { property: "og:url", content: "https://residencetogoliving.com/hebergements" },
    ],
    links: [{ rel: "canonical", href: "https://residencetogoliving.com/hebergements" }],
  }),
  component: Page,
});

function Page() {
  const { t } = useTranslation();
  const amenities = [
    { icon: Wifi, label: t("accommodations.amenities.items.wifi") },
    { icon: Wind, label: t("accommodations.amenities.items.ac") },
    { icon: Tv, label: t("accommodations.amenities.items.tv") },
    { icon: Coffee, label: t("accommodations.amenities.items.breakfast") },
    { icon: Car, label: t("accommodations.amenities.items.parking") },
    { icon: Plane, label: t("accommodations.amenities.items.shuttle") },
    { icon: Waves, label: t("accommodations.amenities.items.beach") },
    { icon: Droplets, label: t("accommodations.amenities.items.pool") },
    { icon: GlassWater, label: t("accommodations.amenities.items.bar") },
    { icon: UtensilsCrossed, label: t("accommodations.amenities.items.restaurant") },
  ];
  const { items: dbRooms, isLoading } = useAccommodations();
  const { rooms: dbRoomStatuses } = useRooms();
  // Use DB data exclusively
  const rooms = dbRooms;

  // No longer needed to calculate available string on the category page
  // The detailed page will handle individual rooms.

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage src={hebergementsHero} alt="Hébergements Hero" width="1920" height="600" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 to-ocean" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">{t("accommodations.hero.subtitle")}</p>
          <h1 className="font-display text-5xl md:text-6xl">{t("accommodations.hero.title")}</h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">{t("accommodations.hero.desc")}</p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-6xl mx-auto px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-ocean"><Loader2 size={32} className="animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {rooms.map((r) => {
                return (
                  <Link
                    key={r.title}
                    // @ts-ignore
                    to={`/hebergements/${encodeURIComponent(r.title.toLowerCase().replace(/ /g, "-"))}`}
                    className="block group cursor-pointer"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-3xl overflow-hidden border border-ocean/10 hover:border-turquoise/40 transition-all duration-300 flex flex-col h-full hover:-translate-y-1.5 shadow-sm hover:shadow-md"
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        {r.videoUrl ? (
                          <VideoWithPoster
                            src={r.videoUrl}
                            poster={r.posterUrl ?? r.imageUrl ?? ""}
                            className="w-full h-full"
                          />
                        ) : (
                          <OptimizedImage
                            src={r.imageUrl ?? ""}
                            alt={r.title}
                            width="800"
                            height="450"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        {r.badge && (
                          <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider ${r.isPremium ? "bg-gold text-ocean" : "bg-turquoise text-ocean"}`}>
                            {r.badge}
                          </span>
                        )}
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                        <h2 className="font-display text-2xl md:text-3xl text-ocean group-hover:text-gold transition-colors duration-300">
                          {r.title}
                        </h2>
                        <p className="font-accent text-turquoise text-base mt-1">
                          {r.subtitle ?? r.badge}
                        </p>
                        <p className="text-muted-foreground mt-4 text-sm leading-relaxed flex-grow">
                          {r.description}
                        </p>
                        <div className="mt-6 flex items-center gap-1 text-sm font-semibold text-ocean group-hover:text-gold transition-colors duration-300 self-end">
                          {t("accommodations.category.show_more")} <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      <section className="bg-ocean text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-accent text-turquoise text-xl">{t("accommodations.amenities.subtitle")}</p>
            <h2 className="font-display text-4xl">{t("accommodations.amenities.title")}</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {amenities.map((a, i) => (
              <motion.div key={a.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass-dark p-5 text-center hover-lift">
                <a.icon className="mx-auto text-turquoise mb-2" size={26} />
                <div className="text-sm">{a.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
