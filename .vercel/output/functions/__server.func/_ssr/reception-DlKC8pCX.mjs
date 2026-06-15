import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useSettings, P as PinScreen } from "./useSettings-lNDW__Gk.mjs";
import { u as useOrders, s as setOrderStatus } from "./useOrders-BMZ4xY-T.mjs";
import { f as formatFCFA } from "./whatsapp-B6f0Mlwg.mjs";
import { L as LogOut, B as Bell } from "../_libs/lucide-react.mjs";
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
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g);
    g.connect(ctx.destination);
    o.frequency.value = 880;
    g.gain.value = 0.15;
    o.start();
    o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.25);
    g.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.4);
    o.stop(ctx.currentTime + 0.45);
  } catch {
  }
}
function relTime(ts) {
  const sec = Math.max(0, Math.floor((Date.now() - ts) / 1e3));
  if (sec < 60) return `il y a ${sec}s`;
  const m = Math.floor(sec / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  return `il y a ${h}h ${m % 60}min`;
}
const STATUS_DOT = {
  "En attente": "bg-orange-400",
  "En preparation": "bg-blue-400",
  "Pret": "bg-yellow-400",
  "Livre": "bg-green-400"
};
function Page() {
  const [unlocked, setUnlocked] = reactExports.useState(false);
  const {
    settings
  } = useSettings();
  if (!unlocked) return /* @__PURE__ */ jsxRuntimeExports.jsx(PinScreen, { title: "Reception", expectedPin: settings.pinReception, onUnlock: () => setUnlocked(true) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {});
}
function Dashboard() {
  const orders = useOrders(3e3);
  const [now, setNow] = reactExports.useState(/* @__PURE__ */ new Date());
  const lastCount = reactExports.useRef(orders.length);
  const [, force] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      setNow(/* @__PURE__ */ new Date());
      force((n) => n + 1);
    }, 1e3);
    return () => clearInterval(id);
  }, []);
  reactExports.useEffect(() => {
    if (orders.length > lastCount.current) chime();
    lastCount.current = orders.length;
  }, [orders.length]);
  const today = reactExports.useMemo(() => {
    const d0 = /* @__PURE__ */ new Date();
    d0.setHours(0, 0, 0, 0);
    const t = orders.filter((o) => o.timestamp >= d0.getTime());
    const revenue = t.reduce((s, o) => s + o.totalPrice, 0);
    const counts = {};
    t.forEach((o) => o.items.forEach((i) => {
      counts[i.name] = (counts[i.name] ?? 0) + i.qty;
    }));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    const rooms = new Set(t.map((o) => o.roomId)).size;
    return {
      total: t.length,
      revenue,
      top,
      rooms
    };
  }, [orders]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0c1f36] text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-20 bg-ocean/95 backdrop-blur border-b border-turquoise/20 px-5 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "TOGO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-turquoise", children: "LIVING" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-sm font-body text-turquoise", children: "Reception" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block text-sm text-white/70", children: now.toLocaleString("fr-FR") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "inline-flex items-center gap-1 text-sm text-white/80 hover:text-turquoise", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
        " Sortir"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 py-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6", children: [{
        l: "Commandes du jour",
        v: today.total
      }, {
        l: "Revenu (FCFA)",
        v: today.revenue.toLocaleString("fr-FR")
      }, {
        l: "Article top",
        v: today.top
      }, {
        l: "Chambres actives",
        v: today.rooms
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-dark p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/60", children: s.l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl text-gold mt-1 truncate", children: s.v })
      ] }, s.l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { size: 18, className: "text-turquoise" }),
        " Commandes en direct"
      ] }),
      orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-dark p-12 text-center text-white/60", children: "Aucune commande pour le moment." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, className: "bg-white/8 border border-turquoise/20 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gold text-ocean font-display text-xl px-3 py-1 rounded-lg", children: [
            "Ch. ",
            o.roomId
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs flex items-center gap-1.5 text-white/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-block w-2 h-2 rounded-full ${STATUS_DOT[o.status]}` }),
            " ",
            o.status
          ] })
        ] }),
        o.guestName && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-turquoise mb-1", children: o.guestName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/50 mb-3", children: relTime(o.timestamp) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: o.items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            i.qty,
            "× ",
            i.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: formatFCFA(i.qty * i.price) })
        ] }, i.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display mt-3 text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatFCFA(o.totalPrice) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-4", children: [
          o.status === "En attente" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOrderStatus(o.id, "En preparation"), className: "flex-1 px-3 py-2 rounded-lg bg-turquoise text-ocean text-sm", children: "Confirmer" }),
          o.status !== "Livre" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOrderStatus(o.id, "Livre"), className: "flex-1 px-3 py-2 rounded-lg bg-green-500/80 text-white text-sm", children: "Livre" })
        ] })
      ] }, o.id)) })
    ] })
  ] });
}
export {
  Page as component
};
