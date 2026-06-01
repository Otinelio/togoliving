import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useMenu, M as MENU_CATEGORIES } from "./useMenu-DdMR6tIN.mjs";
import { W as WaveDivider } from "./router-DEwJ-39i.mjs";
import { f as formatFCFA } from "./whatsapp-B6f0Mlwg.mjs";
import { S as Soup, c as GlassWater, d as Sandwich, U as UtensilsCrossed, C as ChefHat, e as Coffee } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "./useLocalStorage-DKzl3n7t.mjs";
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
const ICONS = {
  "Petit-Dejeuner": Coffee,
  "Plats Africains": ChefHat,
  "Plats Francais": UtensilsCrossed,
  "Plats Americains": Sandwich,
  "Cocktails & Boissons": GlassWater,
  "Snacks": Soup
};
function Page() {
  const {
    items
  } = useMenu();
  const [tab, setTab] = reactExports.useState("Petit-Dejeuner");
  const filtered = items.filter((i) => i.category === tab);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 bg-ocean text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-35" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Au Restaurant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Saveurs du Monde" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl mt-2", children: "Vue sur l'Ocean" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-10", children: MENU_CATEGORIES.map((c) => {
        const Icon = ICONS[c];
        const active = tab === c;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(c), className: `inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition ${active ? "bg-ocean text-white shadow-lg" : "bg-white text-ocean border border-turquoise/30 hover:border-turquoise"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 }),
          " ",
          c
        ] }, c);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: [
        filtered.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `glass p-5 hover-lift border-2 ${it.soldOut ? "opacity-50" : "border-transparent hover:border-gold/60"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl text-ocean", children: it.name }),
            it.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: it.description }),
            it.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block mt-2 text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground", children: "Indisponible" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 px-3 py-1.5 rounded-lg bg-gold/20 border border-gold/40 text-ocean font-semibold text-sm whitespace-nowrap", children: formatFCFA(it.price) })
        ] }) }, it.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full text-center text-muted-foreground py-10", children: "Aucun article dans cette categorie." })
      ] }, tab)
    ] }) })
  ] });
}
export {
  Page as component
};
