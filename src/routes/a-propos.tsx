import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Heart, Star, Shield, Award } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { ASSETS } from "@/lib/assets";
import { OptimizedImage } from "@/components/OptimizedImage";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À Propos — TOGOLIVING Résidence Balnéaire | Lomé, Togo" },
      { name: "description", content: "TOGOLIVING — votre résidence balnéaire entre Lomé et Aného. Plage naturelle, piscine vue mer, cuisine internationale." },
      { property: "og:url", content: "https://residencetogoliving.com/a-propos" },
    ],
    links: [{ rel: "canonical", href: "https://residencetogoliving.com/a-propos" }],
  }),
  component: Page,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [v, setV] = useState(to); // SSR: show final value
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setV(0);
  }, []);

  useEffect(() => {
    if (!hydrated || !inView) return;
    return animate(mv, to, { duration: 1.8, onUpdate: (n) => setV(Math.round(n)) }).stop;
  }, [hydrated, inView, to, mv]);
  return <div ref={ref} className="font-display text-5xl text-turquoise">{v}{suffix}</div>;
}

function Page() {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <OptimizedImage src={ASSETS.poolImg} alt="À Propos Hero" width="1920" height="600" className="w-full h-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">{t("about.hero.subtitle")}</p>
          <h1 className="font-display text-5xl md:text-6xl">{t("about.hero.title")}</h1>
          <p className="font-accent text-turquoise text-xl mt-2">{t("about.hero.desc")}</p>
          <div className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded-full bg-gold/20 border border-gold/40">
            <Award size={20} className="text-gold" />
            <span className="text-gold font-semibold text-sm">{t("about.hero.badge")}</span>
            <span className="flex gap-0.5">{[0,1,2,3].map(i => <Star key={i} size={14} className="text-gold fill-current" />)}</span>
          </div>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-lg text-ocean leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.intro.p1") }} />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-ocean leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.intro.p2") }} />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-lg text-ocean leading-relaxed" dangerouslySetInnerHTML={{ __html: t("about.intro.p3") }} />
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            className="text-sm text-ocean/70" dangerouslySetInnerHTML={{ __html: t("about.intro.p4") }} />
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { n: 20, s: " min", l: t("about.stats.city") },
            { n: 100, s: " m", l: t("about.stats.beach") },
            { n: 4,  s: "",     l: t("about.stats.types") },
            { n: 25, s: " min", l: t("about.stats.airport") },
          ].map((s) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass p-6 text-center border border-ocean/5">
              <Counter to={s.n} suffix={s.s} />
              <div className="text-sm text-ocean/80 font-medium mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-sand pb-20">
        <div className="max-w-6xl mx-auto px-6 mt-16">
          <div className="text-center mb-12">
            <p className="font-accent text-turquoise text-xl">{t("about.essentials.subtitle")}</p>
            <h2 className="font-display text-4xl text-ocean">{t("about.essentials.title")}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-ocean">
            {[
              t("about.essentials.p1"),
              t("about.essentials.p2"),
              t("about.essentials.p3"),
              t("about.essentials.p4"),
              t("about.essentials.p5"),
              t("about.essentials.p6"),
              t("about.essentials.p7"),
              t("about.essentials.p8")
            ].map((point, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-ocean/5 flex items-center text-center justify-center font-medium">
                {point}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 mt-20">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl text-ocean">{t("about.facilities.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
              <h3 className="font-display text-2xl text-ocean mb-4 border-b border-ocean/10 pb-2">{t("about.facilities.general")}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t("about.facilities.g1")}</li>
                <li>{t("about.facilities.g2")}</li>
                <li>{t("about.facilities.g3")}</li>
                <li>{t("about.facilities.g4")}</li>
                <li>{t("about.facilities.g5")}</li>
                <li>{t("about.facilities.g6")}</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
              <h3 className="font-display text-2xl text-ocean mb-4 border-b border-ocean/10 pb-2">{t("about.facilities.outdoor")}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t("about.facilities.o1")}</li>
                <li>{t("about.facilities.o2")}</li>
                <li>{t("about.facilities.o3")}</li>
                <li>{t("about.facilities.o4")}</li>
                <li>{t("about.facilities.o5")}</li>
                <li>{t("about.facilities.o6")}</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
              <h3 className="font-display text-2xl text-ocean mb-4 border-b border-ocean/10 pb-2">{t("about.facilities.food")}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t("about.facilities.f1")}</li>
                <li>{t("about.facilities.f2")}</li>
                <li>{t("about.facilities.f3")}</li>
                <li>{t("about.facilities.f4")}</li>
                <li>{t("about.facilities.f5")}</li>
                <li>{t("about.facilities.f6")}</li>
              </ul>
            </div>
          </div>
        </div>
        {/* License / Classification */}
        <div className="max-w-6xl mx-auto px-6 mt-20">
          <div className="text-center mb-8">
            <h2 className="font-display text-4xl text-ocean">{t("about.license.title")}</h2>
            <p className="text-muted-foreground mt-2">{t("about.license.desc")}</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-md mx-auto">
            <img
              src="/images/togoliving_classement.jpeg"
              alt="Licence de classement — Résidence Togoliving — Hôtel 4 Étoiles"
              className="w-full rounded-2xl shadow-lg border border-ocean/10"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      <section className="bg-ocean text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-accent text-turquoise text-xl">{t("about.values.subtitle")}</p>
            <h2 className="font-display text-4xl">{t("about.values.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart,  t: t("about.values.v1_title"), d: t("about.values.v1_desc") },
              { icon: Star,   t: t("about.values.v2_title"),       d: t("about.values.v2_desc") },
              { icon: Shield, t: t("about.values.v3_title"), d: t("about.values.v3_desc") },
            ].map((v, i) => (
              <motion.div key={v.t} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-dark p-8 text-center hover-lift">
                <v.icon className="mx-auto text-turquoise mb-3" size={32} />
                <div className="font-display text-2xl">{v.t}</div>
                <p className="text-white/70 mt-2 text-sm">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

