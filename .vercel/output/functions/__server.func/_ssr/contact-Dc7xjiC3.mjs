import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { W as WaveDivider } from "./router-Cn0eETnM.mjs";
import { w as whatsappUrl } from "./whatsapp-B6f0Mlwg.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { b as MapPin, P as Phone, a as Mail, G as Globe, u as Clock, l as MessageCircle } from "../_libs/lucide-react.mjs";
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
function Page() {
  const [f, setF] = reactExports.useState({
    nom: "",
    email: "",
    objet: "Reservation",
    message: ""
  });
  const send = (e) => {
    e.preventDefault();
    const msg = `Bonjour TOGOLIVING,
Nom: ${f.nom}
Email: ${f.email}
Objet: ${f.objet}
Message: ${f.message}`;
    window.open(whatsappUrl(msg), "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 bg-ocean text-white overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-ocean/80 via-ocean/70 to-ocean" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-4xl mx-auto px-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise text-xl", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl", children: "Parlons de votre Sejour" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#F8F5F0" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-sand py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: -20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-ocean mb-6", children: "Nos Coordonnees" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4 text-ocean", children: [{
          i: MapPin,
          l: "Kpogan Agbetsiko, face Station Total, Route N2, Lome, Togo"
        }, {
          i: Phone,
          l: "+228 93 87 20 88",
          href: "tel:+22893872088"
        }, {
          i: Mail,
          l: "contact@togoliving.net",
          href: "mailto:contact@togoliving.net"
        }, {
          i: Globe,
          l: "togoliving.net"
        }, {
          i: Clock,
          l: "Ouvert 24h/24, 7j/7"
        }].map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 h-10 rounded-full bg-turquoise/15 text-turquoise flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.i, { size: 18 }) }),
          c.href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: c.href, className: "hover:text-turquoise", children: c.l }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.l })
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 rounded-2xl overflow-hidden border border-turquoise/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: "TOGOLIVING Localisation", src: "https://www.google.com/maps?q=Kpogan+Agbetsiko+Lome+Togo&output=embed", className: "w-full h-64", loading: "lazy" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.form, { onSubmit: send, initial: {
        opacity: 0,
        x: 20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, className: "glass p-7 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl text-ocean", children: "Envoyez un Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Nom complet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: f.nom, onChange: (e) => setF({
            ...f,
            nom: e.target.value
          }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, type: "email", value: f.email, onChange: (e) => setF({
            ...f,
            email: e.target.value
          }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Objet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: f.objet, onChange: (e) => setF({
            ...f,
            objet: e.target.value
          }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Reservation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Renseignements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Evenement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: "Autre" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-ocean", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, rows: 4, value: f.message, onChange: (e) => setF({
            ...f,
            message: e.target.value
          }), className: "mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30 focus:outline-none focus:border-turquoise" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full inline-flex justify-center items-center gap-2 px-5 py-3 rounded-full bg-ocean text-white hover:bg-gold hover:text-ocean transition shimmer-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { size: 18 }),
          " Envoyer via WhatsApp"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Page as component
};
