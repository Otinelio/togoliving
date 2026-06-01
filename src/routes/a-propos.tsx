import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Heart, Star, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WaveDivider } from "@/components/WaveDivider";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "A Propos — TOGOLIVING Residence Balneaire | Lome, Togo" },
      { name: "description", content: "TOGOLIVING — votre residence balneaire entre Lome et Aneho. Plage naturelle, piscine vue mer, cuisine internationale." },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: Page,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    return animate(mv, to, { duration: 1.8, onUpdate: (n) => setV(Math.round(n)) }).stop;
  }, [inView, to, mv]);
  return <div ref={ref} className="font-display text-5xl text-turquoise">{v}{suffix}</div>;
}

function Page() {
  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">A Propos</p>
          <h1 className="font-display text-5xl md:text-6xl">TOGOLIVING</h1>
          <p className="font-accent text-turquoise text-xl mt-2">Votre Residence Balneaire au Togo</p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-lg text-ocean leading-relaxed">
            Situe sur la cote entre <strong>Lome</strong> et <strong>Aneho</strong>, a seulement
            <strong> 20 minutes du centre-ville</strong> et <strong>25 minutes de l'aeroport international</strong>,
            TOGOLIVING offre un acces privilegie a une plage naturelle, une piscine panoramique,
            un cocktail bar et un restaurant aux saveurs du monde.
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { n: 20, s: " min", l: "du centre-ville" },
            { n: 100, s: " m", l: "de la plage" },
            { n: 3,  s: "",     l: "types d'hebergement" },
            { n: 25, s: " min", l: "de l'aeroport" },
          ].map((s) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="glass p-6 text-center">
              <Counter to={s.n} suffix={s.s} />
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      <section className="bg-ocean text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-accent text-turquoise text-xl">Nos Valeurs</p>
            <h2 className="font-display text-4xl">Pourquoi nous choisir</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Heart,  t: "Accueil Chaleureux", d: "Une equipe disponible 24h/24 pour votre confort." },
              { icon: Star,   t: "Cadre Unique",       d: "Vue mer, piscine et plage naturelle en un seul lieu." },
              { icon: Shield, t: "Confort & Securite", d: "Appartements meubles, parking prive, WiFi inclus." },
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
