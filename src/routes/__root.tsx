import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";
import { AppLoadingScreen } from "../components/AppLoadingScreen";

const NO_CHROME_PREFIXES = ["/room", "/reception", "/admin", "/kitchen"];

function isStandalone(pathname: string) {
  return NO_CHROME_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-ocean">404</h1>
        <h2 className="mt-4 text-xl font-display text-ocean">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a ete deplacee.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-turquoise text-ocean px-5 py-2.5 text-sm font-medium hover:bg-gold transition"
          >
            Retour a l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-sand px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-ocean">Erreur de chargement</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur est survenue. Vous pouvez reessayer ou revenir a l'accueil.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-full bg-ocean text-white px-5 py-2.5 text-sm font-medium hover:opacity-90"
          >
            Reessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ocean/30 bg-white px-5 py-2.5 text-sm font-medium text-ocean hover:bg-sand"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#1E3A5F" },
      { title: "TOGOLIVING — Villa Balneaire Tropicale a Lome, Togo" },
      { name: "description", content: "Residence balneaire de luxe a Kpogan Agbetsiko, Lome. Appartements vue mer, piscine panoramique, restaurant et cocktail bar." },
      { property: "og:site_name", content: "TOGOLIVING" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@1,400;1,500;1,600&display=swap",
        crossOrigin: "anonymous",
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        children: `function googleTranslateElementInit() { new google.translate.TranslateElement({pageLanguage: 'fr', includedLanguages: 'fr,en,de', autoDisplay: false}, 'google_translate_element'); }`,
        type: "text/javascript",
      },
      {
        src: "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
        type: "text/javascript",
      }
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { location } = useRouterState();
  const standalone = isStandalone(location.pathname);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer: number | null = null;
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

  return (
    <QueryClientProvider client={queryClient}>
      {showLoader && <AppLoadingScreen />}
      {!standalone && <Navbar />}
      <main className={standalone ? "" : "min-h-screen"}>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      {!standalone && <Footer />}
    </QueryClientProvider>
  );
}
