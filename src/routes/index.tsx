import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Waves, BedDouble, Droplets, UtensilsCrossed, Wifi, Wind, Tv, Coffee,
  Star, MapPin, ArrowRight, Calendar, Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOGOLIVING — Villa Balneaire Tropicale | Kpogan Agbetsiko, Lome, Togo" },
      { name: "description", content: "Residence balneaire de luxe a 100m de la plage naturelle. Studio, appartements vue mer, piscine panoramique, restaurant aux saveurs du monde." },
      { property: "og:title", content: "TOGOLIVING — L'Ocean a votre Porte" },
      { property: "og:description", content: "Villa balneaire tropicale a Kpogan Agbetsiko, Lome." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const heroImg = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=80";
const poolImg = "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80";
const restoImg = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80";

const rooms = [
  {
    id: "studio",
    title: "Studio",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    features: ["WiFi", "AC", "TV Satellite", "Refrigerateur", "Patio"],
    desc: "Espace confortable, ideal pour un sejour solo ou en couple.",
  },
  {
    id: "standard",
    title: "Chambre Salon Standard",
    badge: "40 m²",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    features: ["WiFi", "AC", "TV Satellite", "Table a manger", "Canapes", "Patio"],
    desc: "Grand salon avec table a manger, ideal pour familles.",
  },
  {
    id: "superieur",
    title: "Chambre Salon Superieur",
    badge: "PREMIUM 50 m²",
    premium: true,
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    features: ["Vue mer", "Terrasse", "Literie premium", "WiFi", "AC", "TV Satellite"],
    desc: "Espace premium avec terrasse vue mer pour longs sejours.",
  },
];

function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return controls.stop;
  }, [inView, to, duration, mv]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function QuickBooking() {
  const [type, setType] = useState("Studio");
  const [arrivee, setArrivee] = useState("");
  const [depart, setDepart] = useState("");
  const [personnes, setPersonnes] = useState("2");

  const send = () => {
    const msg = `Bonjour TOGOLIVING,\nJe souhaite reserver:\nType: ${type}\nArrivee: ${arrivee || "a definir"}\nDepart: ${depart || "a definir"}\nPersonnes: ${personnes}\nMerci de confirmer la disponibilite.`;
    window.open(whatsappUrl(msg), "_blank");
  };

  return (
    <div className="glass shadow-xl shadow-ocean/20 p-4 md:p-6">
      <div className="grid md:grid-cols-5 gap-3">
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><Calendar size={12} /> Arrivee</span>
          <input type="date" value={arrivee} onChange={(e) => setArrivee(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise" />
        </label>
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><Calendar size={12} /> Depart</span>
          <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise" />
        </label>
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><Users size={12} /> Personnes</span>
          <select value={personnes} onChange={(e) => setPersonnes(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise">
            {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><BedDouble size={12} /> Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise">
            <option>Studio</option>
            <option>Standard 40m2</option>
            <option>Superieur 50m2</option>
          </select>
        </label>
        <button onClick={send} className="mt-5 md:mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-ocean text-white font-medium text-sm hover:bg-gold hover:text-ocean transition shimmer-gold">
          Verifier
        </button>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/40 to-ocean/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-accent text-turquoise text-xl md:text-2xl mb-3"
          >
            Villa Balneaire Tropicale
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            Bienvenue a <span className="text-turquoise">TOGOLIVING</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-accent text-2xl md:text-3xl text-turquoise mt-6"
          >
            L'Ocean a votre Porte
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-white/80 mt-2 text-base md:text-lg"
          >
            Kpogan Agbetsiko · Lome, Togo
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Link to="/reserver" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-ocean font-medium shimmer-gold hover:scale-[1.03] transition">
              Reserver un Sejour <ArrowRight size={18} />
            </Link>
            <Link to="/hebergements" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-turquoise text-turquoise hover:bg-turquoise hover:text-ocean transition">
              Voir les Hebergements
            </Link>
          </motion.div>
        </div>

        {/* Quick booking */}
        <div className="relative z-10 max-w-5xl w-full mx-auto px-6 pb-12">
          <QuickBooking />
        </div>

        <div className="absolute -bottom-1 inset-x-0">
          <WaveDivider color="#F8F5F0" />
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Waves,           title: "Acces Plage Direct",   sub: "100m de la plage naturelle",  count: 100, suf: "m" },
            { icon: BedDouble,       title: "Appartements Meubles", sub: "3 types d'hebergement",       count: 3,   suf: " types" },
            { icon: Droplets,        title: "Piscine Vue Mer",      sub: "Vue panoramique sur l'ocean", count: 1,   suf: " piscine" },
            { icon: UtensilsCrossed, title: "Restaurant & Bar",     sub: "Saveurs africaines & monde",  count: 6,   suf: " cuisines" },
          ].map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass p-6 text-center hover-lift"
            >
              <div className="inline-flex w-14 h-14 rounded-full bg-turquoise/20 text-turquoise items-center justify-center mb-3">
                <h.icon size={26} />
              </div>
              <div className="font-display text-3xl text-ocean">
                <Counter to={h.count} suffix={h.suf} />
              </div>
              <div className="font-display text-ocean mt-1">{h.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{h.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      {/* ROOMS */}
      <section className="bg-ocean text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="font-accent text-turquoise text-xl">Nos Espaces</p>
            <h2 className="font-display text-4xl md:text-5xl">Hebergements d'Exception</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {rooms.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-dark overflow-hidden hover-lift group border-turquoise/20 hover:border-gold"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={r.img} alt={r.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 to-transparent" />
                  {r.badge && (
                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${r.premium ? "bg-gold text-ocean" : "bg-turquoise text-ocean"}`}>
                      {r.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{r.title}</h3>
                  <p className="text-white/70 text-sm mt-2">{r.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {r.features.map((f) => (
                      <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-turquoise/15 text-turquoise border border-turquoise/30">{f}</span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-5">
                    <Link to="/hebergements" className="flex-1 text-center px-3 py-2 rounded-lg bg-turquoise text-ocean text-sm font-medium hover:bg-gold transition">Details</Link>
                    <a href={whatsappUrl(`Bonjour TOGOLIVING, je souhaite reserver: ${r.title}`)} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-2 rounded-lg border border-turquoise text-turquoise text-sm font-medium hover:bg-turquoise hover:text-ocean transition">Reserver</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="#F8F5F0" bgClass="bg-ocean" />

      {/* POOL & BEACH */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <img src={poolImg} alt="Piscine vue mer" className="rounded-2xl shadow-2xl shadow-ocean/30 w-full h-[420px] object-cover" loading="lazy" />
            <div className="absolute -bottom-6 -right-6 hidden md:block w-24 h-24 rounded-full bg-turquoise/30 pool-ripple" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-accent text-turquoise text-xl">Detente & Saveurs</p>
            <h2 className="font-display text-4xl text-ocean mb-6">Piscine, Plage & Cocktail Bar</h2>

            {[
              { icon: Droplets, title: "Piscine Panoramique", desc: "Vue directe sur l'ocean, detente garantie au coucher du soleil." },
              { icon: Waves,    title: "Plage Naturelle",     desc: "100 metres de la villa, plage quasi naturelle preservee." },
              { icon: UtensilsCrossed, title: "Cocktail Bar", desc: "Bientot disponible, ambiance tropicale en bord de mer." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 mb-5">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-turquoise/15 text-turquoise flex items-center justify-center">
                  <f.icon size={22} />
                </div>
                <div>
                  <div className="font-display text-xl text-ocean">{f.title}</div>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* RESTAURANT PREVIEW */}
      <section className="relative py-24 text-white">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${restoImg})` }} />
        <div className="absolute inset-0 bg-ocean/80" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Au Restaurant</p>
          <h2 className="font-display text-4xl md:text-5xl">Saveurs du Monde</h2>
          <p className="text-white/80 max-w-2xl mx-auto mt-4">Cuisine africaine, francaise et americaine — vue sur l'ocean.</p>

          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {["Cuisine Africaine", "Cuisine Francaise", "Cuisine Americaine"].map((c, i) => (
              <motion.div key={c} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-dark p-8 hover:border-gold transition">
                <UtensilsCrossed className="mx-auto text-turquoise mb-3" size={28} />
                <div className="font-display text-xl">{c}</div>
              </motion.div>
            ))}
          </div>

          <Link to="/restaurant" className="inline-flex items-center gap-2 mt-10 px-7 py-3 rounded-full bg-gold text-ocean font-medium shimmer-gold">
            Voir le Menu Complet <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-accent text-turquoise text-xl">Ils nous ont visites</p>
            <h2 className="font-display text-4xl text-ocean">Avis Voyageurs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "J'ai passe un week-end avec la famille ! L'accueil est chaleureux !", a: "Client Booking.com" },
              { q: "L'endroit est agreable ! Acces direct a la plage, tres bien situe.", a: "Client Booking.com" },
              { q: "Un endroit ideal pour vos vacances a Lome !", a: "Client TripAdvisor" },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass p-6 hover-lift">
                <div className="flex gap-1 mb-3">
                  {[0,1,2,3,4].map(s => <Star key={s} size={16} className="text-gold fill-current" />)}
                </div>
                <p className="font-accent text-lg text-ocean leading-relaxed">"{r.q}"</p>
                <p className="text-sm text-muted-foreground mt-3">— {r.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      {/* LOCATION */}
      <section className="bg-ocean text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <MapPin className="mx-auto text-turquoise float-y mb-3" size={36} />
          <h2 className="font-display text-4xl mb-3">Une Localisation Privilegiee</h2>
          <p className="font-accent text-turquoise text-xl">Entre Lome et Aneho — Route Nationale N2</p>

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { n: 20, s: "min", l: "du centre de Lome" },
              { n: 100, s: "m", l: "de la plage naturelle" },
              { n: 25, s: "min", l: "de l'aeroport" },
            ].map((s) => (
              <div key={s.l} className="glass-dark p-8">
                <div className="font-display text-5xl text-turquoise"><Counter to={s.n} suffix={s.s} /></div>
                <div className="mt-2 text-white/80">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl overflow-hidden border-2 border-turquoise/30">
            <iframe
              title="Carte TOGOLIVING"
              src="https://www.google.com/maps?q=Kpogan+Agbetsiko+Lome+Togo&output=embed"
              className="w-full h-80"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
