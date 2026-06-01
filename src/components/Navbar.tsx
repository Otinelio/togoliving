import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/hebergements", label: "Hebergements" },
  { to: "/restaurant", label: "Restaurant & Bar" },
  { to: "/galerie", label: "Galerie" },
  { to: "/a-propos", label: "A Propos" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ocean/95 backdrop-blur-md shadow-lg shadow-ocean/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Logo
          className={scrolled ? "[&>span:first-child]:text-white" : ""}
          size="text-xl md:text-2xl"
        />

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm tracking-wide transition-colors relative ${
                  scrolled ? "text-white/90 hover:text-turquoise" : "text-white hover:text-turquoise"
                } ${active ? "text-turquoise" : ""}`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-turquoise rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/reserver"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-turquoise text-ocean font-medium text-sm shimmer-gold hover:bg-gold transition-colors"
          >
            Reserver Maintenant
          </Link>
          <button
            onClick={() => setOpen((s) => !s)}
            aria-label="Menu"
            className={`lg:hidden p-2 rounded-md ${scrolled ? "text-white" : "text-white"}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-ocean/98 backdrop-blur-md border-t border-turquoise/20"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-white/90 hover:text-turquoise text-lg font-display"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/reserver"
                className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded-full bg-turquoise text-ocean font-medium"
              >
                Reserver Maintenant
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
