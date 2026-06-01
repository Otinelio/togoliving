import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { W as WaveDivider } from "./router-DEwJ-39i.mjs";
import { w as whatsappUrl } from "./whatsapp-B6f0Mlwg.mjs";
import { m as motion, u as useInView, a as useMotionValue, b as animate } from "../_libs/framer-motion.mjs";
import { A as ArrowRight, k as WavesHorizontal, l as BedDouble, D as Droplets, U as UtensilsCrossed, x as Star, b as MapPin, z as Calendar, E as Users } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const heroImg = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=80";
const poolImg = "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80";
const restoImg = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80";
const rooms = [{
  id: "studio",
  title: "Studio",
  img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  features: ["WiFi", "AC", "TV Satellite", "Refrigerateur", "Patio"],
  desc: "Espace confortable, ideal pour un sejour solo ou en couple."
}, {
  id: "standard",
  title: "Chambre Salon Standard",
  badge: "40 m²",
  img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
  features: ["WiFi", "AC", "TV Satellite", "Table a manger", "Canapes", "Patio"],
  desc: "Grand salon avec table a manger, ideal pour familles."
}, {
  id: "superieur",
  title: "Chambre Salon Superieur",
  badge: "PREMIUM 50 m²",
  premium: true,
  img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
  features: ["Vue mer", "Terrasse", "Literie premium", "WiFi", "AC", "TV Satellite"],
  desc: "Espace premium avec terrasse vue mer pour longs sejours."
}];
function Counter({
  to,
  suffix = "",
  duration = 1.6
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const mv = useMotionValue(0);
  const [val, setVal] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v))
    });
    return controls.stop;
  }, [inView, to, duration, mv]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ref, children: [
    val,
    suffix
  ] });
}
function QuickBooking() {
  const [type, setType] = reactExports.useState("Studio");
  const [arrivee, setArrivee] = reactExports.useState("");
  const [depart, setDepart] = reactExports.useState("");
  const [personnes, setPersonnes] = reactExports.useState("2");
  const send = () => {
    const msg = `Bonjour TOGOLIVING,
Je souhaite reserver:
Type: ${type}
Arrivee: ${arrivee || "a definir"}
Depart: ${depart || "a definir"}
Personnes: ${personnes}
Merci de confirmer la disponibilite.`;
    window.open(whatsappUrl(msg), "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass shadow-xl shadow-ocean/20 p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-5 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-ocean/70 font-medium flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
        " Arrivee"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: arrivee, onChange: (e) => setArrivee(e.target.value), className: "mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-ocean/70 font-medium flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 12 }),
        " Depart"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: depart, onChange: (e) => setDepart(e.target.value), className: "mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-ocean/70 font-medium flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 12 }),
        " Personnes"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: personnes, onChange: (e) => setPersonnes(e.target.value), className: "mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise", children: [1, 2, 3, 4, 5, 6].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: n }, n)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-ocean/70 font-medium flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { size: 12 }),
        " Type"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: type, onChange: (e) => setType(e.target.value), className: "mt-1 w-full bg-white/80 rounded-lg px-3 py-2.5 text-sm text-ocean border border-turquoise/30 focus:outline-none focus:border-turquoise", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Standard 40m2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Superieur 50m2" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: send, className: "mt-5 md:mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-ocean text-white font-medium text-sm hover:bg-gold hover:text-ocean transition shimmer-gold", children: "Verifier" })
  ] }) });
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen flex flex-col justify-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scale: 1.1
      }, animate: {
        scale: 1
      }, transition: {
        duration: 8,
        ease: "easeOut"
      }, className: "absolute inset-0 bg-cover bg-center", style: {
        backgroundImage: `url(${heroImg})`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/70 via-ocean/40 to-ocean/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.2
        }, className: "font-accent text-turquoise text-xl md:text-2xl mb-3", children: "Villa Balneaire Tropicale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.3
        }, className: "font-display text-white text-5xl md:text-7xl lg:text-8xl font-bold leading-tight", children: [
          "Bienvenue a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-turquoise", children: "TOGOLIVING" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.5
        }, className: "font-accent text-2xl md:text-3xl text-turquoise mt-6", children: "L'Ocean a votre Porte" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.6
        }, className: "text-white/80 mt-2 text-base md:text-lg", children: "Kpogan Agbetsiko · Lome, Togo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: 0.8
        }, className: "mt-10 flex flex-wrap gap-4 justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reserver", className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold text-ocean font-medium shimmer-gold hover:scale-[1.03] transition", children: [
            "Reserver un Sejour ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hebergements", className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-turquoise text-turquoise hover:bg-turquoise hover:text-ocean transition", children: "Voir les Hebergements" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-5xl w-full mx-auto px-6 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QuickBooking, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5", children: [{
      icon: WavesHorizontal,
      title: "Acces Plage Direct",
      sub: "100m de la plage naturelle",
      count: 100,
      suf: "m"
    }, {
      icon: BedDouble,
      title: "Appartements Meubles",
      sub: "3 types d'hebergement",
      count: 3,
      suf: " types"
    }, {
      icon: Droplets,
      title: "Piscine Vue Mer",
      sub: "Vue panoramique sur l'ocean",
      count: 1,
      suf: " piscine"
    }, {
      icon: UtensilsCrossed,
      title: "Restaurant & Bar",
      sub: "Saveurs africaines & monde",
      count: 6,
      suf: " cuisines"
    }].map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 30
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.1
    }, className: "glass p-6 text-center hover-lift", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex w-14 h-14 rounded-full bg-turquoise/20 text-turquoise items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(h.icon, { size: 26 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl text-ocean", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: h.count, suffix: h.suf }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-ocean mt-1", children: h.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: h.sub })
    ] }, h.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#1E3A5F", bgClass: "bg-sand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ocean text-white py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Nos Espaces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: "Hebergements d'Exception" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: rooms.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1
      }, className: "glass-dark overflow-hidden hover-lift group border-turquoise/20 hover:border-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-56 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.img, alt: r.title, loading: "lazy", className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ocean/80 to-transparent" }),
          r.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${r.premium ? "bg-gold text-ocean" : "bg-turquoise text-ocean"}`, children: r.badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: r.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mt-2", children: r.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mt-4", children: r.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2.5 py-1 rounded-full bg-turquoise/15 text-turquoise border border-turquoise/30", children: f }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/hebergements", className: "flex-1 text-center px-3 py-2 rounded-lg bg-turquoise text-ocean text-sm font-medium hover:bg-gold transition", children: "Details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: whatsappUrl(`Bonjour TOGOLIVING, je souhaite reserver: ${r.title}`), target: "_blank", rel: "noreferrer", className: "flex-1 text-center px-3 py-2 rounded-lg border border-turquoise text-turquoise text-sm font-medium hover:bg-turquoise hover:text-ocean transition", children: "Reserver" })
          ] })
        ] })
      ] }, r.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0", bgClass: "bg-ocean" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: -30
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: poolImg, alt: "Piscine vue mer", className: "rounded-2xl shadow-2xl shadow-ocean/30 w-full h-[420px] object-cover", loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-6 -right-6 hidden md:block w-24 h-24 rounded-full bg-turquoise/30 pool-ripple" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: 30
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Detente & Saveurs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-ocean mb-6", children: "Piscine, Plage & Cocktail Bar" }),
        [{
          icon: Droplets,
          title: "Piscine Panoramique",
          desc: "Vue directe sur l'ocean, detente garantie au coucher du soleil."
        }, {
          icon: WavesHorizontal,
          title: "Plage Naturelle",
          desc: "100 metres de la villa, plage quasi naturelle preservee."
        }, {
          icon: UtensilsCrossed,
          title: "Cocktail Bar",
          desc: "Bientot disponible, ambiance tropicale en bord de mer."
        }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-12 h-12 rounded-xl bg-turquoise/15 text-turquoise flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { size: 22 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-ocean", children: f.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: f.desc })
          ] })
        ] }, f.title))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-cover bg-center", style: {
        backgroundImage: `url(${restoImg})`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-ocean/80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Au Restaurant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl", children: "Saveurs du Monde" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 max-w-2xl mx-auto mt-4", children: "Cuisine africaine, francaise et americaine — vue sur l'ocean." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5 mt-10", children: ["Cuisine Africaine", "Cuisine Francaise", "Cuisine Americaine"].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: i * 0.1
        }, className: "glass-dark p-8 hover:border-gold transition", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "mx-auto text-turquoise mb-3", size: 28 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: c })
        ] }, c)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/restaurant", className: "inline-flex items-center gap-2 mt-10 px-7 py-3 rounded-full bg-gold text-ocean font-medium shimmer-gold", children: [
          "Voir le Menu Complet ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Ils nous ont visites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl text-ocean", children: "Avis Voyageurs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        q: "J'ai passe un week-end avec la famille ! L'accueil est chaleureux !",
        a: "Client Booking.com"
      }, {
        q: "L'endroit est agreable ! Acces direct a la plage, tres bien situe.",
        a: "Client Booking.com"
      }, {
        q: "Un endroit ideal pour vos vacances a Lome !",
        a: "Client TripAdvisor"
      }].map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1
      }, className: "glass p-6 hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 mb-3", children: [0, 1, 2, 3, 4].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "text-gold fill-current" }, s)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-accent text-lg text-ocean leading-relaxed", children: [
          '"',
          r.q,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-3", children: [
          "— ",
          r.a
        ] })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#1E3A5F", bgClass: "bg-sand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ocean text-white py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mx-auto text-turquoise float-y mb-3", size: 36 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl mb-3", children: "Une Localisation Privilegiee" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Entre Lome et Aneho — Route Nationale N2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-4 mt-10", children: [{
        n: 20,
        s: "min",
        l: "du centre de Lome"
      }, {
        n: 100,
        s: "m",
        l: "de la plage naturelle"
      }, {
        n: 25,
        s: "min",
        l: "de l'aeroport"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-dark p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl text-turquoise", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: s.n, suffix: s.s }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-white/80", children: s.l })
      ] }, s.l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 rounded-2xl overflow-hidden border-2 border-turquoise/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "Carte TOGOLIVING", src: "https://www.google.com/maps?q=Kpogan+Agbetsiko+Lome+Togo&output=embed", className: "w-full h-80", loading: "lazy" }) })
    ] }) })
  ] });
}
export {
  HomePage as component
};
