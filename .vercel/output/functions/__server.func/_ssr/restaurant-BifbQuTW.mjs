import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useMenu, M as MENU_CATEGORIES } from "./useMenu-CflLAUw0.mjs";
import { W as WaveDivider } from "./router-Cn0eETnM.mjs";
import { f as formatFCFA, w as whatsappUrl } from "./whatsapp-B6f0Mlwg.mjs";
import { D as Droplets, W as Wine, c as GlassWater, I as IceCreamCone, d as Pizza, C as ChefHat, S as Sunrise, e as Coffee, f as ShoppingBag, A as ArrowRight, X, g as Minus, h as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
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
  "Petit-Déjeuner": Coffee,
  "Entrées": Sunrise,
  "Plats": ChefHat,
  "Fast Food & Pizzas": Pizza,
  "Desserts": IceCreamCone,
  "Cocktails": GlassWater,
  "Vins & Spiritueux": Wine,
  "Boissons": Droplets
};
function PriceTag({
  price,
  priceMax
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 px-3 py-1.5 rounded-lg bg-gold/20 border border-gold/40 text-ocean font-semibold text-sm whitespace-nowrap", children: [
    formatFCFA(price),
    priceMax ? ` – ${formatFCFA(priceMax)}` : ""
  ] });
}
function Page() {
  const {
    items
  } = useMenu();
  const [tab, setTab] = reactExports.useState("Petit-Déjeuner");
  const [cart, setCart] = reactExports.useState({});
  const [drawerOpen, setDrawerOpen] = reactExports.useState(false);
  const [fulfillment, setFulfillment] = reactExports.useState("Retrait au restaurant");
  const [deliveryAddress, setDeliveryAddress] = reactExports.useState("");
  const filtered = items.filter((i) => i.category === tab);
  const totals = reactExports.useMemo(() => {
    const arr = Object.values(cart);
    const count = arr.reduce((sum, item) => sum + item.qty, 0);
    const total = arr.reduce((sum, item) => sum + item.qty * item.price, 0);
    return {
      arr,
      count,
      total
    };
  }, [cart]);
  const add = (id, name, price, description) => {
    setCart((current) => ({
      ...current,
      [id]: {
        id,
        name,
        price,
        description,
        qty: (current[id]?.qty ?? 0) + 1
      }
    }));
  };
  const dec = (id) => {
    setCart((current) => {
      const existing = current[id];
      if (!existing) return current;
      if (existing.qty <= 1) {
        const {
          [id]: _,
          ...rest
        } = current;
        return rest;
      }
      return {
        ...current,
        [id]: {
          ...existing,
          qty: existing.qty - 1
        }
      };
    });
  };
  const remove = (id) => setCart((current) => {
    const {
      [id]: _,
      ...rest
    } = current;
    return rest;
  });
  const sendWhatsApp = () => {
    if (totals.arr.length === 0) return;
    const lines = totals.arr.map((item) => {
      const description = item.description ? `
  ${item.description}` : "";
      return `- ${item.qty} x ${item.name} : ${formatFCFA(item.qty * item.price)}${description}`;
    });
    const message = ["Bonjour TOGOLIVING,", "Je souhaite commander au restaurant :", `Mode de reception: ${fulfillment}`, fulfillment === "Livraison" && deliveryAddress ? `Adresse de livraison: ${deliveryAddress}` : null, ...lines, `Total: ${formatFCFA(totals.total)}`, "Merci de confirmer la disponibilite."].filter((line) => Boolean(line)).join("\n");
    window.open(whatsappUrl(message), "_blank", "noreferrer");
  };
  const subcategories = [...new Set(filtered.map((i) => i.subcategory).filter(Boolean))];
  const hasSubcategories = subcategories.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 bg-ocean text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-35" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Au Restaurant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Saveurs du Monde" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl mt-2", children: "Vue sur l'Océan" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2 mb-10", children: MENU_CATEGORIES.map((c) => {
        const Icon = ICONS[c];
        const active = tab === c;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(c), className: `inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition ${active ? "bg-ocean text-white shadow-lg scale-105" : "bg-white text-ocean border border-turquoise/30 hover:border-turquoise hover:shadow"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 15 }),
          c
        ] }, c);
      }) }),
      hasSubcategories ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, children: subcategories.map((sub) => {
        const subItems = filtered.filter((i) => i.subcategory === sub);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-turquoise/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-ocean px-3 py-1 rounded-full border border-turquoise/40 bg-white", children: sub }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-turquoise/20" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: subItems.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCard, { it, onAdd: () => add(it.id, it.name, it.price, it.description) }, it.id)) })
        ] }, sub);
      }) }, tab) : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 10
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5", children: [
        filtered.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCard, { it, onAdd: () => add(it.id, it.name, it.price, it.description) }, it.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full text-center text-muted-foreground py-10", children: "Aucun article dans cette catégorie." })
      ] }, tab)
    ] }) }),
    totals.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 inset-x-0 z-40 px-3 pb-3 sm:px-6 sm:pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setDrawerOpen(true), className: "max-w-6xl mx-auto w-full flex items-center justify-between gap-3 bg-ocean/95 text-white px-4 sm:px-5 py-3.5 rounded-[1.4rem] border border-gold/30 shadow-2xl shadow-ocean/35 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ocean shadow-lg shadow-gold/25 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-left leading-tight min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block font-medium truncate", children: [
            totals.count,
            " article",
            totals.count > 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-white/60 truncate", children: "Tap pour voir le panier" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-gold whitespace-nowrap", children: formatFCFA(totals.total) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1 bg-gold text-ocean px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap", children: [
        "Commander ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 15 })
      ] })
    ] }) }),
    drawerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 bg-ocean/85 backdrop-blur-sm flex items-end", onClick: () => setDrawerOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full bg-[linear-gradient(180deg,#0f2642_0%,#0c1f36_100%)] rounded-t-[2rem] p-5 sm:p-6 max-h-[88vh] overflow-y-auto border-t border-gold/20 shadow-[0_-24px_80px_rgba(0,0,0,0.35)]", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.3em] text-turquoise/70", children: "Panier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-white", children: "Votre commande" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDrawerOpen(false), className: "h-11 w-11 rounded-full bg-white/10 border border-white/10 text-white/80 hover:text-white hover:bg-white/15 inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/70", children: "Articles sélectionnés" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-xl text-gold", children: totals.count })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white/5 border border-white/10 p-4 mb-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.25em] text-turquoise/70 mb-2", children: "Réception" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-2", children: ["Retrait au restaurant", "Livraison"].map((method) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFulfillment(method), className: `rounded-xl px-4 py-3 text-sm font-medium transition border ${fulfillment === method ? "bg-gold text-ocean border-gold" : "bg-white/5 text-white/75 border-white/10 hover:border-gold/30"}`, children: method }, method)) })
        ] }),
        fulfillment === "Livraison" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-[0.25em] text-turquoise/70 mb-2 block", children: "Adresse de livraison" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: deliveryAddress, onChange: (e) => setDeliveryAddress(e.target.value), placeholder: "Quartier, rue, repère, numéro...", className: "w-full rounded-xl bg-white/8 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-gold/50" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-5", children: totals.arr.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 bg-white/6 rounded-2xl p-3 sm:p-4 border border-white/8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm sm:text-base font-medium truncate", children: item.name }),
          item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/45 mt-1 line-clamp-2", children: item.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-white/55 mt-1", children: [
            formatFCFA(item.price),
            " / unité"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-full bg-white/5 p-1 border border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => dec(item.id), className: "w-8 h-8 rounded-full bg-white/10 text-white inline-flex items-center justify-center hover:bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center font-medium text-white", children: item.qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => add(item.id, item.name, item.price), className: "w-8 h-8 rounded-full bg-gold text-ocean inline-flex items-center justify-center shadow-md shadow-gold/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(item.id), className: "text-white/45 hover:text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
      ] }, item.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl bg-gold/10 border border-gold/20 px-4 py-4 text-gold mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl", children: formatFCFA(totals.total) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: sendWhatsApp, className: "w-full mt-5 py-4 rounded-2xl bg-turquoise text-ocean font-medium shimmer-gold inline-flex items-center justify-center gap-2 shadow-lg shadow-turquoise/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 18 }),
        "Envoyer sur WhatsApp"
      ] })
    ] }) })
  ] });
}
function MenuCard({
  it,
  onAdd
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `glass p-5 hover-lift border-2 transition-colors ${it.soldOut ? "opacity-50" : "border-transparent hover:border-gold/60"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg text-ocean leading-snug", children: it.name }),
      it.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: it.description }),
      it.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block mt-2 text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground", children: "Indisponible" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PriceTag, { price: it.price, priceMax: it.priceMax }),
      !it.soldOut && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.button, { whileTap: {
        scale: 0.85
      }, onClick: onAdd, className: "group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(248,245,240,0.9)_100%)] text-ocean shadow-[0_14px_30px_rgba(30,58,95,0.14)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_18px_36px_rgba(30,58,95,0.22)]", "aria-label": `Ajouter ${it.name} au panier`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1E3A5F_0%,#2d5682_100%)] text-white shadow-md shadow-ocean/20 transition-transform group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,#D4AF37_0%,#f1d57c_100%)] group-hover:text-ocean", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16, strokeWidth: 3 }) }) })
    ] })
  ] }) });
}
export {
  Page as component
};
