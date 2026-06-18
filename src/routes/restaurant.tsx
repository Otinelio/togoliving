import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  Coffee, UtensilsCrossed, ChefHat, Pizza, IceCream,
  GlassWater, Wine, Droplets, Sunrise, Plus, Minus, ShoppingBag, Trash2, ArrowRight, X,
  ChevronLeft, ChevronRight, Search,
} from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import { MENU_CATEGORIES, type MenuCategory } from "@/data/defaultMenu";
import { WaveDivider } from "@/components/WaveDivider";
import { formatFCFA, whatsappUrl } from "@/lib/whatsapp";
import restaurantHero from "@/Assets/images/piscine/piscine.jpg";

type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
  description?: string;
};

type FulfillmentMethod = "Retrait au restaurant" | "Livraison";

export const Route = createFileRoute("/restaurant")({
  head: () => ({
    meta: [
      { title: "Restaurant & Cocktail Bar Vue Océan | TOGOLIVING" },
      { name: "description", content: "Saveurs du monde : petit-déjeuner, plats africains & internationaux, pizzas, cocktails, vins et boissons. Restaurant vue mer à Lomé." },
      { property: "og:title", content: "Restaurant TOGOLIVING — Saveurs du Monde" },
      { property: "og:url", content: "/restaurant" },
    ],
    links: [{ rel: "canonical", href: "/restaurant" }],
  }),
  component: Page,
});

const ICONS: Record<MenuCategory, typeof Coffee> = {
  "Tout":              UtensilsCrossed,
  "Petit-Déjeuner":    Coffee,
  "Entrées":           Sunrise,
  "Plats":             ChefHat,
  "Fast Food & Pizzas": Pizza,
  "Desserts":          IceCream,
  "Cocktails":         GlassWater,
  "Vins & Spiritueux": Wine,
  "Boissons":          Droplets,
};

function PriceTag({ price, priceMax }: { price: number; priceMax?: number }) {
  return (
    <div className="shrink-0 px-3 py-1.5 rounded-lg bg-gold/20 border border-gold/40 text-ocean font-semibold text-sm whitespace-nowrap">
      {formatFCFA(price)}{priceMax ? ` – ${formatFCFA(priceMax)}` : ""}
    </div>
  );
}

