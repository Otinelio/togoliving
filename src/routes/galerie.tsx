import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import galleryHero from "@/Assets/images/piscine/piscine1.jpg";

import piscine1 from "@/Assets/images/piscine/IMG_4283.jpg";
import piscine2 from "@/Assets/images/piscine/accueil1_img.jpg";
import piscine3 from "@/Assets/images/piscine/accueil_img.jpg";
import piscine4 from "@/Assets/images/piscine/piscine.jpg";
import piscine5 from "@/Assets/images/piscine/piscine1.jpg";

import plage1 from "@/Assets/images/plage/IMG_4188.jpg";

import app1 from "@/Assets/images/appartements/19DA4565-B3A8-44DD-80DC-6A34D4CCABEB.jpg";
import app2 from "@/Assets/images/appartements/DFC0BEA9-C7FE-4500-91CF-48D6F9F02EB1.jpg";
import app3 from "@/Assets/images/appartements/IMG_4201.jpg";
import app4 from "@/Assets/images/appartements/IMG_4211.jpg";
import app5 from "@/Assets/images/appartements/IMG_4212.jpg";
import app6 from "@/Assets/images/appartements/IMG_4234.jpg";
import app7 from "@/Assets/images/appartements/IMG_4240.jpg";
import app8 from "@/Assets/images/appartements/IMG_4247.jpg";

import int1 from "@/Assets/images/interieur/3B98AFD0-A1A8-4B2D-9525-A39069FB7103.jpg";
import int2 from "@/Assets/images/interieur/BCC6E7A7-A8B1-40AD-9DD0-A73A219B7FC0.jpg";
import int3 from "@/Assets/images/interieur/BE2C3740-7127-4D44-8CED-854D6F7BA84F.JPG.jpg";
import int4 from "@/Assets/images/interieur/IMG_4230.jpg";
import int5 from "@/Assets/images/interieur/IMG_4683.jpg";

import bar1 from "@/Assets/images/bar/60DBC121-7976-41CA-870B-EEAA1AD17DC4.jpg";
import bar2 from "@/Assets/images/bar/69A51B0D-E2CC-40B9-8BC3-5F2CF11CAA54.JPG.jpg";
import bar3 from "@/Assets/images/bar/C21DF370-673F-4DC8-8681-D83FE80DDC88.jpg";
import bar4 from "@/Assets/images/bar/IMG_2449.jpg";
import bar5 from "@/Assets/images/bar/IMG_4009.jpg";
import bar6 from "@/Assets/images/bar/IMG_4606.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie Photo | TOGOLIVING Kpogan Agbetsiko" },
      { name: "description", content: "Decouvrez en images TOGOLIVING : piscine, plage, appartements, restaurant et bar a Lome." },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: Page,
});

type Cat = "Tout" | "Piscine" | "Plage" | "Appartements" | "Intérieur" | "Bar";

const photos: { cat: Exclude<Cat, "Tout">; src: string; alt: string }[] = [
  { cat: "Piscine", src: piscine1, alt: "Piscine" },
  { cat: "Piscine", src: piscine2, alt: "Piscine" },
  { cat: "Piscine", src: piscine3, alt: "Piscine" },
  { cat: "Piscine", src: piscine4, alt: "Piscine" },
  { cat: "Piscine", src: piscine5, alt: "Piscine" },
  
  { cat: "Plage", src: plage1, alt: "Plage" },

  { cat: "Appartements", src: app1, alt: "Appartement meublé" },
  { cat: "Appartements", src: app2, alt: "Appartement vue mer" },
  { cat: "Appartements", src: app3, alt: "Studio" },
  { cat: "Appartements", src: app4, alt: "Chambre standard" },
  { cat: "Appartements", src: app5, alt: "Chambre supérieur" },
  { cat: "Appartements", src: app6, alt: "Chambre" },
  { cat: "Appartements", src: app7, alt: "Détail chambre" },
  { cat: "Appartements", src: app8, alt: "Salle de bain" },

  { cat: "Intérieur", src: int1, alt: "Intérieur design" },
  { cat: "Intérieur", src: int2, alt: "Décoration" },
  { cat: "Intérieur", src: int3, alt: "Salon" },
  { cat: "Intérieur", src: int4, alt: "Meubles" },
  { cat: "Intérieur", src: int5, alt: "Ambiance intérieure" },

  { cat: "Bar", src: bar1, alt: "Bar terrasse" },
  { cat: "Bar", src: bar2, alt: "Cocktails" },
  { cat: "Bar", src: bar3, alt: "Espace détente" },
  { cat: "Bar", src: bar4, alt: "Boissons" },
  { cat: "Bar", src: bar5, alt: "Soirée bar" },
  { cat: "Bar", src: bar6, alt: "Ambiance bar" },
];

const CATS: Cat[] = ["Tout", "Piscine", "Plage", "Appartements", "Intérieur", "Bar"];

function Page() {
  const [cat, setCat] = useState<Cat>("Tout");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "Tout" ? photos : photos.filter((p) => p.cat === cat);

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
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${galleryHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 to-ocean" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Notre Cadre</p>
          <h1 className="font-display text-5xl md:text-6xl">Kpogan Agbetsiko</h1>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition ${
                  cat === c ? "bg-ocean text-white" : "bg-white text-ocean border border-turquoise/30 hover:border-turquoise"
                }`}>
                <ImageIcon size={14} /> {c}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((p, i) => (
              <motion.button
                key={p.src}
                layout
                onClick={() => setOpen(i)}
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-turquoise"
              >
                <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ocean/0 group-hover:bg-ocean/40 transition flex items-center justify-center">
                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ocean/95 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); setOpen(null); }} className="absolute top-5 right-5 text-white p-2"><X size={28} /></button>
            <button onClick={(e) => { e.stopPropagation(); setOpen((i) => (i === null ? null : (i - 1 + list.length) % list.length)); }}
              className="absolute left-3 md:left-8 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"><ChevronLeft size={28} /></button>
            <motion.img
              key={list[open].src} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              src={list[open].src} alt={list[open].alt}
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
