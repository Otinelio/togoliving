import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon, Loader2 } from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { useGallery } from "@/hooks/useGallery";
import { useSettings } from "@/hooks/useSettings";
import { OptimizedImage } from "@/components/OptimizedImage";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie Photo | TOGOLIVING Kpogan Agbetsiko" },
      { name: "description", content: "Découvrez en images TOGOLIVING : piscine, plage, appartements, restaurant et bar à Lomé." },
      { property: "og:url", content: "https://residencetogoliving.com/galerie" },
    ],
    links: [{ rel: "canonical", href: "https://residencetogoliving.com/galerie" }],
  }),
  component: Page,
});

const CATS = ["Tout", "Piscine", "Plage", "Appartements", "Intérieur", "Bar"];

function Page() {
  const { t } = useTranslation();
  const { items: photos, isLoading } = useGallery();
  const { settings } = useSettings();
  const [cat, setCat] = useState("Tout");
  const [open, setOpen] = useState<number | null>(null);
  
  const list = cat === "Tout" ? photos : photos.filter((p) => p.category === cat);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % list.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + list.length) % list.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, list.length]);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        {settings.galleryHeroUrl && (
          <div className="absolute inset-0 opacity-35">
            <OptimizedImage src={settings.galleryHeroUrl} alt="Galerie Hero" width="1920" height="600" className="w-full h-full object-cover object-center" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 to-ocean" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">{t("galerie.hero.subtitle")}</p>
          <h1 className="font-display text-5xl md:text-6xl">{t("galerie.hero.title")}</h1>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-16 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATS.map((c) => (
              <button key={t(`galerie.categories.${c}`)} onClick={() => setCat(c)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                  cat === c ? "bg-ocean text-white" : "bg-white text-ocean border border-turquoise/30 hover:border-turquoise"
                }`}>
                <ImageIcon size={14} /> {c}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-ocean"><Loader2 size={32} className="animate-spin" /></div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((p, i) => (
                <motion.button
                  key={p.id}
                  layout
                  onClick={() => setOpen(i)}
                  whileHover={{ scale: 1.02 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-turquoise"
                >
                  <OptimizedImage src={p.imageUrl} alt={p.altText} width="600" height="450" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/40 transition flex items-center justify-center">
                    <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
          
          {!isLoading && list.length === 0 && (
            <div className="text-center py-20 text-ocean/50">
              <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
              <p>{t("galerie.empty")}</p>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {open !== null && list[open] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ocean/95 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute top-5 right-5 text-white p-2"><X size={28} /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i - 1 + list.length) % list.length)); }}
              className="absolute left-3 md:left-8 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeft size={28} /></button>
            <motion.img
              key={list[open].id} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={list[open].imageUrl} alt={list[open].altText}
              className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i + 1) % list.length)); }}
              className="absolute right-3 md:right-8 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"><ChevronRight size={28} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
