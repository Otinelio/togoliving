import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import {
  Waves, BedDouble, Droplets, UtensilsCrossed, Wifi, Wind, Tv, Coffee,
  Star, MapPin, ArrowRight, Calendar, Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { useAccommodations } from "@/hooks/useAccommodations";
import { whatsappUrl } from "@/lib/whatsapp";
import { ASSETS } from "@/lib/assets";
import { OptimizedImage } from "@/components/OptimizedImage";

const getHeroPreloadUrl = () => {
  const isDev = import.meta.env?.DEV || false;
  if (isDev) return ASSETS.heroImg;
  return `/_vercel/image?url=${encodeURIComponent(ASSETS.heroImg)}&w=1920&q=75`;
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOGOLIVING — Villa Balnéaire Tropicale | Kpogan Agbetsiko, Lomé, Togo" },
      { name: "description", content: "Résidence balnéaire de luxe à 100m de la plage naturelle. Studio, appartements vue mer, piscine panoramique, restaurant aux saveurs du monde." },
      { property: "og:title", content: "TOGOLIVING — L'Océan à votre Porte" },
      { property: "og:description", content: "Villa balnéaire tropicale à Kpogan Agbetsiko, Lomé." },
      { property: "og:url", content: "https://residencetogoliving.com/" },
    ],
    links: [
      { rel: "canonical", href: "https://residencetogoliving.com/" },
      { rel: "preload", as: "image", href: getHeroPreloadUrl(), fetchPriority: "high" }
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          name: "Résidence TOGOLIVING",
          starRating: { "@type": "Rating", "ratingValue": "4" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "Kpogan Agbetsiko, Route N2",
            postalCode: "36BP50",
            addressLocality: "Lomé",
            addressCountry: "TG"
          },
          telephone: "+22893872088",
          url: "https://residencetogoliving.com",
          priceRange: "$$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.3",
            bestRating: "5",
            ratingCount: "20"
          },
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Piscine", value: true },
            { "@type": "LocationFeatureSpecification", name: "WiFi", value: true },
            { "@type": "LocationFeatureSpecification", name: "Restaurant", value: true }
          ]
        })
      }
    ],
  }),
  component: HomePage,
});
const roomsData = [
  {
    id: "studio",
    key: "studio",
    img: ASSETS.studioIMG4201,
    features: ["WiFi", "AC", "TV Satellite", "Refrigerateur", "Patio"],
  },
  {
    id: "chambre-salon",
    key: "chambre_salon",
    img: ASSETS.chambreSalonIMG4211,
    features: ["WiFi", "AC", "TV Satellite", "Table a manger", "Canapes", "Patio"],
  },
  {
    id: "2-chambres",
    key: "2_chambres",
    premium: true,
    img: ASSETS.deuxChambresIMG4212,
    features: ["Vue mer", "Terrasse", "Literie premium", "WiFi", "AC", "TV Satellite"],
  },
  {
    id: "3-chambres",
    key: "3_chambres",
    premium: true,
    img: ASSETS.troisChambresSalonIMG4247,
    features: ["Grande Terrasse", "Lits King Size", "WiFi", "AC", "TV Satellite"],
  },
];

