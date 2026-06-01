import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useMenu, M as MENU_CATEGORIES } from "./useMenu-DdMR6tIN.mjs";
import { a as addOrder } from "./useOrders-BMZ4xY-T.mjs";
import { f as formatFCFA } from "./whatsapp-B6f0Mlwg.mjs";
import { R as Route, W as WaveDivider } from "./router-DEwJ-39i.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { f as Check, s as Plus, F as Minus, J as ShoppingBag, X, t as Trash2 } from "../_libs/lucide-react.mjs";
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
function RoomPage() {
  const {
    roomId
  } = Route.useParams();
  const isTable = /^T\d+$/i.test(roomId) || /^table[-_ ]?\d+$/i.test(roomId);
  const placeNumber = roomId.replace(/^T0*/i, "").replace(/^table[-_ ]?/i, "");
  const placeLabel = isTable ? `Table ${placeNumber}` : `Chambre ${roomId}`;
  const placeContext = isTable ? "depuis votre table" : "depuis votre chambre";
  const {
    items
  } = useMenu();
  const [tab, setTab] = reactExports.useState("Petit-Dejeuner");
  const [cart, setCart] = reactExports.useState({});
  const [guestName, setGuest] = reactExports.useState("");
  const [drawerOpen, setDrawer] = reactExports.useState(false);
  const [confirmed, setConfirmed] = reactExports.useState(null);
  const filtered = items.filter((i) => i.category === tab);
  const totals = reactExports.useMemo(() => {
    const arr = Object.values(cart);
    const count = arr.reduce((s, i) => s + i.qty, 0);
    const total = arr.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      count,
      total,
      arr
    };
  }, [cart]);
  const add = (id, name, price) => {
    setCart((c) => ({
      ...c,
      [id]: {
        id,
        name,
        price,
        qty: (c[id]?.qty ?? 0) + 1
      }
    }));
  };
  const dec = (id) => {
    setCart((c) => {
      const cur = c[id];
      if (!cur) return c;
      if (cur.qty <= 1) {
        const {
          [id]: _,
          ...rest
        } = c;
        return rest;
      }
      return {
        ...c,
        [id]: {
          ...cur,
          qty: cur.qty - 1
        }
      };
    });
  };
  const removeItem = (id) => setCart((c) => {
    const {
      [id]: _,
      ...rest
    } = c;
    return rest;
  });
  const submit = () => {
    if (totals.arr.length === 0) return;
    addOrder({
      roomId,
      guestName,
      items: totals.arr,
      totalPrice: totals.total
    });
    setConfirmed({
      items: totals.arr,
      total: totals.total
    });
    setCart({});
    setDrawer(false);
  };
  if (confirmed) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-b from-ocean to-[#0c1f36] text-white flex flex-col items-center justify-center px-6 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scale: 0.8,
        opacity: 0
      }, animate: {
        scale: 1,
        opacity: 1
      }, className: "w-20 h-20 rounded-full bg-turquoise text-ocean flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 42 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-gold text-center", children: "Commande envoyee !" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-white/70 text-center max-w-md", children: [
        "Notre equipe a recu votre commande pour ",
        placeLabel.toLowerCase(),
        ". Elle arrive bientot."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-dark p-5 mt-6 w-full max-w-md", children: [
        confirmed.items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm py-1.5 border-b border-white/10 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            i.qty,
            "× ",
            i.name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-turquoise", children: formatFCFA(i.qty * i.price) })
        ] }, i.id)),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display text-lg mt-3 text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatFCFA(confirmed.total) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirmed(null), className: "mt-8 px-6 py-3 rounded-full bg-turquoise text-ocean font-medium", children: "Commander autre chose" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-b from-ocean to-[#0c1f36] text-white pb-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-10 pb-6 px-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "TOGO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-turquoise", children: "LIVING" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl text-gold mt-4", children: placeLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-accent text-turquoise mt-1 text-lg", children: [
        "Commandez ",
        placeContext
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0 opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#0c1f36" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: guestName, onChange: (e) => setGuest(e.target.value), placeholder: "Votre prenom (optionnel)", className: "w-full bg-white/10 border border-turquoise/30 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 mb-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 snap-x", children: MENU_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(c), className: `shrink-0 snap-start px-4 py-2 rounded-full text-sm transition ${tab === c ? "bg-turquoise text-ocean" : "bg-white/10 text-white border border-white/15"}`, children: c }, c)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: filtered.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl p-4 border ${it.soldOut ? "bg-white/5 opacity-50 border-white/10" : "bg-white/8 border-gold/30 hover:border-gold"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-lg", children: it.name }),
            it.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/60 mt-1", children: it.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-turquoise font-semibold mt-2", children: formatFCFA(it.price) }),
            it.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs mt-1 text-white/50", children: "Indisponible" })
          ] }),
          !it.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.button, { whileTap: {
            scale: 0.85
          }, onClick: () => add(it.id, it.name, it.price), className: "shrink-0 self-start w-10 h-10 rounded-full bg-gold text-ocean flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 20 }) })
        ] }),
        cart[it.id] && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-end gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dec(it.id), className: "w-7 h-7 rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14, className: "mx-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center", children: cart[it.id].qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => add(it.id, it.name, it.price), className: "w-7 h-7 rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mx-auto" }) })
        ] })
      ] }, it.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: totals.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      y: 100
    }, animate: {
      y: 0
    }, exit: {
      y: 100
    }, className: "fixed bottom-0 inset-x-0 z-40 bg-ocean border-t border-turquoise/30 backdrop-blur p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDrawer(true), className: "max-w-3xl mx-auto w-full flex items-center justify-between gap-3 bg-gold text-ocean px-5 py-3 rounded-xl font-medium", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18 }),
        " ",
        totals.count,
        " article",
        totals.count > 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatFCFA(totals.total) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-ocean text-gold px-3 py-1 rounded-full text-sm", children: "Commander" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: drawerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "fixed inset-0 z-50 bg-ocean/80 flex items-end", onClick: () => setDrawer(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      y: "100%"
    }, animate: {
      y: 0
    }, exit: {
      y: "100%"
    }, transition: {
      type: "spring",
      damping: 25
    }, onClick: (e) => e.stopPropagation(), className: "w-full bg-[#0c1f36] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-gold", children: "Votre commande" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDrawer(false), className: "text-white/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: totals.arr.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/5 rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: i.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-turquoise", children: formatFCFA(i.price) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dec(i.id), className: "w-8 h-8 rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14, className: "mx-auto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 text-center", children: i.qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => add(i.id, i.name, i.price), className: "w-8 h-8 rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "mx-auto" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(i.id), className: "text-white/50 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
      ] }, i.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between font-display text-xl mt-5 text-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatFCFA(totals.total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: submit, className: "w-full mt-5 py-4 rounded-xl bg-turquoise text-ocean font-medium shimmer-gold", children: "Envoyer la commande" })
    ] }) }) })
  ] });
}
export {
  RoomPage as component
};
