import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { W as WaveDivider } from "./router-Cn0eETnM.mjs";
import { w as whatsappUrl } from "./whatsapp-B6f0Mlwg.mjs";
import { i as Check, j as ChevronLeft, k as ChevronRight, l as MessageCircle } from "../_libs/lucide-react.mjs";
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
const steps = ["Hebergement", "Personnes", "Coordonnees", "Recapitulatif"];
function Page() {
  const [step, setStep] = reactExports.useState(0);
  const [d, setD] = reactExports.useState({
    type: "Studio",
    arrivee: "",
    depart: "",
    adultes: 2,
    enfants: 0,
    demandes: "",
    nom: "",
    tel: "",
    email: "",
    heure: ""
  });
  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const send = () => {
    const msg = `Bonjour TOGOLIVING,
NOUVELLE RESERVATION:
Hebergement: ${d.type}
Arrivee: ${d.arrivee} a ${d.heure}
Depart: ${d.depart}
Adultes: ${d.adultes} | Enfants: ${d.enfants}
Nom: ${d.nom}
Tel: ${d.tel}
Email: ${d.email}
Demandes: ${d.demandes || "Aucune"}`;
    window.open(whatsappUrl(msg), "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-16 bg-ocean text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-3xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Reservation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "Confirmez votre Sejour" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mb-10", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition ${i <= step ? "bg-turquoise text-ocean" : "bg-white border border-turquoise/30 text-muted-foreground"}`, children: i < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) : i + 1 }),
        i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 h-0.5 mx-2 ${i < step ? "bg-turquoise" : "bg-turquoise/20"}` })
      ] }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: 20
      }, animate: {
        opacity: 1,
        x: 0
      }, className: "glass p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl text-ocean mb-5", children: steps[step] }),
        step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Type d'hebergement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: d.type, onChange: (e) => setD({
              ...d,
              type: e.target.value
            }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Studio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chambre Salon Standard 40m2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Chambre Salon Superieur 50m2" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Arrivee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: d.arrivee, onChange: (e) => setD({
                ...d,
                arrivee: e.target.value
              }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Depart" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", value: d.depart, onChange: (e) => setD({
                ...d,
                depart: e.target.value
              }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" })
            ] })
          ] })
        ] }),
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Adultes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: d.adultes, onChange: (e) => setD({
                ...d,
                adultes: +e.target.value
              }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30", children: [1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: n }, n)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Enfants" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: d.enfants, onChange: (e) => setD({
                ...d,
                enfants: +e.target.value
              }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30", children: [0, 1, 2, 3, 4].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: n }, n)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Demandes speciales" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: d.demandes, onChange: (e) => setD({
              ...d,
              demandes: e.target.value
            }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Nom complet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.nom, onChange: (e) => setD({
              ...d,
              nom: e.target.value
            }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Telephone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: d.tel, onChange: (e) => setD({
                ...d,
                tel: e.target.value
              }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Heure d'arrivee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "time", value: d.heure, onChange: (e) => setD({
                ...d,
                heure: e.target.value
              }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: d.email, onChange: (e) => setD({
              ...d,
              email: e.target.value
            }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-ocean", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Hebergement:" }),
            " ",
            d.type
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Arrivee:" }),
            " ",
            d.arrivee || "—",
            " a ",
            d.heure || "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Depart:" }),
            " ",
            d.depart || "—"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Personnes:" }),
            " ",
            d.adultes,
            " adultes, ",
            d.enfants,
            " enfants"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Nom:" }),
            " ",
            d.nom
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tel:" }),
            " ",
            d.tel
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email:" }),
            " ",
            d.email
          ] }),
          d.demandes && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Demandes:" }),
            " ",
            d.demandes
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-8", children: [
          step > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: back, className: "inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-ocean/30 text-ocean hover:bg-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 16 }),
            " Retour"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", {}),
          step < steps.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: next, className: "inline-flex items-center gap-1 px-5 py-2.5 rounded-lg bg-ocean text-white hover:bg-gold hover:text-ocean transition", children: [
            "Suivant ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 16 })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: send, className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-turquoise text-ocean font-medium hover:bg-gold transition shimmer-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
            " Confirmer via WhatsApp"
          ] })
        ] })
      ] }, step)
    ] }) })
  ] });
}
export {
  Page as component
};
