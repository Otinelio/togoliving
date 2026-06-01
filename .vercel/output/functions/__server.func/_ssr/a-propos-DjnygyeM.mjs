import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { W as WaveDivider } from "./router-DEwJ-39i.mjs";
import { m as motion, u as useInView, a as useMotionValue, b as animate } from "../_libs/framer-motion.mjs";
import { H as Heart, x as Star, y as Shield } from "../_libs/lucide-react.mjs";
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
function Counter({
  to,
  suffix = ""
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, {
    once: true
  });
  const mv = useMotionValue(0);
  const [v, setV] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!inView) return;
    return animate(mv, to, {
      duration: 1.8,
      onUpdate: (n) => setV(Math.round(n))
    }).stop;
  }, [inView, to, mv]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "font-display text-5xl text-turquoise", children: [
    v,
    suffix
  ] });
}
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 bg-ocean text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-35" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "A Propos" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "TOGOLIVING" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl mt-2", children: "Votre Residence Balneaire au Togo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-sand py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.p, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "text-lg text-ocean leading-relaxed", children: [
        "Situe sur la cote entre ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Lome" }),
        " et ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Aneho" }),
        ", a seulement",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: " 20 minutes du centre-ville" }),
        " et ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "25 minutes de l'aeroport international" }),
        ", TOGOLIVING offre un acces privilegie a une plage naturelle, une piscine panoramique, un cocktail bar et un restaurant aux saveurs du monde."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mt-16", children: [{
        n: 20,
        s: " min",
        l: "du centre-ville"
      }, {
        n: 100,
        s: " m",
        l: "de la plage"
      }, {
        n: 3,
        s: "",
        l: "types d'hebergement"
      }, {
        n: 25,
        s: " min",
        l: "de l'aeroport"
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, className: "glass p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: s.n, suffix: s.s }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1", children: s.l })
      ] }, s.l)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#1E3A5F", bgClass: "bg-sand" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-ocean text-white py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Nos Valeurs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl", children: "Pourquoi nous choisir" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6", children: [{
        icon: Heart,
        t: "Accueil Chaleureux",
        d: "Une equipe disponible 24h/24 pour votre confort."
      }, {
        icon: Star,
        t: "Cadre Unique",
        d: "Vue mer, piscine et plage naturelle en un seul lieu."
      }, {
        icon: Shield,
        t: "Confort & Securite",
        d: "Appartements meubles, parking prive, WiFi inclus."
      }].map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        delay: i * 0.1
      }, className: "glass-dark p-8 text-center hover-lift", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "mx-auto text-turquoise mb-3", size: 32 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl", children: v.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 mt-2 text-sm", children: v.d })
      ] }, v.t)) })
    ] }) })
  ] });
}
export {
  Page as component
};
