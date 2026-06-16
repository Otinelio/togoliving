import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import { X, M as Menu, P as Phone, a as Mail, G as Globe, b as MapPin } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-6gZHZU4u.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const logoImg = "/assets/Residence_Togoliving_logo-B9EFFXS4.png";
function Logo({ className = "", size = "h-12" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/",
      className: `inline-flex items-center ${className}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: logoImg,
          alt: "TOGOLIVING Logo",
          className: `${size} w-auto`
        }
      )
    }
  );
}
const links = [
  { to: "/", label: "Accueil" },
  { to: "/hebergements", label: "Hebergements" },
  { to: "/restaurant", label: "Restaurant & Bar" },
  { to: "/galerie", label: "Galerie" },
  { to: "/a-propos", label: "A Propos" },
  { to: "/contact", label: "Contact" }
];
function Navbar() {
  const [scrolled, setScrolled] = reactExports.useState(false);
  const [open, setOpen] = reactExports.useState(false);
  const { location } = useRouterState();
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  reactExports.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-ocean/95 backdrop-blur-md shadow-lg shadow-ocean/10" : "bg-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Logo,
            {
              className: "[&>span:first-child]:text-white",
              size: "h-12 md:h-14"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-7", children: links.map((l) => {
            const active = location.pathname === l.to;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: l.to,
                className: `text-sm tracking-wide transition-colors relative ${scrolled ? "text-white/90 hover:text-turquoise" : "text-white hover:text-turquoise"} ${active ? "text-turquoise" : ""}`,
                children: [
                  l.label,
                  active && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-0.5 bg-turquoise rounded-full" })
                ]
              },
              l.to
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/reserver",
                className: "hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-turquoise text-ocean font-medium text-sm shimmer-gold hover:bg-gold transition-colors",
                children: "Reserver Maintenant"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setOpen((s) => !s),
                "aria-label": "Menu",
                className: `lg:hidden p-2 rounded-md ${scrolled ? "text-white" : "text-white"}`,
                children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 24 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -10 },
            transition: { duration: 0.25 },
            className: "lg:hidden bg-ocean/98 backdrop-blur-md border-t border-turquoise/20",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-6 flex flex-col gap-4", children: [
              links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: l.to,
                  className: "text-white/90 hover:text-turquoise text-lg font-display",
                  children: l.label
                },
                l.to
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/reserver",
                  className: "mt-3 inline-flex items-center justify-center px-5 py-3 rounded-full bg-turquoise text-ocean font-medium",
                  children: "Reserver Maintenant"
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
function WaveDivider({
  color = "#F8F5F0",
  flip = false,
  bgClass = "bg-transparent",
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `relative w-full overflow-hidden ${bgClass} ${className}`,
      style: { transform: flip ? "rotate(180deg)" : void 0, lineHeight: 0 },
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "block w-[200%] h-[80px] wave-slow",
            viewBox: "0 0 2880 100",
            preserveAspectRatio: "none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M0,40 C480,90 960,0 1440,40 C1920,80 2400,20 2880,50 L2880,100 L0,100 Z",
                fill: color,
                opacity: "0.4"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "block w-[200%] h-[80px] wave-mid -mt-[70px]",
            viewBox: "0 0 2880 100",
            preserveAspectRatio: "none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M0,55 C480,15 960,80 1440,45 C1920,10 2400,75 2880,40 L2880,100 L0,100 Z",
                fill: color,
                opacity: "0.6"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "svg",
          {
            className: "block w-[200%] h-[80px] wave-fast -mt-[70px]",
            viewBox: "0 0 2880 100",
            preserveAspectRatio: "none",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "path",
              {
                d: "M0,70 C480,50 960,90 1440,65 C1920,40 2400,85 2880,60 L2880,100 L0,100 Z",
                fill: color
              }
            )
          }
        )
      ]
    }
  );
}
const Instagram = (p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
] });
const Facebook = (p) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", ...p, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }) });
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative bg-ocean text-white mt-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 inset-x-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WaveDivider, { color: "#1E3A5F", flip: true }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-5 md:px-8 pt-20 pb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white", children: "TOGO" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-turquoise", children: "LIVING" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-accent text-turquoise mt-3 text-lg", children: "L'Ocean a votre Porte" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70 text-sm mt-4 max-w-xs", children: "Villa balneaire tropicale a Kpogan Agbetsiko, entre Lome et Aneho. Acces direct a la plage, piscine vue mer et restaurant aux saveurs du monde." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg mb-4 text-turquoise", children: "Navigation" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-sm", children: [
            ["/", "Accueil"],
            ["/hebergements", "Hebergements"],
            ["/restaurant", "Restaurant & Bar"],
            ["/galerie", "Galerie"],
            ["/a-propos", "A Propos"],
            ["/contact", "Contact"],
            ["/reserver", "Reserver"]
          ].map(([to, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, className: "text-white/80 hover:text-turquoise transition", children: label }) }, to)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg mb-4 text-turquoise", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-white/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 16, className: "mt-0.5 text-turquoise shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+22893872088", className: "hover:text-turquoise", children: "+228 93 87 20 88" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16, className: "mt-0.5 text-turquoise shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contact@togoliving.net", className: "hover:text-turquoise", children: "contact@togoliving.net" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 16, className: "mt-0.5 text-turquoise shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "togoliving.net" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 16, className: "mt-0.5 text-turquoise shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kpogan Agbetsiko, Route N2, Lome, Togo" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://instagram.com/togoliving", target: "_blank", rel: "noreferrer", className: "p-2 rounded-full bg-white/10 hover:bg-turquoise hover:text-ocean transition", "aria-label": "Instagram", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { width: 18, height: 18 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://facebook.com/togoliving", target: "_blank", rel: "noreferrer", className: "p-2 rounded-full bg-white/10 hover:bg-turquoise hover:text-ocean transition", "aria-label": "Facebook", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Facebook, { width: 18, height: 18 }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-gold/40 my-8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-white/60 text-xs", children: "© 2025 TOGOLIVING — Tous droits reserves" })
    ] })
  ] });
}
function PageTransition({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.4, ease: "easeOut" },
      children
    }
  );
}
function AppLoadingScreen() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 },
      className: "fixed inset-0 z-[100] flex items-center justify-center bg-ocean",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logoImg,
            alt: "TOGOLIVING Loading",
            className: "h-40 w-auto mx-auto"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-6 h-1.5 w-44 overflow-hidden rounded-full bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full w-1/2 rounded-full bg-turquoise",
            initial: { x: "-120%" },
            animate: { x: "240%" },
            transition: { duration: 1.1, ease: "easeInOut", repeat: Infinity }
          }
        ) })
      ] })
    }
  );
}
const NO_CHROME_PREFIXES = ["/room", "/reception", "/admin", "/kitchen"];
function isStandalone(pathname) {
  return NO_CHROME_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-sand px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl font-bold text-ocean", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-display text-ocean", children: "Page introuvable" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Cette page n'existe pas ou a ete deplacee." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-full bg-turquoise text-ocean px-5 py-2.5 text-sm font-medium hover:bg-gold transition",
        children: "Retour a l'accueil"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-sand px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl text-ocean", children: "Erreur de chargement" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Une erreur est survenue. Vous pouvez reessayer ou revenir a l'accueil." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-full bg-ocean text-white px-5 py-2.5 text-sm font-medium hover:opacity-90",
          children: "Reessayer"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-full border border-ocean/30 bg-white px-5 py-2.5 text-sm font-medium text-ocean hover:bg-sand",
          children: "Accueil"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1E3A5F" },
      { title: "TOGOLIVING — Villa Balneaire Tropicale a Lome, Togo" },
      { name: "description", content: "Residence balneaire de luxe a Kpogan Agbetsiko, Lome. Appartements vue mer, piscine panoramique, restaurant et cocktail bar." },
      { property: "og:site_name", content: "TOGOLIVING" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&display=swap",
        crossOrigin: "anonymous"
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  const { location } = useRouterState();
  const standalone = isStandalone(location.pathname);
  const [showLoader, setShowLoader] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let timer = null;
    const hideLoader = () => {
      timer = window.setTimeout(() => setShowLoader(false), 900);
    };
    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
    }
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      window.removeEventListener("load", hideLoader);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    showLoader && /* @__PURE__ */ jsxRuntimeExports.jsx(AppLoadingScreen, {}),
    !standalone && /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: standalone ? "" : "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PageTransition, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }, location.pathname) }) }),
    !standalone && /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const $$splitComponentImporter$a = () => import("./restaurant-CVHMtQK8.mjs");
const Route$a = createFileRoute("/restaurant")({
  head: () => ({
    meta: [{
      title: "Restaurant & Cocktail Bar Vue Océan | TOGOLIVING"
    }, {
      name: "description",
      content: "Saveurs du monde : petit-déjeuner, plats africains & internationaux, pizzas, cocktails, vins et boissons. Restaurant vue mer à Lomé."
    }, {
      property: "og:title",
      content: "Restaurant TOGOLIVING — Saveurs du Monde"
    }, {
      property: "og:url",
      content: "/restaurant"
    }],
    links: [{
      rel: "canonical",
      href: "/restaurant"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./reserver-NVZOLeGl.mjs");
const Route$9 = createFileRoute("/reserver")({
  head: () => ({
    meta: [{
      title: "Reserver votre Sejour | TOGOLIVING Lome, Togo"
    }, {
      name: "description",
      content: "Reservez votre studio ou appartement vue mer a TOGOLIVING. Confirmation rapide via WhatsApp."
    }, {
      property: "og:url",
      content: "/reserver"
    }],
    links: [{
      rel: "canonical",
      href: "/reserver"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./reception--vtWJaCO.mjs");
const Route$8 = createFileRoute("/reception")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./kitchen-C_msWLdE.mjs");
const Route$7 = createFileRoute("/kitchen")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./hebergements-CklxOEf_.mjs");
const Route$6 = createFileRoute("/hebergements")({
  head: () => ({
    meta: [{
      title: "Appartements Vue Mer a Lome | TOGOLIVING Residence"
    }, {
      name: "description",
      content: "Studio, Chambre Salon Standard 40m2 et Superieur 50m2 vue mer a Kpogan Agbetsiko, Lome."
    }, {
      property: "og:title",
      content: "Hebergements TOGOLIVING"
    }, {
      property: "og:url",
      content: "/hebergements"
    }],
    links: [{
      rel: "canonical",
      href: "/hebergements"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./galerie-CXkR-1wJ.mjs");
const Route$5 = createFileRoute("/galerie")({
  head: () => ({
    meta: [{
      title: "Galerie Photo | TOGOLIVING Kpogan Agbetsiko"
    }, {
      name: "description",
      content: "Decouvrez en images TOGOLIVING : piscine, plage, appartements, restaurant et bar a Lome."
    }, {
      property: "og:url",
      content: "/galerie"
    }],
    links: [{
      rel: "canonical",
      href: "/galerie"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-DSzU-b0T.mjs");
const Route$4 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact & Localisation | TOGOLIVING Lome, Togo"
    }, {
      name: "description",
      content: "Contactez TOGOLIVING : +228 93 87 20 88, contact@togoliving.net. Kpogan Agbetsiko, Route N2."
    }, {
      property: "og:url",
      content: "/contact"
    }],
    links: [{
      rel: "canonical",
      href: "/contact"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin-Bk8Xs31a.mjs");
const Route$3 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./a-propos-DsVH00YX.mjs");
const Route$2 = createFileRoute("/a-propos")({
  head: () => ({
    meta: [{
      title: "A Propos — TOGOLIVING Residence Balneaire | Lome, Togo"
    }, {
      name: "description",
      content: "TOGOLIVING — votre residence balneaire entre Lome et Aneho. Plage naturelle, piscine vue mer, cuisine internationale."
    }, {
      property: "og:url",
      content: "/a-propos"
    }],
    links: [{
      rel: "canonical",
      href: "/a-propos"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BVQ7nhdc.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "TOGOLIVING — Villa Balneaire Tropicale | Kpogan Agbetsiko, Lome, Togo"
    }, {
      name: "description",
      content: "Residence balneaire de luxe a 100m de la plage naturelle. Studio, appartements vue mer, piscine panoramique, restaurant aux saveurs du monde."
    }, {
      property: "og:title",
      content: "TOGOLIVING — L'Ocean a votre Porte"
    }, {
      property: "og:description",
      content: "Villa balneaire tropicale a Kpogan Agbetsiko, Lome."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./room._roomId-_M1xO4rX.mjs");
const Route = createFileRoute("/room/$roomId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RestaurantRoute = Route$a.update({
  id: "/restaurant",
  path: "/restaurant",
  getParentRoute: () => Route$b
});
const ReserverRoute = Route$9.update({
  id: "/reserver",
  path: "/reserver",
  getParentRoute: () => Route$b
});
const ReceptionRoute = Route$8.update({
  id: "/reception",
  path: "/reception",
  getParentRoute: () => Route$b
});
const KitchenRoute = Route$7.update({
  id: "/kitchen",
  path: "/kitchen",
  getParentRoute: () => Route$b
});
const HebergementsRoute = Route$6.update({
  id: "/hebergements",
  path: "/hebergements",
  getParentRoute: () => Route$b
});
const GalerieRoute = Route$5.update({
  id: "/galerie",
  path: "/galerie",
  getParentRoute: () => Route$b
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$b
});
const AdminRoute = Route$3.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$b
});
const AProposRoute = Route$2.update({
  id: "/a-propos",
  path: "/a-propos",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const RoomRoomIdRoute = Route.update({
  id: "/room/$roomId",
  path: "/room/$roomId",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AProposRoute,
  AdminRoute,
  ContactRoute,
  GalerieRoute,
  HebergementsRoute,
  KitchenRoute,
  ReceptionRoute,
  ReserverRoute,
  RestaurantRoute,
  RoomRoomIdRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Logo as L,
  Route as R,
  WaveDivider as W,
  router as r
};
