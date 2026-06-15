import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useSettings, P as PinScreen } from "./useSettings-lNDW__Gk.mjs";
import { u as useOrders, s as setOrderStatus } from "./useOrders-BMZ4xY-T.mjs";
import { f as formatFCFA } from "./whatsapp-B6f0Mlwg.mjs";
import { C as ChefHat, L as LogOut } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "./router-Cn0eETnM.mjs";
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
import "./useLocalStorage-DKzl3n7t.mjs";
function chime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.value = 660;
    g.gain.value = 0.2;
    o.start();
    g.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.5);
    o.stop(ctx.currentTime + 0.5);
  } catch {
  }
}
function rel(ts) {
  const s = Math.floor((Date.now() - ts) / 1e3);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)} min`;
}
function Page() {
  const {
    settings
  } = useSettings();
  const [u, setU] = reactExports.useState(false);
  if (!u) return /* @__PURE__ */ jsxRuntimeExports.jsx(PinScreen, { title: "Cuisine", expectedPin: settings.pinKitchen, onUnlock: () => setU(true) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dash, {});
}
function Dash() {
  const orders = useOrders(5e3);
  const active = orders.filter((o) => o.status === "En attente" || o.status === "En preparation");
  const last = reactExports.useRef(active.length);
  const [, tick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 3e4);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    if (active.length > last.current) chime();
    last.current = active.length;
  }, [active.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0a1828] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-20 bg-ocean/95 backdrop-blur border-b border-turquoise/20 px-5 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChefHat, { className: "text-turquoise" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl", children: "Cuisine TOGOLIVING" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 bg-gold text-ocean px-2.5 py-0.5 rounded-full text-sm font-semibold", children: active.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "inline-flex items-center gap-1 text-sm text-white/80 hover:text-turquoise", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
        " Sortir"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-5 py-6", children: active.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-dark p-16 text-center text-white/60 font-display text-2xl", children: "Pas de commande active" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: active.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
      opacity: 0,
      scale: 0.95
    }, animate: {
      opacity: 1,
      scale: 1
    }, className: `rounded-2xl p-5 border-2 ${o.status === "En preparation" ? "bg-blue-900/30 border-blue-400/50" : "bg-orange-900/30 border-orange-400/50"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gold text-ocean font-display text-3xl px-4 py-1.5 rounded-xl", children: o.roomId }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/60", children: o.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-turquoise", children: rel(o.timestamp) })
        ] })
      ] }),
      o.guestName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-turquoise mb-2", children: o.guestName }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-lg", children: o.items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "flex justify-between border-b border-white/10 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-gold", children: [
          i.qty,
          "×"
        ] }),
        " ",
        i.name
      ] }) }, i.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right text-sm text-white/60 mt-2", children: formatFCFA(o.totalPrice) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
        o.status === "En attente" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOrderStatus(o.id, "En preparation"), className: "flex-1 py-3 rounded-xl bg-blue-500 text-white font-medium", children: "Commencer" }),
        o.status === "En preparation" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOrderStatus(o.id, "Pret"), className: "flex-1 py-3 rounded-xl bg-green-500 text-white font-medium", children: "Pret" })
      ] })
    ] }, o.id)) }) })
  ] });
}
export {
  Page as component
};
