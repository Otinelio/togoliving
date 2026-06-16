import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { W as WaveDivider } from "./router-BYrtquX9.mjs";
import { w as whatsappUrl } from "./whatsapp-B6f0Mlwg.mjs";
import { h as hebergementsHero } from "./piscine-B650oAYY.mjs";
import { m as Wifi, n as Wind, o as Tv, e as Coffee, p as WavesHorizontal, U as UtensilsCrossed, q as BedDouble, l as MessageCircle, r as Car, s as Plane, D as Droplets, c as GlassWater } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const vidStudio = "/assets/IMG_0077-DBbVJ_5i.mp4";
const vidStandard = "/assets/IMG_0085-Cdmt68pP.MP4";
const vidSuperieur = "/assets/IMG_0285-DfxkDqq7.MP4";
const rooms = [{
  title: "Studio",
  img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
  video: vidStudio,
  desc: "Espace confortable, ventile et climatise, ideal pour un sejour solo ou en couple. Vue ville ou mer selon disponibilite.",
  features: [{
    icon: Wifi,
    label: "WiFi Gratuit"
  }, {
    icon: Wind,
    label: "Climatisation"
  }, {
    icon: Tv,
    label: "TV Canal+ / Satellite"
  }, {
    icon: Coffee,
    label: "Refrigerateur"
  }, {
    icon: WavesHorizontal,
    label: "Patio prive"
  }]
}, {
  title: "Chambre Salon Standard",
  badge: "40 m²",
  img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=80",
  video: vidStandard,
  desc: "Grand salon avec table a manger et canapes. Espace de vie ideal pour familles ou sejours prolonges en confort.",
  features: [{
    icon: Wifi,
    label: "WiFi Gratuit"
  }, {
    icon: Wind,
    label: "Climatisation"
  }, {
    icon: Tv,
    label: "TV Satellite"
  }, {
    icon: UtensilsCrossed,
    label: "Table a manger"
  }, {
    icon: BedDouble,
    label: "Canapes"
  }, {
    icon: WavesHorizontal,
    label: "Patio"
  }]
}, {
  title: "Chambre Salon Superieur",
  badge: "SUPERIEUR · 50 m²",
  premium: true,
  img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  video: vidSuperieur,
  desc: "Espace premium avec terrasse vue mer, literie haut de gamme. Parfait pour longs sejours et familles exigeantes.",
  features: [{
    icon: Wifi,
    label: "WiFi Gratuit"
  }, {
    icon: Wind,
    label: "Climatisation"
  }, {
    icon: Tv,
    label: "TV Satellite"
  }, {
    icon: WavesHorizontal,
    label: "Terrasse vue mer"
  }, {
    icon: BedDouble,
    label: "Literie premium"
  }, {
    icon: UtensilsCrossed,
    label: "Table a manger"
  }]
}];
const amenities = [{
  icon: Wifi,
  label: "WiFi Gratuit"
}, {
  icon: Wind,
  label: "Climatisation"
}, {
  icon: Tv,
  label: "TV Satellite + Canal+"
}, {
  icon: Coffee,
  label: "Petit-dejeuner disponible"
}, {
  icon: Car,
  label: "Parking Prive Gratuit"
}, {
  icon: Plane,
  label: "Navette Aeroport (sur demande)"
}, {
  icon: WavesHorizontal,
  label: "Acces Plage"
}, {
  icon: Droplets,
  label: "Piscine"
}, {
  icon: GlassWater,
  label: "Cocktail Bar"
}, {
  icon: UtensilsCrossed,
  label: "Restaurant sur place"
}];
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 bg-ocean text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-40", style: {
        backgroundImage: `url(${hebergementsHero})`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/80 to-ocean" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Nos Espaces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Nos Hebergements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-white/80 max-w-2xl mx-auto", children: "3 types d'appartements meubles, climatises, avec WiFi gratuit et acces direct a la plage." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6 space-y-20", children: rooms.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 30
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, className: `grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>div:first-child]:order-2" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        r.video ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: r.video, autoPlay: true, muted: true, loop: true, playsInline: true, className: "w-full h-[420px] object-cover rounded-2xl shadow-xl shadow-ocean/20" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: r.img, alt: r.title, loading: "lazy", className: "w-full h-[420px] object-cover rounded-2xl shadow-xl shadow-ocean/20" }),
        r.badge && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider ${r.premium ? "bg-gold text-ocean" : "bg-turquoise text-ocean"}`, children: r.badge })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl text-ocean", children: r.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-accent text-turquoise text-lg mt-1", children: [
          "Vue mer · ",
          r.badge ?? "Studio"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-4", children: r.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 mt-6", children: r.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-ocean", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { size: 18, className: "text-turquoise" }),
          " ",
          f.label
        ] }, f.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "A partir de" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl text-gold", children: "Contactez-nous" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappUrl(`Bonjour TOGOLIVING, je souhaite reserver: ${r.title}`), target: "_blank", rel: "noreferrer", className: "mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition shimmer-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
          " Reserver via WhatsApp"
        ] })
      ] })
    ] }, r.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#1E3A5F", bgClass: "bg-sand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ocean text-white py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Tout inclus" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Equipements & Services" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4", children: amenities.map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.05
      }, className: "glass-dark p-5 text-center hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(a.icon, { className: "mx-auto text-turquoise mb-2", size: 26 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: a.label })
      ] }, a.label)) })
    ] }) })
  ] });
}
export {
  Page as component
};
