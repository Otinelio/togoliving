import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useSettings, P as PinScreen, D as DEFAULT_SETTINGS } from "./useSettings-CXnxe5K6.mjs";
import { Q as QRCode } from "../_libs/qrcode.mjs";
import { u as useMenu, M as MENU_CATEGORIES } from "./useMenu-CflLAUw0.mjs";
import { u as useLocalStorage } from "./useLocalStorage-DKzl3n7t.mjs";
import { u as useOrders } from "./useOrders-BMZ4xY-T.mjs";
import { f as formatFCFA } from "./whatsapp-B6f0Mlwg.mjs";
import { v as LayoutDashboard, U as UtensilsCrossed, q as BedDouble, Q as QrCode, w as ClipboardList, x as Settings, L as LogOut, h as Plus, T as Trash2, y as Download, z as Printer } from "../_libs/lucide-react.mjs";
import "./router-BYrtquX9.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "fs";
import "../_libs/dijkstrajs.mjs";
import "../_libs/pngjs.mjs";
import "zlib";
import "assert";
import "buffer";
function QRCodeCard({ value, label, sublabel, filename = "QR-TOGOLIVING.png", size = 300 }) {
  const [dataUrl, setDataUrl] = reactExports.useState("");
  reactExports.useEffect(() => {
    QRCode.toDataURL(value, {
      width: size * 1.4,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#1E3A5F", light: "#F8F5F0" }
    }).then(setDataUrl).catch(() => setDataUrl(""));
  }, [value, size]);
  const download = async () => {
    if (!dataUrl) return;
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };
  const printQR = () => {
    const w = window.open("", "_blank", "width=600,height=800");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>${label}</title>
      <style>
        @page { margin: 1cm; }
        body { font-family: Georgia, serif; text-align: center; padding: 30px; color: #1E3A5F; }
        .brand { font-size: 26px; font-weight: 700; }
        .brand .turq { color: #40E0D0; }
        .label { font-size: 28px; margin: 18px 0 8px; }
        .frame { display: inline-block; padding: 14px; border: 3px solid #D4AF37; border-radius: 12px; background: #F8F5F0; }
        .sub { font-size: 14px; margin-top: 14px; color: #4A6480; font-style: italic; }
        .footer { margin-top: 24px; font-size: 12px; color: #4A6480; }
      </style>
    </head><body>
      <div class="brand">TOGO<span class="turq">LIVING</span></div>
      <div class="label">${label}</div>
      <div class="frame"><img src="${dataUrl}" width="320" height="320" /></div>
      <div class="sub">${sublabel ?? "Scannez avec votre telephone"}</div>
      <div class="footer">togoliving.net &nbsp;|&nbsp; +228 93 87 20 88</div>
      <script>window.onload = () => { setTimeout(() => window.print(), 200); };<\/script>
    </body></html>`);
    w.document.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border-2 border-gold/40 p-5 flex flex-col items-center text-center hover-lift", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-ocean font-semibold", children: label }),
    sublabel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-3", children: sublabel }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-3 p-3 rounded-xl bg-sand border border-gold/30", children: dataUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: dataUrl, alt: `QR ${label}`, width: size * 0.7, height: size * 0.7 }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[210px] h-[210px] bg-muted animate-pulse rounded-md" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2 w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: download, className: "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-ocean text-white text-xs hover:bg-ocean/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 14 }),
        " PNG"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: printQR, className: "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-turquoise text-ocean text-xs hover:bg-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { size: 14 }),
        " Imprimer"
      ] })
    ] })
  ] });
}
const DEFAULT_ROOMS = [
  { id: "101", type: "Studio", status: "Disponible", floor: 1 },
  { id: "102", type: "Studio", status: "Disponible", floor: 1 },
  { id: "103", type: "Studio", status: "Disponible", floor: 1 },
  { id: "201", type: "Standard 40m2", status: "Disponible", floor: 2 },
  { id: "202", type: "Standard 40m2", status: "Disponible", floor: 2 },
  { id: "203", type: "Standard 40m2", status: "Disponible", floor: 2 },
  { id: "301", type: "Superieur 50m2", status: "Disponible", floor: 3 },
  { id: "302", type: "Superieur 50m2", status: "Disponible", floor: 3 },
  { id: "303", type: "Superieur 50m2", status: "Disponible", floor: 3 }
];
function useRooms() {
  const [rooms, setRooms] = useLocalStorage("togoliving_rooms", DEFAULT_ROOMS);
  const addRoom = (room) => setRooms([...rooms, room]);
  const updateRoom = (id, patch) => setRooms(rooms.map((r) => r.id === id ? { ...r, ...patch } : r));
  const removeRoom = (id) => setRooms(rooms.filter((r) => r.id !== id));
  return { rooms, setRooms, addRoom, updateRoom, removeRoom };
}
function Page() {
  const {
    settings
  } = useSettings();
  const [u, setU] = reactExports.useState(false);
  if (!u) return /* @__PURE__ */ jsxRuntimeExports.jsx(PinScreen, { title: "Administration", expectedPin: settings.pinAdmin, onUnlock: () => setU(true) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dash, {});
}
function Dash() {
  const [section, setSection] = reactExports.useState("overview");
  const nav = [{
    id: "overview",
    icon: LayoutDashboard,
    label: "Vue Generale"
  }, {
    id: "menu",
    icon: UtensilsCrossed,
    label: "Gestion Menu"
  }, {
    id: "rooms",
    icon: BedDouble,
    label: "Chambres"
  }, {
    id: "qr",
    icon: QrCode,
    label: "QR Codes"
  }, {
    id: "history",
    icon: ClipboardList,
    label: "Historique"
  }, {
    id: "settings",
    icon: Settings,
    label: "Parametres"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-sand flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-64 bg-ocean text-white p-5 hidden md:flex md:flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-xl mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "TOGO" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-turquoise", children: "LIVING" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-turquoise font-body mt-1", children: "Admin" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1 flex-1", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSection(n.id), className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${section === n.id ? "bg-turquoise text-ocean" : "hover:bg-white/10"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { size: 18 }),
        " ",
        n.label
      ] }, n.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "/", className: "mt-auto inline-flex items-center gap-2 text-sm text-white/70 hover:text-turquoise", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
        " Quitter"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden fixed bottom-0 inset-x-0 z-30 bg-ocean text-white flex overflow-x-auto", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSection(n.id), className: `flex-1 min-w-[80px] py-3 text-xs flex flex-col items-center gap-1 ${section === n.id ? "text-turquoise" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { size: 18 }),
      " ",
      n.label.split(" ")[0]
    ] }, n.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 p-5 md:p-8 pb-24 md:pb-8 overflow-x-hidden", children: [
      section === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(Overview, {}),
      section === "menu" && /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {}),
      section === "rooms" && /* @__PURE__ */ jsxRuntimeExports.jsx(Rooms, {}),
      section === "qr" && /* @__PURE__ */ jsxRuntimeExports.jsx(QRSection, {}),
      section === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx(History, {}),
      section === "settings" && /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsSection, {})
    ] })
  ] });
}
function Overview() {
  const orders = useOrders(5e3);
  const {
    rooms
  } = useRooms();
  const {
    items
  } = useMenu();
  const revenue = orders.reduce((s, o) => s + o.totalPrice, 0);
  const occ = rooms.filter((r) => r.status === "Occupe").length;
  const active = items.filter((i) => !i.soldOut).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-ocean mb-6", children: "Vue Generale" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", children: [{
      l: "Total commandes",
      v: orders.length
    }, {
      l: "Revenu total",
      v: formatFCFA(revenue)
    }, {
      l: "Chambres occupees",
      v: `${occ}/${rooms.length}`
    }, {
      l: "Articles menu actifs",
      v: active
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.l }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-2xl text-ocean mt-1", children: s.v })
    ] }, s.l)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-ocean mb-3", children: "Activite recente" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "divide-y divide-turquoise/10", children: [
        orders.slice(0, 8).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "py-2 flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Ch. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: o.roomId }),
            " · ",
            o.items.length,
            " article(s) · ",
            o.status
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: formatFCFA(o.totalPrice) })
        ] }, o.id)),
        orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "py-4 text-center text-muted-foreground text-sm", children: "Aucune commande" })
      ] })
    ] })
  ] });
}
function Menu() {
  const {
    items,
    addItem,
    updateItem,
    removeItem,
    toggleSoldOut
  } = useMenu();
  const [tab, setTab] = reactExports.useState("Petit-Déjeuner");
  const [form, setForm] = reactExports.useState({
    name: "",
    price: "",
    description: ""
  });
  const add = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    addItem({
      name: form.name,
      category: tab,
      price: +form.price,
      description: form.description
    });
    setForm({
      name: "",
      price: "",
      description: ""
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-ocean mb-6", children: "Gestion Menu" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-5", children: MENU_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(c), className: `px-3 py-1.5 rounded-full text-sm ${tab === c ? "bg-ocean text-white" : "bg-white border border-turquoise/30"}`, children: c }, c)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: add, className: "glass p-4 mb-6 grid md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, placeholder: "Nom", value: form.name, onChange: (e) => setForm({
        ...form,
        name: e.target.value
      }), className: "bg-white px-3 py-2 rounded border border-turquoise/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "number", placeholder: "Prix FCFA", value: form.price, onChange: (e) => setForm({
        ...form,
        price: e.target.value
      }), className: "bg-white px-3 py-2 rounded border border-turquoise/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Description", value: form.description, onChange: (e) => setForm({
        ...form,
        description: e.target.value
      }), className: "bg-white px-3 py-2 rounded border border-turquoise/30 md:col-span-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-ocean text-white rounded px-3 py-2 inline-flex items-center justify-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        " Ajouter"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-3", children: items.filter((i) => i.category === tab).map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-turquoise/20 rounded-xl p-4 flex justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: it.name, onChange: (e) => updateItem(it.id, {
          name: e.target.value
        }), className: "font-display text-ocean bg-transparent w-full" }),
        it.description && /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: it.description, onChange: (e) => updateItem(it.id, {
          description: e.target.value
        }), className: "text-xs text-muted-foreground bg-transparent w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: it.price, onChange: (e) => updateItem(it.id, {
            price: +e.target.value
          }), className: "text-gold font-semibold bg-transparent w-24" }),
          " FCFA"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-xs flex items-center gap-1.5 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: !!it.soldOut, onChange: () => toggleSoldOut(it.id) }),
          " Indispo."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeItem(it.id), className: "text-destructive p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) })
      ] })
    ] }, it.id)) })
  ] });
}
function Rooms() {
  const {
    rooms,
    addRoom,
    updateRoom,
    removeRoom
  } = useRooms();
  const [newId, setNewId] = reactExports.useState("");
  const [newType, setNewType] = reactExports.useState("Studio");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-ocean mb-6", children: "Chambres" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-4 mb-5 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Numero", value: newId, onChange: (e) => setNewId(e.target.value), className: "bg-white px-3 py-2 rounded border border-turquoise/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: newType, onChange: (e) => setNewType(e.target.value), className: "bg-white px-3 py-2 rounded border border-turquoise/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Standard 40m2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Superieur 50m2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        if (newId) {
          addRoom({
            id: newId,
            type: newType,
            status: "Disponible",
            floor: +newId[0] || 1
          });
          setNewId("");
        }
      }, className: "bg-ocean text-white rounded px-3 py-2 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        " Ajouter"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto bg-white rounded-xl border border-turquoise/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-ocean text-white text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "N°" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Statut" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Notes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rooms.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-turquoise/10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-display text-ocean", children: r.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: r.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: r.status, onChange: (e) => updateRoom(r.id, {
          status: e.target.value
        }), className: "bg-sand px-2 py-1 rounded border border-turquoise/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Disponible" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Occupe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Maintenance" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: r.guest ?? "", onChange: (e) => updateRoom(r.id, {
          guest: e.target.value
        }), className: "bg-sand px-2 py-1 rounded border border-turquoise/20 w-32" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: r.notes ?? "", onChange: (e) => updateRoom(r.id, {
          notes: e.target.value
        }), className: "bg-sand px-2 py-1 rounded border border-turquoise/20 w-32" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeRoom(r.id), className: "text-destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 16 }) }) })
      ] }, r.id)) })
    ] }) })
  ] });
}
function QRSection() {
  const {
    rooms
  } = useRooms();
  const {
    settings
  } = useSettings();
  const [tab, setTab] = reactExports.useState("rooms");
  const [tableCount, setTableCount] = reactExports.useState(12);
  const tableIds = reactExports.useMemo(() => Array.from({
    length: Math.max(1, Math.min(60, tableCount))
  }, (_, i) => `T${String(i + 1).padStart(2, "0")}`), [tableCount]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-ocean mb-6", children: "QR Codes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("rooms"), className: `px-4 py-2 rounded-full text-sm ${tab === "rooms" ? "bg-ocean text-white" : "bg-white border border-turquoise/30"}`, children: "Chambres" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("tables"), className: `px-4 py-2 rounded-full text-sm ${tab === "tables" ? "bg-ocean text-white" : "bg-white border border-turquoise/30"}`, children: "Tables" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("menu"), className: `px-4 py-2 rounded-full text-sm ${tab === "menu" ? "bg-ocean text-white" : "bg-white border border-turquoise/30"}`, children: "Menu" })
    ] }),
    tab === "rooms" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: rooms.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeCard, { value: `${settings.domain}/room/${r.id}`, label: `Chambre ${r.id}`, sublabel: `${r.type} · Scannez pour commander`, filename: `QR-Chambre-${r.id}-TOGOLIVING.png` }, r.id)) }),
    tab === "menu" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeCard, { value: `${settings.domain}/restaurant`, label: "Menu TOGOLIVING", sublabel: "Scannez pour voir notre menu complet", filename: "QR-Menu-TOGOLIVING.png", size: 400 }) }),
    tab === "tables" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-4 mb-5 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm text-ocean mb-1", children: "Nombre de tables (1-60)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 60, value: tableCount, onChange: (e) => setTableCount(Number(e.target.value)), className: "w-full bg-white px-3 py-2 rounded border border-turquoise/30" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4", children: tableIds.map((tableId) => /* @__PURE__ */ jsxRuntimeExports.jsx(QRCodeCard, { value: `${settings.domain}/room/${tableId}`, label: `Table ${tableId.replace(/^T0*/, "")}`, sublabel: "Scannez pour commander depuis votre table", filename: `QR-Table-${tableId}-TOGOLIVING.png` }, tableId)) })
    ] })
  ] });
}
function History() {
  const orders = useOrders(5e3);
  const [room, setRoom] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("");
  const filtered = orders.filter((o) => (!room || o.roomId.includes(room)) && (!status || o.status === status));
  const exportCsv = () => {
    const rows = [["Date", "Chambre", "Client", "Articles", "Total", "Statut"]];
    filtered.forEach((o) => rows.push([new Date(o.timestamp).toLocaleString("fr-FR"), o.roomId, o.guestName ?? "", o.items.map((i) => `${i.qty}x ${i.name}`).join(" | "), String(o.totalPrice), o.status]));
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], {
      type: "text/csv"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `togoliving-orders-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-ocean mb-6", children: "Historique Commandes" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass p-4 mb-5 flex flex-wrap gap-2 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Filtrer par chambre", value: room, onChange: (e) => setRoom(e.target.value), className: "bg-white px-3 py-2 rounded border border-turquoise/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: status, onChange: (e) => setStatus(e.target.value), className: "bg-white px-3 py-2 rounded border border-turquoise/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Tous statuts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "En attente" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "En preparation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Pret" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Livre" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportCsv, className: "ml-auto inline-flex items-center gap-1 bg-ocean text-white rounded px-3 py-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { size: 16 }),
        " CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto bg-white rounded-xl border border-turquoise/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-ocean text-white text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Ch." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Client" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Articles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Total" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-3", children: "Statut" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
        filtered.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-turquoise/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 whitespace-nowrap", children: new Date(o.timestamp).toLocaleString("fr-FR") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 font-semibold", children: o.roomId }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: o.guestName ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: o.items.map((i) => `${i.qty}× ${i.name}`).join(", ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3 text-gold font-semibold", children: formatFCFA(o.totalPrice) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-3", children: o.status })
        ] }, o.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 6, className: "p-6 text-center text-muted-foreground", children: "Aucune commande" }) })
      ] })
    ] }) })
  ] });
}
function SettingsSection() {
  const {
    settings,
    setSettings
  } = useSettings();
  const [confirm, setConfirm] = reactExports.useState(false);
  const reset = () => {
    ["togoliving_menu", "togoliving_rooms", "togoliving_orders", "togoliving_settings"].forEach((k) => localStorage.removeItem(k));
    location.reload();
  };
  const field = (k, label, type = "text") => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value: settings[k], onChange: (e) => setSettings({
      ...settings,
      [k]: e.target.value
    }), className: "mt-1 w-full bg-white px-3 py-2 rounded border border-turquoise/30" })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl text-ocean mb-6", children: "Parametres" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      field("hotelName", "Nom de l'etablissement"),
      field("whatsapp", "Numero WhatsApp"),
      field("domain", "Domaine URL (pour les QR)"),
      field("pinAdmin", "PIN Admin"),
      field("pinReception", "PIN Reception"),
      field("pinKitchen", "PIN Cuisine"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSettings(DEFAULT_SETTINGS), className: "px-4 py-2 rounded-lg bg-white border border-ocean/20 text-ocean text-sm", children: "Restaurer defauts" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 border-t border-turquoise/20 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl text-destructive mb-2", children: "Zone de danger" }),
      !confirm ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirm(true), className: "px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm", children: "Reinitialiser toutes les donnees" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: reset, className: "px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm", children: "Confirmer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setConfirm(false), className: "px-4 py-2 rounded-lg bg-white border border-ocean/20 text-sm", children: "Annuler" })
      ] })
    ] })
  ] });
}
export {
  Page as component
};