function Counter({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const [val, setVal] = useState(to); // SSR: show final value so Google sees real content
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setVal(0); // Reset to 0 on client to animate
  }, []);

  useEffect(() => {
    if (!hydrated || !inView) return;
    const controls = animate(mv, to, { duration, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return controls.stop;
  }, [hydrated, inView, to, duration, mv]);

  return <span ref={ref}>{val}{suffix}</span>;
}

function QuickBooking() {
  const { t } = useTranslation();
  const [type, setType] = useState("Studio");
  const [arrivee, setArrivee] = useState("");
  const [depart, setDepart] = useState("");
  const [personnes, setPersonnes] = useState("2");

  const send = () => {
    const msg = `${t("home.booking_msg.greeting", { type, arrivee: arrivee || t("home.booking_msg.tbd"), depart: depart || t("home.booking_msg.tbd"), personnes })}`;
    window.open(whatsappUrl(msg), "_blank");
  };

  return (
    <div className="glass shadow-xl shadow-ocean/20 p-4 md:p-6">
      <div className="grid md:grid-cols-5 gap-3">
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><Calendar size={12} /> {t("home.booking.arrival")}</span>
          <input type="date" value={arrivee} onChange={(e) => setArrivee(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise" />
        </label>
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><Calendar size={12} /> {t("home.booking.departure")}</span>
          <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise" />
        </label>
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><Users size={12} /> {t("home.booking.guests")}</span>
          <select value={personnes} onChange={(e) => setPersonnes(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise">
            {[1, 2, 3, 4, 5, 6].map(n => <option key={n}>{n}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-xs text-ocean/70 font-medium flex items-center gap-1"><BedDouble size={12} /> {t("home.booking.type")}</span>
          <select value={type} onChange={(e) => setType(e.target.value)} className="mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise">
            <option>Studios</option>
            <option>Chambre Salon</option>
            <option>2 Chambres Salon</option>
            <option>3 Chambres Salon</option>
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
  const { t } = useTranslation();
  const { items: dbRooms } = useAccommodations();
  const displayedRooms = dbRooms;

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <OptimizedImage
            src={ASSETS.heroImg}
            alt="Hôtel 4 étoiles TOGOLIVING à Lomé - Piscine et vue sur mer"
            width="1920"
            height="1080"
            priority={true}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/40 to-ocean/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-accent text-turquoise text-xl md:text-2xl mb-3"
          >
            {t("home.hero.subtitle")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="font-display text-white text-[2.5rem] md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            {t("home.hero.title_pt1")} <span className="text-turquoise">{t("home.hero.title_highlight")}</span> {t("home.hero.title_pt2")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="font-accent text-xl md:text-2xl text-turquoise mt-4"
          >
            {t("home.hero.tagline")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-white/80 mt-2 text-base md:text-lg"
          >
            {t("home.hero.location")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="mt-6 flex flex-wrap gap-4 justify-center"
          >
            <Link to="/reserver" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-ocean font-medium shimmer-gold hover:scale-[1.03] transition">
              {t("home.hero.book_btn")} <ArrowRight size={18} />
            </Link>
            <Link to="/hebergements" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-turquoise text-turquoise hover:bg-turquoise hover:text-ocean transition">
              {t("home.hero.rooms_btn")}
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
            { icon: Waves, title: t("home.highlights.beach_title"), sub: t("home.highlights.beach_sub"), count: 100, suf: "m" },
            { icon: BedDouble, title: t("home.highlights.apartments_title"), sub: t("home.highlights.apartments_sub"), count: 4, suf: "" },
            { icon: Droplets, title: t("home.highlights.pool_title"), sub: t("home.highlights.pool_sub"), count: 1, suf: "" },
            { icon: UtensilsCrossed, title: t("home.highlights.restaurant_title"), sub: t("home.highlights.restaurant_sub"), count: 6, suf: "" },
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
            <p className="font-accent text-turquoise text-xl">{t("home.rooms.subtitle")}</p>
            <h2 className="font-display text-4xl md:text-5xl">{t("home.rooms.title")}</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedRooms.map((r, i) => {
              // Convert DB accommodation schema to legacy schema for UI if needed
              const img = 'imageUrl' in r ? r.imageUrl : ('img' in r ? (r as any).img : '');
              const badge = r.badge;
              const premium = 'isPremium' in r ? r.isPremium : ('premium' in r ? (r as any).premium : false);
              const desc = 'description' in r ? r.description : ('desc' in r ? (r as any).desc : '');
              const title = r.title;
              const rawFeatures = 'features' in r ? r.features : [];
              const features = (rawFeatures ?? []).slice(0, 5).map((f: any) => typeof f === 'string' ? f : f.label);

              return (
                <motion.div
                  key={r.id || title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-dark overflow-hidden hover-lift group border-turquoise/20 hover:border-gold"
                >
                  <div className="relative h-56 overflow-hidden">
                    <OptimizedImage src={img} alt={title} width="600" height="400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 to-transparent" />
                    {badge && (
                      <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${premium ? "bg-gold text-ocean" : "bg-turquoise text-ocean"}`}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{title}</h3>
                    <p className="text-white/70 text-sm mt-2 line-clamp-2">{desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {features.map((f: string) => (
                        <span key={t(`home.rooms.features.${f}`)} className="text-xs px-2.5 py-1 rounded-full bg-turquoise/15 text-turquoise border border-turquoise/30">{f}</span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-5">
                      <Link to="/hebergements/$category" params={{ category: encodeURIComponent(title.toLowerCase().replace(/ /g, "-")) }} className="flex-1 text-center px-3 py-2 rounded-lg bg-turquoise text-ocean text-sm font-medium hover:bg-gold transition">{t("home.rooms.btn_details")}</Link>
                      <Link to="/reserver" className="flex-1 text-center px-3 py-2 rounded-lg border border-turquoise text-turquoise text-sm font-medium hover:bg-turquoise hover:text-ocean transition">{t("home.rooms.btn_book")}</Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <WaveDivider color="#F8F5F0" bgClass="bg-ocean" />

      {/* POOL & BEACH */}
      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <OptimizedImage src={ASSETS.poolImg} alt="Piscine panoramique vue Océan Atlantique à TOGOLIVING, Lomé Togo" width="800" height="420" className="rounded-2xl shadow-2xl shadow-ocean/30 w-full h-[420px] object-cover" />
            <div className="absolute -bottom-6 -right-6 hidden md:block w-24 h-24 rounded-full bg-turquoise/30 pool-ripple" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-accent text-turquoise text-xl">{t("home.leisure.subtitle")}</p>
            <h2 className="font-display text-4xl text-ocean mb-6">{t("home.leisure.title")}</h2>

            {[
              { icon: Droplets, title: t("home.leisure.pool_title"), desc: t("home.leisure.pool_desc") },
              { icon: Waves, title: t("home.leisure.beach_title"), desc: t("home.leisure.beach_desc") },
              { icon: UtensilsCrossed, title: t("home.leisure.bar_title"), desc: t("home.leisure.bar_desc") },
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
      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage src={ASSETS.piscine1} alt="Restaurant vue mer à Lomé, cuisine internationale chez TOGOLIVING" width="1920" height="600" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-ocean/80" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">{t("home.restaurant.subtitle")}</p>
          <h2 className="font-display text-4xl md:text-5xl">{t("home.restaurant.title")}</h2>
          <p className="text-white/80 max-w-2xl mx-auto mt-4">{t("home.restaurant.desc")}</p>

          <div className="grid md:grid-cols-4 gap-5 mt-10">
            {[
              { label: "Plats & Grillades" },
              { label: "Fast Food & Pizzas" },
              { label: "Cocktails & Vins" },
              { label: "Petit-Déjeuner" },
            ].map((c, i) => (
              <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-dark p-8 hover:border-gold transition text-center">
                <UtensilsCrossed className="mx-auto text-turquoise mb-3" size={22} />
                <div className="font-display text-lg">{c.label}</div>
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
          <div className="text-center mb-4">
            <p className="font-accent text-turquoise text-xl">Ils nous ont visités</p>
            <h2 className="font-display text-4xl text-ocean">{t("home.reviews.title")}</h2>
          </div>

          {/* Platform ratings summary */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="glass px-6 py-3 flex items-center gap-3">
              <div className="text-[#003580] font-bold text-lg">booking</div>
              <div className="text-ocean font-display text-2xl font-bold">7,2<span className="text-sm font-body text-muted-foreground">/10</span></div>
              <div className="text-xs text-muted-foreground">14 avis</div>
            </div>
            <div className="glass px-6 py-3 flex items-center gap-3">
              <div className="font-bold text-lg">
                <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
              </div>
              <div className="flex gap-0.5">{[0, 1, 2, 3, 4].map(s => <Star key={s} size={13} className={s < 4 ? "text-gold fill-current" : "text-gold/40"} />)}</div>
              <div className="text-ocean font-display text-2xl font-bold">4,3<span className="text-sm font-body text-muted-foreground">/5</span></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                stars: 5,
                q: "Endroit vraiment agréable, la piscine avec vue sur la mer est magnifique. Personnel souriant et très serviable. Je recommande vivement pour un week-end en famille !",
                a: "Rodrigue K.",
                src: "booking",
                label: "Booking.com",
              },
              {
                stars: 5,
                q: "Super emplacement ! À 100 mètres de la plage naturelle, les appartements sont modernes et bien équipés. L'accueil est chaleureux, on s'est sentis comme à la maison.",
                a: "Afi D.",
                src: "google",
                label: "Google",
              },
              {
                stars: 4,
                q: "Un cadre idéal pour se ressourcer à Lomé. La vue sur l'océan depuis la terrasse est exceptionnelle. L'équipe est très à l'écoute et disponible. Je reviendrai !",
                a: "Marc-André V.",
                src: "booking",
                label: "Booking.com",
              },
              {
                stars: 5,
                q: "Séjour parfait ! Les appartements sont spacieux et propres. La piscine panoramique est un vrai bonheur au coucher du soleil. Très bonne adresse à Lomé.",
                a: "Naomi A.",
                src: "google",
                label: "Google",
              },
              {
                stars: 4,
                q: "Très bien situé sur la route nationale, proche de la mer. Personnel agréable et attentionné. Le restaurant propose de bons plats. Un endroit parfait pour se détendre.",
                a: "Kofi M.",
                src: "google",
                label: "Google",
              },
              {
                stars: 5,
                q: "Résidence moderne avec un accès direct à la plage. Chambre confortable, vue imprenable sur la mer. Je recommande à tous ceux qui visitent Lomé !",
                a: "Estelle B.",
                src: "booking",
                label: "Booking.com",
              },
            ].map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass p-6 hover-lift flex flex-col">
                {/* Platform badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map(s => (
                      <Star key={s} size={14} className={s < r.stars ? "text-gold fill-current" : "text-gold/30"} />
                    ))}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${r.src === "booking" ? "bg-[#003580]/10 text-[#003580]" : "bg-[#4285F4]/10 text-[#4285F4]"}`}>
                    {r.label}
                  </span>
                </div>
                <p className="font-accent text-base text-ocean leading-relaxed flex-1">"{r.q}"</p>
                <p className="text-sm text-muted-foreground mt-4 font-medium">— {r.a}</p>
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1983!2d1.38426!3d6.1794601!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023ef6ce7ef6e2b%3A0x147374ea27bbec54!2sResidence%20Togoliving!5e0!3m2!1sfr!2stg"
              className="w-full h-80"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
