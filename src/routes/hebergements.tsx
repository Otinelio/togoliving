import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Wifi, Wind, Tv, Coffee, Car, Plane, Waves, Droplets, GlassWater,
  UtensilsCrossed, BedDouble, MessageCircle, X, Play,
} from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { whatsappUrl } from "@/lib/whatsapp";
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
    badge: "1 Pièce",
    img: imgStudio,
    video: vidStudio,
    desc: "Espace confortable, ventile et climatise, ideal pour un sejour solo ou en couple.",
    prices: [
      { num: "N° 4, 5, 6, 7", day: "30 000 FCFA", month: "300 000 FCFA" },
      { num: "N° 34", day: "35 000 FCFA", month: "350 000 FCFA" }
    ],
    poster: imgStudio,
    features: [
      { icon: Wifi, label: "WiFi Gratuit" },
      { icon: Wind, label: "Climatisation" },
      { icon: Tv,   label: "TV Canal+ / Satellite" },
      { icon: Coffee, label: "Refrigerateur" },
      { icon: Waves, label: "Patio prive" },
    ],
  },
  {
    title: "Chambre Salon",
    badge: "2 Pièces",
    img: imgChambreSalon,
    video: vidStandard,
    poster: imgChambreSalon,
    desc: "Grand salon avec espace de vie ideal pour sejours prolonges en confort.",
    prices: [
      { num: "N° 8, 9, 20", day: "40 000 FCFA", month: "420 000 FCFA" },
      { num: "N° 1, 56", day: "50 000 FCFA", month: "500 000 FCFA" }
    ],
    features: [
      { icon: Wifi, label: "WiFi Gratuit" }, { icon: Wind, label: "Climatisation" }, { icon: Tv, label: "TV Satellite" },
      { icon: UtensilsCrossed, label: "Table a manger" }, { icon: BedDouble, label: "Canapes" }, { icon: Waves, label: "Patio" },
    ],
  },
  {
    title: "2 Chambres Salon",
    badge: "3 Pièces",
    premium: true,
    img: img2Chambres,
    video: vidSuperieur,
    poster: img2Chambres,
    desc: "Appartement spacieux avec deux chambres separees et terrasse vue mer. Parfait pour familles.",
    prices: [
      { num: "N° 2, 3", day: "80 000 FCFA", month: "600 000 FCFA" },
      { num: "N° 78", day: "100 000 FCFA", month: "700 000 FCFA" }
    ],
    features: [
      { icon: Wifi, label: "WiFi Gratuit" }, { icon: Wind, label: "Climatisation" }, { icon: Tv, label: "TV Satellite" },
      { icon: Waves, label: "Terrasse vue mer" }, { icon: BedDouble, label: "Literie premium" }, { icon: UtensilsCrossed, label: "Table a manger" },
    ],
  },
  {
    title: "3 Chambres Salon",
    badge: "VIP · 4 Pièces",
    premium: true,
    img: img3ChambresSalon,
    video: vidSupreme,
    poster: img3ChambresSalon,
    desc: "Immense espace de vie avec trois chambres pour les grands groupes ou les familles nombreuses, offrant un maximum de confort.",
    prices: [
      { num: "N° 30", day: "100 000 FCFA", month: "700 000 FCFA" },
      { num: "N° 10", day: "100 000 FCFA", month: "750 000 FCFA" }
    ],
    features: [
      { icon: Wifi, label: "WiFi Gratuit" }, { icon: Wind, label: "Climatisation" }, { icon: Tv, label: "TV Satellite" },
      { icon: Waves, label: "Grande Terrasse" }, { icon: BedDouble, label: "Lits King Size" }, { icon: UtensilsCrossed, label: "Salle a manger" },
    ],
  }
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

function BookingModal({ isOpen, onClose, room, priceInfo }: { isOpen: boolean, onClose: () => void, room: any, priceInfo: any }) {
  const [d, setD] = useState({ nom: "", arrivee: "", depart: "", demandes: "" });

  if (!isOpen || !room || !priceInfo) return null;

  const send = () => {
    const msg = `Bonjour TOGOLIVING,\nJe souhaite reserver: ${room.title} (${priceInfo.num}) au tarif de ${priceInfo.month}/mois.\nNom: ${d.nom}\nArrivee: ${d.arrivee || "A definir"}\nDepart: ${d.depart || "A definir"}\nDemandes: ${d.demandes || "Aucune"}`;
    window.open(whatsappUrl(msg), "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean/80 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-sand rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-display text-2xl text-ocean">Reserver {priceInfo.num}</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-ocean/10 text-ocean transition"><X size={20} /></button>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-ocean">Nom complet</span>
            <input value={d.nom} onChange={(e) => setD({ ...d, nom: e.target.value })} className="mt-1 w-full rounded-lg border border-ocean/20 px-3 py-2.5 bg-white focus:outline-none focus:border-turquoise" placeholder="Votre nom" />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-sm font-medium text-ocean">Arrivee</span>
              <input type="date" value={d.arrivee} onChange={(e) => setD({ ...d, arrivee: e.target.value })} className="mt-1 w-full rounded-lg border border-ocean/20 px-3 py-2.5 bg-white focus:outline-none focus:border-turquoise" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ocean">Depart</span>
              <input type="date" value={d.depart} onChange={(e) => setD({ ...d, depart: e.target.value })} className="mt-1 w-full rounded-lg border border-ocean/20 px-3 py-2.5 bg-white focus:outline-none focus:border-turquoise" />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-ocean">Description / Demandes</span>
            <textarea rows={3} value={d.demandes} onChange={(e) => setD({ ...d, demandes: e.target.value })} className="mt-1 w-full rounded-lg border border-ocean/20 px-3 py-2 bg-white focus:outline-none focus:border-turquoise" placeholder="Vos attentes ou questions..." />
          </label>
          <button onClick={send} className="w-full mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-turquoise text-ocean font-medium hover:bg-gold transition shimmer-gold">
            <MessageCircle size={18} /> Envoyer sur WhatsApp
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function Page() {
  const [selectedBooking, setSelectedBooking] = useState<{ room: any, price: any } | null>(null);

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
                <p className="font-accent text-turquoise text-lg mt-1">{r.badge}</p>
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
                    <span className="text-sm font-semibold text-ocean">Tarifs & Reservation directe :</span>
                    <div className="grid gap-3">
                      {r.prices.map((p, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-white/50 border border-ocean/10 hover:border-turquoise/40 transition">
                          <div>
                            <span className="font-medium text-ocean font-display text-lg">{p.num}</span>
                            <div className="text-sm text-muted-foreground mt-1 flex gap-3">
                              <span><strong className="text-ocean">{p.day}</strong> / jour</span>
                              <span><strong className="text-ocean">{p.month}</strong> / mois</span>
                            </div>
                          </div>
                          <button onClick={() => setSelectedBooking({ room: r, price: p })}
                             className="mt-3 sm:mt-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-ocean text-white text-sm font-medium hover:bg-gold hover:text-ocean transition shimmer-gold whitespace-nowrap">
                            <MessageCircle size={16} /> Reserver
                          </button>
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

      <BookingModal isOpen={!!selectedBooking} onClose={() => setSelectedBooking(null)} room={selectedBooking?.room} priceInfo={selectedBooking?.price} />
    </>
  );
}
