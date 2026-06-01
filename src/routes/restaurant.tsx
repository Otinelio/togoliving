import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Coffee, UtensilsCrossed, ChefHat, GlassWater, Sandwich, Soup } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import { MENU_CATEGORIES, type MenuCategory } from "@/data/defaultMenu";
import { WaveDivider } from "@/components/WaveDivider";
import { formatFCFA } from "@/lib/whatsapp";

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant & Cocktail Bar Vue Ocean | TOGOLIVING" },
      { name: "description", content: "Saveurs du monde : cuisine africaine, francaise, americaine, cocktails signature. Restaurant vue mer a Lome." },
      { property: "og:title", content: "Restaurant TOGOLIVING — Saveurs du Monde" },
      { property: "og:url", content: "/restaurant" },
    ],
    links: [{ rel: "canonical", href: "/restaurant" }],
  }),
  component: Page,
});

const ICONS: Record<MenuCategory, typeof Coffee> = {
  "Petit-Dejeuner": Coffee,
  "Plats Africains": ChefHat,
  "Plats Francais": UtensilsCrossed,
  "Plats Americains": Sandwich,
  "Cocktails & Boissons": GlassWater,
  "Snacks": Soup,
};

function Page() {
  const { items } = useMenu();
  const [tab, setTab] = useState<MenuCategory>("Petit-Dejeuner");
  const filtered = items.filter((i) => i.category === tab);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Au Restaurant</p>
          <h1 className="font-display text-5xl md:text-6xl">Saveurs du Monde</h1>
          <p className="font-accent text-turquoise text-xl mt-2">Vue sur l'Ocean</p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {MENU_CATEGORIES.map((c) => {
              const Icon = ICONS[c];
              const active = tab === c;
              return (
                <button key={c} onClick={() => setTab(c)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition ${
                    active ? "bg-ocean text-white shadow-lg" : "bg-white text-ocean border border-turquoise/30 hover:border-turquoise"
                  }`}>
                  <Icon size={16} /> {c}
                </button>
              );
            })}
          </div>

          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((it) => (
              <div key={it.id} className={`glass p-5 hover-lift border-2 ${it.soldOut ? "opacity-50" : "border-transparent hover:border-gold/60"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl text-ocean">{it.name}</h3>
                    {it.description && <p className="text-sm text-muted-foreground mt-1">{it.description}</p>}
                    {it.soldOut && <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">Indisponible</span>}
                  </div>
                  <div className="shrink-0 px-3 py-1.5 rounded-lg bg-gold/20 border border-gold/40 text-ocean font-semibold text-sm whitespace-nowrap">
                    {formatFCFA(it.price)}
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground py-10">Aucun article dans cette categorie.</p>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
