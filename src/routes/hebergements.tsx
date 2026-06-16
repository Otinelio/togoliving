import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Wifi, Wind, Tv, Coffee, Car, Plane, Waves, Droplets, GlassWater,
  UtensilsCrossed, BedDouble, MessageCircle,
} from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { whatsappUrl } from "@/lib/whatsapp";
import hebergementsHero from "@/Assets/images/piscine/piscine.jpg";

// Videos are served from public/ to avoid bundling large files
const vidStudio = "/videos/IMG_0077.mp4";
const vidStandard = "/videos/IMG_0085.MP4";
const vidSuperieur = "/videos/IMG_0285.MP4";

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
    title: "Studio",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    video: vidStudio,
    desc: "Espace confortable, ventile et climatise, ideal pour un sejour solo ou en couple. Vue ville ou mer selon disponibilite.",
    features: [
      { icon: Wifi, label: "WiFi Gratuit" },
      { icon: Wind, label: "Climatisation" },
      { icon: Tv,   label: "TV Canal+ / Satellite" },
      { icon: Coffee, label: "Refrigerateur" },
      { icon: Waves, label: "Patio prive" },
    ],
  },
  {
    title: "Chambre Salon Standard",
    badge: "40 m²",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
    video: vidStandard,
    desc: "Grand salon avec table a manger et canapes. Espace de vie ideal pour familles ou sejours prolonges en confort.",
    features: [
      { icon: Wifi, label: "WiFi Gratuit" }, { icon: Wind, label: "Climatisation" }, { icon: Tv, label: "TV Satellite" },
      { icon: UtensilsCrossed, label: "Table a manger" }, { icon: BedDouble, label: "Canapes" }, { icon: Waves, label: "Patio" },
    ],
  },
  {
    title: "Chambre Salon Superieur",
    badge: "SUPERIEUR · 50 m²",
    premium: true,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
    video: vidSuperieur,
    desc: "Espace premium avec terrasse vue mer, literie haut de gamme. Parfait pour longs sejours et familles exigeantes.",
    features: [
      { icon: Wifi, label: "WiFi Gratuit" }, { icon: Wind, label: "Climatisation" }, { icon: Tv, label: "TV Satellite" },
      { icon: Waves, label: "Terrasse vue mer" }, { icon: BedDouble, label: "Literie premium" }, { icon: UtensilsCrossed, label: "Table a manger" },
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
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">3 types d'appartements meubles, climatises, avec WiFi gratuit et acces direct a la plage.</p>
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
                  <video src={r.video} autoPlay muted loop playsInline className="w-full h-[420px] object-cover rounded-2xl shadow-xl shadow-ocean/20" />
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
                <p className="font-accent text-turquoise text-lg mt-1">Vue mer · {r.badge ?? "Studio"}</p>
                <p className="text-muted-foreground mt-4">{r.desc}</p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {r.features.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 text-sm text-ocean">
                      <f.icon size={18} className="text-turquoise" /> {f.label}
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="text-sm text-muted-foreground">A partir de</span>
                  <span className="font-display text-2xl text-gold">Contactez-nous</span>
                </div>
                <a href={whatsappUrl(`Bonjour TOGOLIVING, je souhaite reserver: ${r.title}`)} target="_blank" rel="noreferrer"
                   className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition shimmer-gold">
                  <MessageCircle size={18} /> Reserver via WhatsApp
                </a>
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
