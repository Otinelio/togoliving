import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Waves, Droplets, Gamepad2, Coffee, Tent, Music, Sun, ShieldCheck, Camera } from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { ASSETS } from "@/lib/assets";
import { OptimizedImage } from "@/components/OptimizedImage";
import { useGallery } from "@/hooks/useGallery";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/loisirs")({
  head: () => ({
    meta: [
      { title: "Loisirs & Détente — TOGOLIVING Résidence Balnéaire | Lomé, Togo" },
      { name: "description", content: "Profitez de nos espaces de détente : piscine panoramique vue mer, accès direct à la plage, espace de jeux pour enfants, billard et jardin tropical." },
      { property: "og:url", content: "https://residencetogoliving.com/loisirs" },
    ],
    links: [{ rel: "canonical", href: "https://residencetogoliving.com/loisirs" }],
  }),
  component: LoisirsPage,
});

function LoisirsPage() {
  const { t } = useTranslation();
  const { items, isLoading } = useGallery();
  const loisirsGallery = items.filter(item => item.category === "Loisir et détente");

  // Fallback aux images par défaut si la galerie est vide dans Supabase
  const defaultImages = [
    ASSETS.piscineIMG4283,
    ASSETS.interieurIMG4230,
    ASSETS.interieurBCC6,
    ASSETS.poolImg,
    ASSETS.plageIMG4188,
    ASSETS.bar60DBC,
    ASSETS.barIMG2449,
    ASSETS.bar69A51
  ];

  const imagesToDisplay = loisirsGallery.length > 0 ? loisirsGallery.map(i => i.imageUrl) : defaultImages;

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage src={ASSETS.poolImg} alt="Loisirs Hero" width="1920" height="600" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/90 via-ocean/80 to-ocean" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">{t("loisirs.hero.subtitle")}</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">{t("loisirs.hero.title")}</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            {t("loisirs.hero.desc")}
          </p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-accent text-turquoise text-xl">{t("loisirs.pool.subtitle")}</p>
            <h2 className="font-display text-4xl text-ocean mb-6">{t("loisirs.pool.title")}</h2>
            <p className="text-ocean/80 text-lg leading-relaxed mb-6">
              {t("loisirs.pool.desc")}
            </p>
            <ul className="space-y-3">
              {[
                { icon: Droplets, text: t("loisirs.pool.b1") },
                { icon: Coffee, text: t("loisirs.pool.b2") },
                { icon: Sun, text: t("loisirs.pool.b3") },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-ocean">
                  <div className="w-10 h-10 rounded-full bg-turquoise/20 flex items-center justify-center text-turquoise shrink-0">
                    <item.icon size={18} />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
            <OptimizedImage src={ASSETS.piscineIMG4283} alt="Piscine de la Résidence Togoliving" width="800" height="500" className="rounded-2xl shadow-md w-full h-[500px] object-cover" />
            <div className="absolute -bottom-6 -left-6 hidden md:block w-32 h-32 rounded-full bg-gold/20 pool-ripple" />
          </motion.div>
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      <section className="bg-ocean text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-accent text-turquoise text-xl">{t("loisirs.activities.subtitle")}</p>
            <h2 className="font-display text-4xl">{t("loisirs.activities.title")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Gamepad2, 
                title: t("loisirs.activities.games_title"), 
                desc: t("loisirs.activities.games_desc"),
                img: ASSETS.interieurIMG4230 // Placeholder: Remplacez par l'image du billard/jeux
              },
              { 
                icon: ShieldCheck, 
                title: t("loisirs.activities.kids_title"), 
                desc: t("loisirs.activities.kids_desc"),
                img: ASSETS.interieurBCC6 // Placeholder: Remplacez par l'image de l'espace enfant
              },
              { 
                icon: Tent, 
                title: t("loisirs.activities.garden_title"), 
                desc: t("loisirs.activities.garden_desc"),
                img: ASSETS.poolImg // Placeholder: Remplacez par l'image du jardin
              },
            ].map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-dark rounded-2xl hover:border-turquoise/40 transition overflow-hidden flex flex-col">
                
                {/* Espace pour l'image */}
                <div className="h-48 w-full bg-ocean/50 relative">
                  <OptimizedImage src={feature.img} alt={feature.title} width="600" height="384" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ocean-dark/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 bg-ocean/80 backdrop-blur-sm p-2 rounded-xl">
                    <feature.icon className="text-turquoise" size={28} />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed flex-1">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider color="#F8F5F0" bgClass="bg-ocean" />

      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-2 md:order-1 relative">
            <OptimizedImage src={ASSETS.plageIMG4188} alt="Plage naturelle à proximité" width="800" height="400" className="rounded-2xl shadow-md w-full h-[400px] object-cover" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 md:order-2">
            <p className="font-accent text-turquoise text-xl">{t("loisirs.beach.subtitle")}</p>
            <h2 className="font-display text-4xl text-ocean mb-6">{t("loisirs.beach.title")}</h2>
            <p className="text-ocean/80 text-lg leading-relaxed mb-6">
              {t("loisirs.beach.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reserver" className="inline-flex justify-center items-center px-6 py-3 rounded-full bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition shimmer-gold">
                {t("loisirs.beach.book")}
              </Link>
              <Link to="/restaurant" className="inline-flex justify-center items-center px-6 py-3 rounded-full border border-ocean text-ocean font-medium hover:bg-ocean hover:text-white transition">
                {t("loisirs.beach.restaurant")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <WaveDivider color="#ffffff" bgClass="bg-sand" />

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl text-ocean">{t("loisirs.gallery.title")}</h2>
            <p className="text-ocean/70 mt-4 text-lg">{t("loisirs.gallery.desc")}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading && loisirsGallery.length === 0 ? (
              <div className="col-span-full py-10 flex justify-center text-ocean">
                <Loader2 size={32} className="animate-spin" />
              </div>
            ) : (
              imagesToDisplay.map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="aspect-square rounded-xl overflow-hidden relative group cursor-pointer shadow-sm border border-ocean/5">
                  <OptimizedImage src={src} alt={`Galerie Loisirs ${i + 1}`} width="400" height="400" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-ocean/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Camera size={24} />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