function Page() {
  const { items } = useMenu();
  const [tab, setTab] = useState<MenuCategory>("Tout");
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>("Retrait au restaurant");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedItem, setSelectedItem] = useState<ReturnType<typeof useMenu>["items"][0] | null>(null);
  const [popupQty, setPopupQty] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollTabs = (dir: "left" | "right") => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: dir === "right" ? 180 : -180, behavior: "smooth" });
    }
  };

  const baseFiltered = tab === "Tout" ? items : items.filter((i) => i.category === tab);
  const filtered = searchQuery.trim()
    ? baseFiltered.filter((i) =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : baseFiltered;

  const totals = useMemo(() => {
    const arr = Object.values(cart);
    const count = arr.reduce((sum, item) => sum + item.qty, 0);
    const total = arr.reduce((sum, item) => sum + item.qty * item.price, 0);
    return { arr, count, total };
  }, [cart]);

  const add = (id: string, name: string, price: number, description?: string) => {
    setCart((current) => ({
      ...current,
      [id]: { id, name, price, description, qty: (current[id]?.qty ?? 0) + 1 },
    }));
  };

  const dec = (id: string) => {
    setCart((current) => {
      const existing = current[id];
      if (!existing) return current;
      if (existing.qty <= 1) {
        const { [id]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [id]: { ...existing, qty: existing.qty - 1 } };
    });
  };

  const remove = (id: string) => setCart((current) => {
    const { [id]: _, ...rest } = current;
    return rest;
  });

  const sendWhatsApp = () => {
    if (totals.arr.length === 0) return;
    const lines = totals.arr.map((item) => {
      const description = item.description ? `\n  ${item.description}` : "";
      return `- ${item.qty} x ${item.name} : ${formatFCFA(item.qty * item.price)}${description}`;
    });
    const message = [
      "Bonjour TOGOLIVING,",
      "Je souhaite commander au restaurant :",
      `Mode de reception: ${fulfillment}`,
      fulfillment === "Livraison" && deliveryAddress ? `Adresse de livraison: ${deliveryAddress}` : null,
      ...lines,
      `Total: ${formatFCFA(totals.total)}`,
      "Merci de confirmer la disponibilite.",
    ].filter((line): line is string => Boolean(line)).join("\n");
    window.open(whatsappUrl(message), "_blank", "noreferrer");
  };



  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${restaurantHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Au Restaurant</p>
          <h1 className="font-display text-5xl md:text-6xl">Saveurs du Monde</h1>
          <p className="font-accent text-turquoise text-xl mt-2">Vue sur l'Océan</p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      {/* MENU */}
      <section className="bg-sand py-10 sm:py-16 pb-36">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          {/* Search bar (expandable) */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-4"
              >
                <div className="relative">
                  <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ocean/50" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher un plat, boisson..."
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-turquoise/30 text-ocean placeholder:text-ocean/40 focus:outline-none focus:border-turquoise shadow-sm text-sm"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-ocean/50 hover:text-ocean">
                      <X size={15} />
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category tabs with scroll arrows + search icon */}
          <div className="flex items-center gap-2 mb-8">
            {/* Left arrow (hidden on mobile) */}
            <button
              onClick={() => scrollTabs("left")}
              className="hidden sm:flex shrink-0 h-9 w-9 items-center justify-center rounded-full bg-white border border-turquoise/30 text-ocean hover:border-turquoise hover:shadow transition"
              aria-label="Défiler vers la gauche"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Scrollable tabs */}
            <div
              ref={tabsRef}
              className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-2 pb-1 snap-x flex-1"
            >
              {MENU_CATEGORIES.map((c) => {
                const Icon = ICONS[c];
                const active = tab === c;
                return (
                  <button
                    key={c}
                    onClick={() => { setTab(c); setSearchQuery(""); }}
                    className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition ${
                      active
                        ? "bg-ocean text-white shadow-lg scale-105"
                        : "bg-white text-ocean border border-turquoise/30 hover:border-turquoise hover:shadow"
                    }`}
                  >
                    <Icon size={15} />
                    {c}
                  </button>
                );
              })}
            </div>

            {/* Right arrow (hidden on mobile) */}
            <button
              onClick={() => scrollTabs("right")}
              className="hidden sm:flex shrink-0 h-9 w-9 items-center justify-center rounded-full bg-white border border-turquoise/30 text-ocean hover:border-turquoise hover:shadow transition"
              aria-label="Défiler vers la droite"
            >
              <ChevronRight size={18} />
            </button>

            {/* Search toggle */}
            <button
              onClick={() => { setSearchOpen((v) => !v); if (searchOpen) setSearchQuery(""); }}
              className={`shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-full border transition ${
                searchOpen
                  ? "bg-ocean text-white border-ocean shadow-md"
                  : "bg-white text-ocean border-turquoise/30 hover:border-turquoise hover:shadow"
              }`}
              aria-label="Recherche"
            >
              <Search size={16} />
            </button>
          </div>

          {/* Items — Grouped by category in "Tout" mode, flat otherwise */}
          {tab === "Tout" ? (
            <div className="space-y-12 animate-fade-in">
              {MENU_CATEGORIES.filter((c) => c !== "Tout").map((category) => {
                const catItems = items.filter((i) => i.category === category);
                if (catItems.length === 0) return null;
                const Icon = ICONS[category];
                return (
                  <div key={category}>
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ocean text-white shadow-md shadow-ocean/20">
                          <Icon size={18} />
                        </div>
                        <h2 className="font-display text-xl sm:text-2xl text-ocean">{category}</h2>
                      </div>
                      <div className="h-px flex-1 bg-turquoise/25" />
                      <span className="text-xs text-ocean/40 font-medium shrink-0">{catItems.length} article{catItems.length > 1 ? "s" : ""}</span>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
                      {catItems.map((it) => (
                        <MenuCard key={it.id} it={it} onAdd={() => add(it.id, it.name, it.price, it.description)} onOpenPopup={() => setSelectedItem(it)} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {items.length === 0 && (
                <p className="text-center text-muted-foreground py-10">Le menu est actuellement vide.</p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 animate-fade-in">
              {filtered.map((it) => (
                <MenuCard key={it.id} it={it} onAdd={() => add(it.id, it.name, it.price, it.description)} onOpenPopup={() => setSelectedItem(it)} />
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-muted-foreground py-10">
                  Aucun article dans cette catégorie.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {totals.count > 0 && (
        <div className="fixed bottom-0 inset-x-0 z-40 px-3 pb-3 sm:px-6 sm:pb-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="max-w-6xl mx-auto w-full flex items-center justify-between gap-3 bg-ocean/95 text-white px-4 sm:px-5 py-3.5 rounded-[1.4rem] border border-gold/30 shadow-2xl shadow-ocean/35 backdrop-blur"
          >
            <span className="flex items-center gap-2 min-w-0">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ocean shadow-lg shadow-gold/25 shrink-0">
                <ShoppingBag size={18} />
              </span>
              <span className="text-left leading-tight min-w-0">
                <span className="block font-medium truncate">
                  {totals.count} article{totals.count > 1 ? "s" : ""}
                </span>
                <span className="block text-xs text-white/60 truncate">Tap pour voir le panier</span>
              </span>
            </span>
            <span className="font-display text-lg text-gold whitespace-nowrap">{formatFCFA(totals.total)}</span>
            <span className="hidden sm:inline-flex items-center gap-1 bg-gold text-ocean px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
              Commander <ArrowRight size={15} />
            </span>
          </button>
        </div>
      )}

      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-ocean/85 backdrop-blur-sm flex items-end" onClick={() => setDrawerOpen(false)}>
          <div
            className="w-full bg-[linear-gradient(180deg,#0f2642_0%,#0c1f36_100%)] rounded-t-[2rem] p-5 sm:p-6 max-h-[88vh] overflow-y-auto border-t border-gold/20 shadow-[0_-24px_80px_rgba(0,0,0,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-turquoise/70">Panier</div>
                <h2 className="font-display text-2xl text-white">Votre commande</h2>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="h-11 w-11 rounded-full bg-white/10 border border-white/10 text-white/80 hover:text-white hover:bg-white/15 inline-flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 mb-5">
              <div className="text-sm text-white/70">Articles sélectionnés</div>
              <div className="font-display text-xl text-gold">{totals.count}</div>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 mb-5 space-y-4">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-turquoise/70 mb-2">Réception</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(["Retrait au restaurant", "Livraison"] as FulfillmentMethod[]).map((method) => (
                    <button
                      key={method}
                      onClick={() => setFulfillment(method)}
                      className={`rounded-xl px-4 py-3 text-sm font-medium transition border ${
                        fulfillment === method
                          ? "bg-gold text-ocean border-gold"
                          : "bg-white/5 text-white/75 border-white/10 hover:border-gold/30"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {fulfillment === "Livraison" && (
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.25em] text-turquoise/70 mb-2 block">Adresse de livraison</span>
                  <input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Quartier, rue, repère, numéro..."
                    className="w-full rounded-xl bg-white/8 border border-white/10 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-gold/50"
                  />
                </label>
              )}
            </div>

            <div className="space-y-3 mb-5">
              {totals.arr.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white/6 rounded-2xl p-3 sm:p-4 border border-white/8">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm sm:text-base font-medium truncate">{item.name}</div>
                    {item.description && (
                      <div className="text-xs text-white/45 mt-1 line-clamp-2">{item.description}</div>
                    )}
                    <div className="text-xs text-white/55 mt-1">{formatFCFA(item.price)} / unité</div>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/5 p-1 border border-white/10">
                    <button onClick={() => dec(item.id)} className="w-8 h-8 rounded-full bg-white/10 text-white inline-flex items-center justify-center hover:bg-white/15">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center font-medium text-white">{item.qty}</span>
                    <button onClick={() => add(item.id, item.name, item.price)} className="w-8 h-8 rounded-full bg-gold text-ocean inline-flex items-center justify-center shadow-md shadow-gold/20">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => remove(item.id)} className="text-white/45 hover:text-white">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-gold/10 border border-gold/20 px-4 py-4 text-gold mt-2">
              <span className="font-display text-xl">Total</span>
              <span className="font-display text-2xl">{formatFCFA(totals.total)}</span>
            </div>

            <button
              onClick={sendWhatsApp}
              className="w-full mt-5 py-4 rounded-2xl bg-turquoise text-ocean font-medium shimmer-gold inline-flex items-center justify-center gap-2 shadow-lg shadow-turquoise/20"
            >
              <ShoppingBag size={18} />
              Envoyer sur WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Item Details Popup */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-ocean/80 backdrop-blur-sm" onClick={() => { setSelectedItem(null); setPopupQty(1); }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-sand w-full max-w-lg rounded-3xl shadow-2xl relative border border-white/40 overflow-hidden"
            >
              <button
                onClick={() => { setSelectedItem(null); setPopupQty(1); }}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-ocean/5 hover:bg-ocean/10 text-ocean transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="p-6 pb-4">
                <div className="text-xs uppercase tracking-widest font-bold text-turquoise mb-2">{selectedItem.category}</div>
                <h2 className="font-display text-2xl sm:text-3xl text-ocean leading-tight pr-10">{selectedItem.name}</h2>
              </div>

              {/* Description */}
              {selectedItem.description && (
                <div className="px-6 pb-4">
                  <p className="text-ocean/70 leading-relaxed text-sm sm:text-base">{selectedItem.description}</p>
                </div>
              )}

              {/* Price + Qty selector */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-white border border-turquoise/20 px-4 py-3 mb-5">
                  <div>
                    <div className="text-xs text-ocean/50 uppercase tracking-wider mb-0.5">Prix unitaire</div>
                    <div className="font-bold text-xl text-ocean">{formatFCFA(selectedItem.price)}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setPopupQty((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-full bg-ocean/10 text-ocean inline-flex items-center justify-center hover:bg-ocean/20 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-display text-2xl text-ocean w-8 text-center">{popupQty}</span>
                    <button
                      onClick={() => setPopupQty((q) => q + 1)}
                      className="w-9 h-9 rounded-full bg-ocean text-white inline-flex items-center justify-center hover:bg-gold hover:text-ocean transition-colors shadow"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Total + Add to cart */}
                <button
                  onClick={() => {
                    for (let i = 0; i < popupQty; i++) {
                      add(selectedItem.id, selectedItem.name, selectedItem.price, selectedItem.description);
                    }
                    setSelectedItem(null);
                    setPopupQty(1);
                  }}
                  disabled={selectedItem.soldOut}
                  className="w-full flex items-center justify-between gap-3 py-4 px-5 rounded-2xl bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition-colors shadow-lg shadow-ocean/20 disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={20} />
                    {selectedItem.soldOut ? "Indisponible actuellement" : "Ajouter au panier"}
                  </span>
                  {!selectedItem.soldOut && (
                    <span className="font-display text-lg">{formatFCFA(selectedItem.price * popupQty)}</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuCard({ it, onAdd, onOpenPopup }: { it: ReturnType<typeof useMenu>["items"][0]; onAdd: () => void; onOpenPopup: () => void }) {
  return (
    <div
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest('.add-btn')) {
          onOpenPopup();
        }
      }}
      className={`glass p-4 sm:p-5 hover-lift border-2 transition-colors flex flex-col h-[135px] sm:h-[150px] ${
        it.soldOut ? "opacity-50" : "border-transparent hover:border-gold/60 cursor-pointer"
      }`}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-3 flex-1 min-h-0">
        <div className="flex-1 min-w-0 pr-2 flex flex-col h-full">
          <h3 className="font-display text-base sm:text-lg text-ocean leading-snug line-clamp-1">{it.name}</h3>
          {it.description && (
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">{it.description}</p>
          )}
          <div className="mt-auto pt-1">
            {it.soldOut ? (
              <span className="inline-block text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground w-max">
                Indisponible
              </span>
            ) : (
              <span className="text-xs text-turquoise font-medium inline-block underline decoration-turquoise/40 underline-offset-2">
                Voir plus
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end justify-between h-full shrink-0">
          <PriceTag price={it.price} priceMax={(it as { priceMax?: number }).priceMax} />
          {!it.soldOut && (
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => { e.stopPropagation(); onAdd(); }}
              className="add-btn group inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(248,245,240,0.9)_100%)] text-ocean shadow-[0_14px_30px_rgba(30,58,95,0.14)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_18px_36px_rgba(30,58,95,0.22)]"
              aria-label={`Ajouter ${it.name} au panier`}
            >
              <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1E3A5F_0%,#2d5682_100%)] text-white shadow-md shadow-ocean/20 transition-transform group-hover:scale-105 group-hover:bg-[linear-gradient(135deg,#D4AF37_0%,#f1d57c_100%)] group-hover:text-ocean">
                <Plus size={16} strokeWidth={3} />
              </span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
