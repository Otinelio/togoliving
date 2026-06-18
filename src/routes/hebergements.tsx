import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wifi, Wind, Tv, Coffee, Car, Plane, Waves, Droplets, GlassWater,
  UtensilsCrossed, BedDouble, Play,
} from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import hebergementsHero from "@/Assets/images/piscine/piscine.jpg";
import img3ChambresSalon from "@/Assets/images/appartements/IMG_4247.jpg";
import imgStudio from "@/Assets/images/appartements/IMG_4201.jpg";
import imgChambreSalon from "@/Assets/images/appartements/IMG_4211.jpg";
import img2Chambres from "@/Assets/images/appartements/IMG_4212.jpg";

// Videos are served from public/ to avoid bundling large files
const vidStudio = "/videos/IMG_0077.mp4";
const vidStandard = "/videos/IMG_0085.MP4";
const vidSuperieur = "/videos/IMG_0285.MP4";
const vidSupreme = "/videos/IMG_1684.MP4";

// VideoWithPoster: affiche une image pendant le chargement, puis la vidéo
function VideoWithPoster({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Poster image — visible tant que la vidéo n'est pas prête */}
      <img
        src={poster}
        alt="Aperçu"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
      {/* Indicateur de chargement */}
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
      {/* Vidéo */}
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => { setLoaded(true); setPlaying(true); }}
        className={`w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

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

const rooms = [
  {
    title: "Studios",
    subtitle: "Appartement 1 pièce",
    badge: "1 Pièce",
    img: imgStudio,
    video: vidStudio,
    poster: imgStudio,
    desc: "Espace confortable, ventilé et climatisé, idéal pour un séjour solo ou en couple avec patio privatif.",
    prices: [
      { variant: "Studio Standard", num: "N° 4, 5, 6, 7", day: "30 000 F", month: "300 000 F" },
      { variant: "Studio Pro",      num: "N° 34",          day: "35 000 F", month: "350 000 F" },
    ],
    features: [
      { icon: Wifi,   label: "WiFi Gratuit" },
      { icon: Wind,   label: "Climatisation" },
      { icon: Tv,     label: "TV Canal+ / Satellite" },
      { icon: Coffee, label: "Réfrigérateur" },
      { icon: Waves,  label: "Patio privé" },
    ],
  },
  {
    title: "1 Chambre Salon",
    subtitle: "Appartement 2 pièces",
    badge: "2 Pièces",
    img: imgChambreSalon,
    video: vidStandard,
    poster: imgChambreSalon,
    desc: "Grand salon avec espace de vie confortable, idéal pour des séjours prolongés en toute sérénité.",
    prices: [
      { variant: "Chambre Salon Standard", num: "N° 8, 9, 20", day: "40 000 F", month: "420 000 F" },
      { variant: "Chambre Salon Confort",  num: "N° 1, 56",    day: "50 000 F", month: "500 000 F" },
    ],
    features: [
      { icon: Wifi,           label: "WiFi Gratuit" },
      { icon: Wind,           label: "Climatisation" },
      { icon: Tv,             label: "TV Satellite" },
      { icon: UtensilsCrossed,label: "Table à manger" },
      { icon: BedDouble,      label: "Canapés" },
      { icon: Waves,          label: "Patio" },
    ],
  },
  {
    title: "2 Chambres Salon",
    subtitle: "Appartement 3 pièces",
    badge: "3 Pièces",
    premium: true,
    img: img2Chambres,
    video: vidSuperieur,
    poster: img2Chambres,
    desc: "Appartement spacieux avec deux chambres séparées et terrasse vue mer. Parfait pour les familles.",
    prices: [
      { variant: "2 Chambres Salon Standard", num: "N° 2, 3", day: "80 000 F",  month: "600 000 F" },
      { variant: "2 Chambres Salon Pro",      num: "N° 78",   day: "100 000 F", month: "700 000 F" },
    ],
    features: [
      { icon: Wifi,           label: "WiFi Gratuit" },
      { icon: Wind,           label: "Climatisation" },
      { icon: Tv,             label: "TV Satellite" },
      { icon: Waves,          label: "Terrasse vue mer" },
      { icon: BedDouble,      label: "Literie premium" },
      { icon: UtensilsCrossed,label: "Table à manger" },
    ],
  },
  {
    title: "3 Chambres Salon",
    subtitle: "Appartement VIP · 4 pièces",
    badge: "VIP · 4 Pièces",
    premium: true,
    img: img3ChambresSalon,
    video: vidSupreme,
    poster: img3ChambresSalon,
    desc: "Immense espace de vie avec trois chambres pour les grandes familles ou groupes, avec un confort maximal.",
    prices: [
      { variant: "3 Chambres Salon Standard", num: "N° 30", day: "100 000 F", month: "700 000 F" },
      { variant: "3 Chambres Salon Pro",      num: "N° 10", day: "100 000 F", month: "750 000 F" },
    ],
    features: [
      { icon: Wifi,           label: "WiFi Gratuit" },
      { icon: Wind,           label: "Climatisation" },
      { icon: Tv,             label: "TV Satellite" },
      { icon: Waves,          label: "Grande Terrasse" },
      { icon: BedDouble,      label: "Lits King Size" },
      { icon: UtensilsCrossed,label: "Salle à manger" },
    ],
  },
];

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


function Page() {
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
          {rooms.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="relative">
                {r.video ? (
                  <VideoWithPoster
                    src={r.video}
                    poster={(r as any).poster ?? r.img}
                    className="w-full h-[420px] rounded-2xl shadow-xl shadow-ocean/20"
                  />
                ) : (
                  <img src={r.img} alt={r.title} loading="lazy" className="w-full h-[420px] object-cover rounded-2xl shadow-xl shadow-ocean/20" />
                )}
                {r.badge && (
                  <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider ${r.premium ? "bg-gold text-ocean" : "bg-turquoise text-ocean"}`}>
                    {r.badge}
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-ocean">{r.title}</h2>
                <p className="font-accent text-turquoise text-lg mt-1">{(r as any).subtitle ?? r.badge}</p>
                <p className="text-muted-foreground mt-4">{r.desc}</p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {r.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 text-sm text-ocean">
                      <f.icon size={18} className="text-turquoise" /> {f.label}
                    </div>
                  ))}
                </div>
                {r.prices && (
                  <div className="mt-6 flex flex-col gap-3">
                    <span className="text-sm font-semibold text-ocean uppercase tracking-wide">Tarifs & Réservation directe</span>
                    <div className="grid gap-3">
                      {r.prices.map((p, idx) => (
                        <div key={idx} className="rounded-xl bg-white/60 border border-ocean/10 hover:border-turquoise/40 transition overflow-hidden">
                          {/* Variant label */}
                          <div className={`px-4 py-1.5 text-xs font-semibold tracking-wider ${r.premium ? "bg-gold/20 text-ocean border-b border-gold/20" : "bg-turquoise/10 text-ocean border-b border-turquoise/15"}`}>
                            {(p as any).variant ?? p.num}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5">
                            <div>
                              <span className="font-medium text-ocean font-display text-base">Chambre {p.num}</span>
                              <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-3">
                                <span><strong className="text-ocean">{p.day}</strong> / jour</span>
                                <span><strong className="text-ocean">{p.month}</strong> / mois</span>
                              </div>
                            </div>
                            <a
                              href={`/reserver?cat=${i}&var=${idx}&room=${encodeURIComponent(p.num.split(",")[0].trim())}`}
                              className="mt-3 sm:mt-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-ocean text-white text-sm font-medium hover:bg-gold hover:text-ocean transition shimmer-gold whitespace-nowrap"
                            >
                              Réserver →
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
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
