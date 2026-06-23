import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { Heart, Star, Shield } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { ASSETS } from "@/lib/assets";

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
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${ASSETS.poolImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">A Propos</p>
          <h1 className="font-display text-5xl md:text-6xl">TOGOLIVING</h1>
          <p className="font-accent text-turquoise text-xl mt-2">Votre Residence Balneaire au Togo</p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand pt-20 pb-10">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-lg text-ocean leading-relaxed">
            Offrant une vue sur la ville, l'établissement <strong>Résidence Togoliving</strong> se trouve à Toudji, très bien situé au bord du goudron National N2 et à seulement 100 m de la plage naturelle. 
            Kpogan est un quartier calme, situé sur la route nationale menant du Bénin au Ghana, près du marché d'Agbavi.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-lg text-ocean leading-relaxed">
            Il propose un <strong>restaurant</strong>, un <strong>service d'étage</strong>, un <strong>bar</strong>, un <strong>jardin</strong> et une <strong>terrasse</strong>. 
            Il propose gratuitement une connexion Wi-Fi rapide (516 Mb/s) et un parking privé. L'établissement sert un petit-déjeuner continental ou américain tous les matins.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-lg text-ocean leading-relaxed">
            Chaque hébergement comprend une salle de bains privative avec une douche, la climatisation, une télévision à écran plat et un réfrigérateur. 
            L'établissement se situe à 17 km de l'Aéroport international de Lomé-Tokoin et propose un service de navette aéroport (en supplément).
          </motion.p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[
            { n: 20, s: " min", l: "du centre-ville" },
            { n: 100, s: " m", l: "de la plage" },
            { n: 4,  s: "",     l: "types d'hebergement" },
            { n: 25, s: " min", l: "de l'aeroport" },
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
            <p className="font-accent text-turquoise text-xl">Les essentiels</p>
            <h2 className="font-display text-4xl text-ocean">Points Forts de l'Établissement</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-ocean">
            {[
              "Piscine extérieure avec vue",
              "Restaurant (Cuisine variée)",
              "Connexion Wi-Fi gratuite (516 Mb/s)",
              "Parking privé gratuit sur place",
              "Chambres familiales et non-fumeurs",
              "Navette aéroport",
              "Service d'étage & Bar",
              "Petit-déjeuner inclus"
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
            <h2 className="font-display text-4xl text-ocean">Équipements et Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
              <h3 className="font-display text-2xl text-ocean mb-4 border-b border-ocean/10 pb-2">Général</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Climatisation dans tous les hébergements</li>
                <li>• Établissement entièrement non-fumeurs</li>
                <li>• Sécurité 24h/24 & Caméras de surveillance</li>
                <li>• Extincteurs & Détecteurs de fumée</li>
                <li>• Service de ménage quotidien (en supplément)</li>
                <li>• Bureau d'excursions & Enregistrement rapide</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
              <h3 className="font-display text-2xl text-ocean mb-4 border-b border-ocean/10 pb-2">Extérieur & Activités</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Plage naturelle à 100m</li>
                <li>• Jardin, Terrasse bien exposée & Patio</li>
                <li>• Installations pour barbecue (en supplément)</li>
                <li>• Piscine avec vue et bar dans la piscine</li>
                <li>• Chaises longues et parasols</li>
                <li>• Balades à pied (en supplément)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
              <h3 className="font-display text-2xl text-ocean mb-4 border-b border-ocean/10 pb-2">Restauration & Boissons</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Restaurant Living’s (africaine, française, etc.)</li>
                <li>• Café sur place & Snack-bar</li>
                <li>• Menus enfants (en supplément)</li>
                <li>• Vin/champagne (en supplément)</li>
                <li>• Petit-déjeuner en chambre</li>
                <li>• Supérette sur place</li>
              </ul>
            </div>
          </div>
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
              { icon: Heart,  t: "Accueil Chaleureux", d: "Une equipe disponible 24h/24 pour votre confort et un service personnalisé." },
              { icon: Star,   t: "Cadre Unique",       d: "Vue mer, piscine et plage naturelle en un seul lieu." },
              { icon: Shield, t: "Confort & Securite", d: "Appartements meubles, parking prive sécurisé 24h/24, WiFi ultra-rapide." },
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

