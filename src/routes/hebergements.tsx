import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wifi, Wind, Tv, Coffee, Car, Plane, Waves, Droplets, GlassWater,
  UtensilsCrossed, BedDouble, Play, Loader2,
} from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { useAccommodations } from "@/hooks/useAccommodations";
import { useRooms } from "@/hooks/useRooms";

import { ASSETS } from "@/lib/assets";

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
      <img
        src={poster}
        alt="Aperçu"
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


const amenities = [
  { icon: Wifi, label: "WiFi Gratuit" },
  { icon: Wind, label: "Climatisation" },
  { icon: Tv, label: "TV Satellite + Canal+" },
  { icon: Coffee, label: "Petit-dejeuner disponible" },
  { icon: Car, label: "Parking Prive Gratuit" },
  { icon: Plane, label: "Navette Aeroport (sur demande)" },
  { icon: Waves, label: "Acces Plage" },
  { icon: Droplets, label: "Piscine" },
  { icon: GlassWater, label: "Cocktail Bar" },
  { icon: UtensilsCrossed, label: "Restaurant sur place" },
];

export const Route = createFileRoute("/hebergements")({
  head: () => ({
    meta: [
      { title: "Appartements Vue Mer a Lome | TOGOLIVING Residence" },
      { name: "description", content: "Studio, Chambre Salon Standard 40m2 et Superieur 50m2 vue mer a Kpogan Agbetsiko, Lome." },
      { property: "og:title", content: "Hebergements TOGOLIVING" },
      { property: "og:url", content: "/hebergements" },
    ],
    links: [{ rel: "canonical", href: "/hebergements" }],
  }),
  component: Page,
});

function Page() {
  const { items: dbRooms, isLoading } = useAccommodations();
  const { rooms: dbRoomStatuses } = useRooms();
  // Use DB data exclusively
  const rooms = dbRooms;

  // No longer needed to calculate available string on the category page
  // The detailed page will handle individual rooms.

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${hebergementsHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 to-ocean" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Nos Espaces</p>
          <h1 className="font-display text-5xl md:text-6xl">Nos Hebergements</h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">4 types d'appartements meubles, climatises, avec WiFi gratuit et acces direct a la plage.</p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-ocean"><Loader2 size={32} className="animate-spin" /></div>
          ) : (
            rooms.map((r, i) => {
              const features = (r.features ?? []) as { label: string }[];
              const prices = (r.prices ?? []) as { variant?: string; num: string; day: string; month: string }[];
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="relative">
                    {r.videoUrl ? (
                      <VideoWithPoster
                        src={r.videoUrl}
                        poster={r.posterUrl ?? r.imageUrl ?? ""}
                        className="w-full h-[420px] rounded-2xl shadow-xl shadow-ocean/20"
                      />
                    ) : (
                      <img src={r.imageUrl ?? ""} alt={r.title} loading="lazy" className="w-full h-[420px] object-cover rounded-2xl shadow-xl shadow-ocean/20" />
                    )}
                    {r.badge && (
                      <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider ${r.isPremium ? "bg-gold text-ocean" : "bg-turquoise text-ocean"}`}>
                        {r.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl text-ocean">{r.title}</h2>
                    <p className="font-accent text-turquoise text-lg mt-1">{r.subtitle ?? r.badge}</p>
                    <p className="text-muted-foreground mt-4">{r.description}</p>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {features.map((f) => {
                        const Icon = ICON_MAP[f.label] ?? Wifi;
                        return (
                          <div key={f.label} className="flex items-center gap-2 text-sm text-ocean">
                            <Icon size={18} className="text-turquoise" /> {f.label}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-8">
                      <Link
                        // @ts-ignore
                        to={`/hebergements/${encodeURIComponent(r.title.toLowerCase().replace(/ /g, "-"))}`}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition shimmer-gold"
                      >
                        Voir les {r.title} →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      <section className="bg-ocean text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-accent text-turquoise text-xl">Tout inclus</p>
            <h2 className="font-display text-4xl">Equipements & Services</h2>
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
