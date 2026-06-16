import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { W as WaveDivider } from "./router-BYrtquX9.mjs";
import { r as restoImg } from "./piscine1-CiFIVDB-.mjs";
import { t as Image, Z as ZoomIn, X, j as ChevronLeft, k as ChevronRight } from "../_libs/lucide-react.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
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
const plageImg1 = "/assets/IMG_4188-BMAvT5g9.jpg";
const photos = [{
  cat: "Piscine",
  src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
  alt: "Piscine vue ocean"
}, {
  cat: "Piscine",
  src: "https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1200&q=80",
  alt: "Piscine infinity"
}, {
  cat: "Plage",
  src: plageImg1,
  alt: "Plage naturelle devant l'hôtel"
}, {
  cat: "Plage",
  src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  alt: "Plage naturelle"
}, {
  cat: "Plage",
  src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
  alt: "Plage ocean"
}, {
  cat: "Appartements",
  src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80",
  alt: "Salon meuble"
}, {
  cat: "Appartements",
  src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  alt: "Chambre superieur"
}, {
  cat: "Appartements",
  src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  alt: "Studio"
}, {
  cat: "Restaurant",
  src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
  alt: "Terrasse restaurant"
}, {
  cat: "Restaurant",
  src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  alt: "Cuisine raffinee"
}, {
  cat: "Bar",
  src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80",
  alt: "Cocktail tropical"
}, {
  cat: "Bar",
  src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
  alt: "Bar coucher de soleil"
}, {
  cat: "Exterieurs",
  src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  alt: "Villa exterieur"
}];
const CATS = ["Tout", "Piscine", "Plage", "Appartements", "Restaurant", "Bar", "Exterieurs"];
function Page() {
  const [cat, setCat] = reactExports.useState("Tout");
  const [open, setOpen] = reactExports.useState(null);
  const list = cat === "Tout" ? photos : photos.filter((p) => p.cat === cat);
  reactExports.useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => i === null ? null : (i + 1) % list.length);
      if (e.key === "ArrowLeft") setOpen((i) => i === null ? null : (i - 1 + list.length) % list.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 bg-ocean text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-cover bg-center opacity-35", style: {
        backgroundImage: `url(${restoImg})`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/80 to-ocean" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Notre Cadre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Kpogan Agbetsiko" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-10", children: CATS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setCat(c), className: `inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${cat === c ? "bg-ocean text-white" : "bg-white text-ocean border border-turquoise/30 hover:border-turquoise"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { size: 14 }),
        " ",
        c
      ] }, c)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: list.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { layout: true, onClick: () => setOpen(i), whileHover: {
        scale: 1.02
      }, className: "group relative rounded-2xl overflow-hidden aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-turquoise", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.src, alt: p.alt, loading: "lazy", className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-ocean/0 group-hover:bg-ocean/40 transition flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { size: 32, className: "text-white opacity-0 group-hover:opacity-100 transition" }) })
      ] }, p.src)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "fixed inset-0 z-[100] bg-ocean/95 flex items-center justify-center p-4", onClick: () => setOpen(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
        e.stopPropagation();
        setOpen(null);
      }, className: "absolute top-5 right-5 text-white p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 28 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
        e.stopPropagation();
        setOpen((i) => i === null ? null : (i - 1 + list.length) % list.length);
      }, className: "absolute left-3 md:left-8 text-white p-3 rounded-full bg-white/10 hover:bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 28 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.img, { initial: {
        scale: 0.95,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, src: list[open].src, alt: list[open].alt, className: "max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl", onClick: (e) => e.stopPropagation() }, list[open].src),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
        e.stopPropagation();
        setOpen((i) => i === null ? null : (i + 1) % list.length);
      }, className: "absolute right-3 md:right-8 text-white p-3 rounded-full bg-white/10 hover:bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 28 }) })
    ] }) })
  ] });
}
export {
  Page as component
};
