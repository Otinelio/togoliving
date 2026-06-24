import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";

import { useTranslation } from "react-i18next";

export function Navbar() {
  const { t } = useTranslation();
  
  const navItems = [
    { to: "/", label: t('nav.home') },
    {
      label: t('nav.accommodations'),
      subLinks: [
        { to: "/hebergements", label: "Vue d'ensemble" },
        { to: "/hebergements/studios", label: "Studios" },
        { to: "/hebergements/chambre-salon", label: "Chambre Salon" },
        { to: "/hebergements/2-chambres-salon", label: "2 Chambres Salon" },
        { to: "/hebergements/3-chambres-salon", label: "3 Chambres Salon" },
      ]
    },
    { to: "/restaurant", label: t('nav.restaurant') },
    { to: "/a-propos", label: t('nav.about') },
    {
      label: t('nav.discover'),
      subLinks: [
        { to: "/galerie", label: t('nav.gallery') },
        { to: "/loisirs", label: t('nav.leisure') },
        { to: "/evenements", label: t('nav.events') },
        { to: "/carrieres", label: t('nav.careers') },
      ]
    },
    { to: "/contact", label: t('nav.contact') },
  ];

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
          className="[&>span:first-child]:text-white"
          size="h-12 md:h-14"
        />

        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item, idx) => {
            if (item.subLinks) {
              return <DropdownMenu key={idx} item={item} scrolled={scrolled} />;
            }
            
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to!}
                className={`text-sm tracking-wide transition-colors relative ${
                  scrolled ? "text-white/90 hover:text-turquoise" : "text-white hover:text-turquoise"
                } ${active ? "text-turquoise" : ""}`}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-turquoise rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelector scrolled={scrolled} />
          <Link
            to="/reserver"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-turquoise text-ocean font-medium text-sm shimmer-gold hover:bg-gold transition-colors"
          >
            {t('nav.book')}
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
              {navItems.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  {item.subLinks ? (
                    <>
                      <div className="text-turquoise/80 text-sm font-semibold uppercase tracking-wider mt-2">{item.label}</div>
                      <div className="flex flex-col gap-3 pl-3 border-l border-turquoise/20">
                        {item.subLinks.map(sub => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            className="text-white/80 hover:text-turquoise text-lg font-display"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.to!}
                      className="text-white/90 hover:text-turquoise text-lg font-display"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                to="/reserver"
                className="mt-3 inline-flex items-center justify-center px-5 py-3 rounded-full bg-turquoise text-ocean font-medium"
              >
                {t('nav.book')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DropdownMenu({ item, scrolled }: { item: any; scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-sm tracking-wide transition-colors ${
          scrolled ? "text-white/90 hover:text-turquoise" : "text-white hover:text-turquoise"
        } ${open ? "text-turquoise" : ""}`}
      >
        {item.label} <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-4 w-56 p-2 rounded-xl bg-ocean/95 backdrop-blur-xl border border-turquoise/20 shadow-xl shadow-ocean/50 origin-top-right flex flex-col"
          >
            <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 bg-ocean border-l border-t border-turquoise/20"></div>
            {item.subLinks.map((sub: any) => (
              <Link
                key={sub.to}
                to={sub.to}
                className="relative z-10 px-4 py-2.5 rounded-lg text-sm text-white/90 hover:text-ocean hover:bg-turquoise font-medium transition-colors"
                onClick={() => setOpen(false)}
              >
                {sub.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

