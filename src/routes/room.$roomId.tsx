import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Trash2, X, UtensilsCrossed, MessageSquareWarning, Sparkles, Map, Star, Coffee, ChefHat, Pizza, IceCream, GlassWater, Wine, Droplets, Sunrise } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import { useReviews } from "@/hooks/useReviews";
import { MENU_CATEGORIES, type MenuCategory } from "@/data/defaultMenu";
import { addOrder, type OrderItem } from "@/hooks/useOrders";
import { formatFCFA, whatsappUrl } from "@/lib/whatsapp";
import { WaveDivider } from "@/components/WaveDivider";

export const Route = createFileRoute("/room/$roomId")({
  component: RoomPage,
});

const ICONS: Record<MenuCategory, any> = {
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

function RoomPage() {
  const { roomId } = Route.useParams();
  const isTable = /^T\d+$/i.test(roomId) || /^table[-_ ]?\d+$/i.test(roomId);
  const placeNumber = roomId.replace(/^T0*/i, "").replace(/^table[-_ ]?/i, "");
  const placeLabel = isTable ? `Table ${placeNumber}` : `Chambre ${roomId}`;
  const placeContext = isTable ? "depuis votre table" : "depuis votre chambre";
  const { items } = useMenu();
  const { addReview } = useReviews();
  const [tab, setTab] = useState<MenuCategory>("Tout");
  const [view, setView] = useState<"home" | "menu" | "review">("home");
  const [cart, setCart] = useState<Record<string, OrderItem>>({});
  const [guestName, setGuest] = useState("");
  const [drawerOpen, setDrawer] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { items: OrderItem[]; total: number }>(null);
  
  // Review states
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const submitReview = async () => {
    if (reviewRating < 1 || reviewRating > 5) return;
    await addReview({
      room_id: roomId,
      guest_name: guestName || undefined,
      rating: reviewRating,
      comment: reviewComment || undefined
    });
    setReviewSubmitted(true);
  };

  const whatsappConcierge = (action: string) => {
    const msg = `Bonjour TOGOLIVING,\nJe suis dans la ${placeLabel}.\n\n*Demande :* ${action}`;
    window.open(`https://wa.me/22890000000?text=${encodeURIComponent(msg)}`, "_blank"); // Mettre le vrai numéro
  };

  const baseFiltered = tab === "Tout" ? items : items.filter((i) => i.category === tab);

  const totals = useMemo(() => {
    const arr = Object.values(cart);
    const count = arr.reduce((s, i) => s + i.qty, 0);
    const total = arr.reduce((s, i) => s + i.qty * i.price, 0);
    return { count, total, arr };
  }, [cart]);

  const add = (id: string, name: string, price: number) => {
    setCart((c) => ({ ...c, [id]: { id, name, price, qty: (c[id]?.qty ?? 0) + 1 } }));
  };
  const dec = (id: string) => {
    setCart((c) => {
      const cur = c[id]; if (!cur) return c;
      if (cur.qty <= 1) { const { [id]: _, ...rest } = c; return rest; }
      return { ...c, [id]: { ...cur, qty: cur.qty - 1 } };
    });
  };
  const removeItem = (id: string) => setCart((c) => { const { [id]: _, ...rest } = c; return rest; });

  const submit = () => {
    if (totals.arr.length === 0) return;
    
    // Create WhatsApp message
    const lines = totals.arr.map((item) => `- ${item.qty} x ${item.name} : ${formatFCFA(item.qty * item.price)}`);
    const message = [
      "Bonjour TOGOLIVING,",
      `Je souhaite commander depuis la ${placeLabel} :`,
      ...lines,
      `Total: ${formatFCFA(totals.total)}`,
      guestName ? `Nom: ${guestName}` : null,
      "Merci de confirmer la commande."
    ].filter((line): line is string => Boolean(line)).join("\n");

    // Open WhatsApp
    window.open(whatsappUrl(message), "_blank");

    // Save to database
    addOrder({ roomId, guestName, items: totals.arr, totalPrice: totals.total });
    setConfirmed({ items: totals.arr, total: totals.total });
    setCart({}); setDrawer(false);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ocean to-[#0c1f36] text-white flex flex-col items-center justify-center px-6 py-12">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-full bg-turquoise text-ocean flex items-center justify-center mb-6">
          <Check size={42} />
        </motion.div>
        <h1 className="font-display text-3xl text-gold text-center">Commande envoyee !</h1>
        <p className="mt-2 text-white/70 text-center max-w-md">Notre equipe a recu votre commande pour {placeLabel.toLowerCase()}. Elle arrive bientot.</p>
        <div className="glass-dark p-5 mt-6 w-full max-w-md">
          {confirmed.items.map((i) => (
            <div key={i.id} className="flex justify-between text-sm py-1.5 border-b border-white/10 last:border-0">
              <span>{i.qty}× {i.name}</span>
              <span className="text-turquoise">{formatFCFA(i.qty * i.price)}</span>
            </div>
          ))}
          <div className="flex justify-between font-display text-lg mt-3 text-gold">
            <span>Total</span><span>{formatFCFA(confirmed.total)}</span>
          </div>
        </div>
        <button onClick={() => setConfirmed(null)} className="mt-8 px-6 py-3 rounded-full bg-turquoise text-ocean font-medium">
          Commander autre chose
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean to-[#0c1f36] text-white pb-32">
      <div className="relative pt-10 pb-16 px-6 text-center">
        <div className="font-display text-2xl font-bold">
          <span className="text-white">TOGO</span><span className="text-turquoise">LIVING</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-gold mt-4">{placeLabel}</h1>
        <p className="font-accent text-turquoise mt-1 text-lg">Votre Conciergerie Digitale</p>
        <div className="absolute -bottom-1 inset-x-0 opacity-50"><WaveDivider color="#0c1f36" /></div>
      </div>

      <div className="px-4 max-w-3xl mx-auto">
        {view === "home" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
            <button onClick={() => setView("menu")} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 transition text-left group">
              <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:text-ocean transition">
                <UtensilsCrossed size={28} />
              </div>
              <div>
                <h3 className="font-display text-xl text-white">Commander au Restaurant</h3>
                <p className="text-sm text-white/60 mt-1">Repas et boissons livrés en chambre ou au restaurant.</p>
              </div>
            </button>

            <button onClick={() => whatsappConcierge("Je souhaite demander le ménage de ma chambre.")} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-turquoise/50 transition text-left group">
              <div className="w-14 h-14 rounded-full bg-turquoise/10 text-turquoise flex items-center justify-center shrink-0 group-hover:bg-turquoise group-hover:text-ocean transition">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="font-display text-xl text-white">Demander le Ménage</h3>
                <p className="text-sm text-white/60 mt-1">Nettoyage, nouvelles serviettes ou rechargement.</p>
              </div>
            </button>

            <button onClick={() => whatsappConcierge("J'ai un problème dans ma chambre que j'aimerais signaler : [DÉCRIRE LE PROBLÈME]")} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition text-left group">
              <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-500 group-hover:text-ocean transition">
                <MessageSquareWarning size={28} />
              </div>
              <div>
                <h3 className="font-display text-xl text-white">Signaler un Problème</h3>
                <p className="text-sm text-white/60 mt-1">Assistance technique ou souci en chambre.</p>
              </div>
            </button>

            <button onClick={() => whatsappConcierge("J'aimerais avoir des recommandations sur les lieux à visiter ou activités à Lomé.")} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition text-left group">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0 group-hover:bg-purple-500 group-hover:text-ocean transition">
                <Map size={28} />
              </div>
              <div>
                <h3 className="font-display text-xl text-white">Guide & Recommandations</h3>
                <p className="text-sm text-white/60 mt-1">Découvrez Lomé et ses activités incontournables.</p>
              </div>
            </button>

            <button onClick={() => setView("review")} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition text-left group">
              <div className="w-14 h-14 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0 group-hover:bg-pink-500 group-hover:text-ocean transition">
                <Star size={28} />
              </div>
              <div>
                <h3 className="font-display text-xl text-white">Laisser un Avis</h3>
                <p className="text-sm text-white/60 mt-1">Partagez votre expérience avec nous.</p>
              </div>
            </button>
          </motion.div>
        )}

        {view === "review" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pb-10">
            <button onClick={() => { setView("home"); setReviewSubmitted(false); setReviewComment(""); }} className="mb-6 flex items-center gap-2 text-turquoise text-sm font-medium hover:text-gold transition">
              ← Retour à l'accueil
            </button>
            
            {reviewSubmitted ? (
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-turquoise text-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-display text-gold mb-2">Merci pour votre avis !</h3>
                <p className="text-white/70">Votre retour est précieux et nous aide à améliorer nos services.</p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl">
                <h2 className="font-display text-2xl text-gold mb-6">Comment s'est passé votre séjour ?</h2>
                
                <input value={guestName} onChange={(e) => setGuest(e.target.value)} placeholder="Votre prénom (optionnel)"
                  className="w-full bg-white/10 border border-turquoise/30 rounded-xl px-4 py-3 text-white placeholder:text-white/40 mb-6" />

                <div className="mb-6 text-center">
                  <div className="text-sm text-white/60 mb-3">Note globale</div>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} onClick={() => setReviewRating(star)} className={`transition-all ${reviewRating >= star ? "text-gold scale-110" : "text-white/20 hover:text-gold/50 hover:scale-105"}`}>
                        <Star size={36} fill={reviewRating >= star ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Racontez-nous votre expérience... Qu'avez-vous particulièrement apprécié ? Que pouvons-nous améliorer ?"
                    className="w-full bg-white/10 border border-turquoise/30 rounded-xl px-4 py-3 text-white placeholder:text-white/40 h-32 resize-none focus:outline-none focus:border-turquoise" />
                </div>

                <button onClick={submitReview} className="w-full bg-turquoise text-ocean font-bold py-3.5 rounded-xl hover:bg-gold transition-colors shimmer-gold">
                  Envoyer mon avis
                </button>
              </div>
            )}
          </motion.div>
        )}

        {view === "menu" && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="pb-10">
            <button onClick={() => setView("home")} className="mb-6 flex items-center gap-2 text-turquoise text-sm font-medium hover:text-gold transition">
              ← Retour à l'accueil
            </button>
            <input value={guestName} onChange={(e) => setGuest(e.target.value)} placeholder="Votre prénom (optionnel)"
              className="w-full bg-white/10 border border-turquoise/30 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 mb-5" />

            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 -mx-4 px-4 snap-x [&::-webkit-scrollbar]:hidden">
              {MENU_CATEGORIES.map((c) => {
                const Icon = ICONS[c] || UtensilsCrossed;
                const active = tab === c;
                return (
                  <button key={c} onClick={() => setTab(c)}
                    className={`shrink-0 snap-start inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition ${
                      active ? "bg-turquoise text-ocean shadow-lg scale-105" : "bg-white/10 text-white border border-white/15 hover:border-turquoise"
                    }`}>
                    <Icon size={15} />
                    {c}
                  </button>
                );
              })}
            </div>

            {tab === "Tout" ? (
              <div className="space-y-10 animate-fade-in">
                {MENU_CATEGORIES.filter((c) => c !== "Tout").map((category) => {
                  const catItems = items.filter((i) => i.category === category);
                  if (catItems.length === 0) return null;
                  const Icon = ICONS[category] || UtensilsCrossed;
                  return (
                    <div key={category}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-turquoise text-ocean shadow-md">
                          <Icon size={18} />
                        </div>
                        <h2 className="font-display text-2xl text-white">{category}</h2>
                        <div className="h-px flex-1 bg-white/10" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        {catItems.map((it) => (
                          <MenuScanCard key={it.id} it={it} cartQty={cart[it.id]?.qty || 0} onAdd={() => add(it.id, it.name, it.price)} onDec={() => dec(it.id)} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 animate-fade-in">
                {baseFiltered.map((it) => (
                  <MenuScanCard key={it.id} it={it} cartQty={cart[it.id]?.qty || 0} onAdd={() => add(it.id, it.name, it.price)} onDec={() => dec(it.id)} />
                ))}
                {baseFiltered.length === 0 && (
                  <p className="col-span-full text-center text-white/50 py-10">Aucun article dans cette catégorie.</p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {view === "menu" && totals.count > 0 && (
          <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }}
            className="fixed bottom-0 inset-x-0 z-40 bg-ocean border-t border-turquoise/30 backdrop-blur p-3">
            <button onClick={() => setDrawer(true)}
              className="max-w-3xl mx-auto w-full flex items-center justify-between gap-3 bg-gold text-ocean px-5 py-3 rounded-xl font-medium">
              <span className="flex items-center gap-2"><ShoppingBag size={18} /> {totals.count} article{totals.count > 1 ? "s" : ""}</span>
              <span>{formatFCFA(totals.total)}</span>
              <span className="bg-ocean text-gold px-3 py-1 rounded-full text-sm">Commander</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ocean/80 flex items-end" onClick={() => setDrawer(false)}>
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-[#0c1f36] rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-display text-2xl text-gold">Votre commande</h2>
                <button onClick={() => setDrawer(false)} className="text-white/70"><X /></button>
              </div>
              <div className="space-y-3">
                {totals.arr.map((i) => (
                  <div key={i.id} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <div className="flex-1">
                      <div className="text-sm">{i.name}</div>
                      <div className="text-xs text-turquoise">{formatFCFA(i.price)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => dec(i.id)} className="w-8 h-8 rounded-full bg-white/10"><Minus size={14} className="mx-auto" /></button>
                      <span className="w-6 text-center">{i.qty}</span>
                      <button onClick={() => add(i.id, i.name, i.price)} className="w-8 h-8 rounded-full bg-white/10"><Plus size={14} className="mx-auto" /></button>
                    </div>
                    <button onClick={() => removeItem(i.id)} className="text-white/50 hover:text-white"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-display text-xl mt-5 text-gold">
                <span>Total</span><span>{formatFCFA(totals.total)}</span>
              </div>
              <button onClick={submit} className="w-full mt-5 py-4 rounded-xl bg-turquoise text-ocean font-medium shimmer-gold">
                Envoyer la commande
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuScanCard({ it, cartQty, onAdd, onDec }: { it: any; cartQty: number; onAdd: () => void; onDec: () => void }) {
  const hasImage = !!it.image;

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-full bg-white/5 group ${it.soldOut ? "opacity-60 grayscale-[0.5] border-white/5" : "hover:border-turquoise/30 hover:shadow-xl hover:shadow-ocean/5 border-white/10"}`}>
      {hasImage && (
        <div className="relative h-48 overflow-hidden bg-ocean/20">
          <img src={it.image} alt={it.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1f36]/80 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold text-turquoise shadow-sm border border-white/20">
            {formatFCFA(it.price)}
          </div>
          {it.soldOut && (
             <div className="absolute top-3 right-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">Épuisé</div>
          )}
        </div>
      )}
      
      <div className={`p-5 flex-1 flex flex-col ${!hasImage ? 'min-h-[160px]' : ''}`}>
        <div className="flex justify-between items-start gap-3">
          <div>
            <div className="font-display text-lg text-white leading-snug group-hover:text-turquoise transition-colors">{it.name}</div>
            {it.description && <div className="text-xs text-white/60 mt-1.5 line-clamp-2 leading-relaxed">{it.description}</div>}
            {!hasImage && <div className="text-turquoise font-bold mt-2">{formatFCFA(it.price)}</div>}
          </div>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-wider font-bold text-gold/70 px-2 py-1 rounded-md bg-gold/10 border border-gold/20">{it.category}</div>
          
          {it.soldOut ? (
            <span className="text-xs text-red-400 font-bold bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">Indisponible</span>
          ) : cartQty > 0 ? (
            <div className="flex items-center gap-3 bg-white/10 rounded-full px-1.5 py-1.5 border border-white/10">
              <button onClick={(e) => { e.stopPropagation(); onDec(); }} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><Minus size={14} /></button>
              <span className="w-5 text-center font-bold text-white text-sm">{cartQty}</span>
              <button onClick={(e) => { e.stopPropagation(); onAdd(); }} className="w-8 h-8 rounded-full bg-turquoise text-ocean flex items-center justify-center hover:bg-gold"><Plus size={14} /></button>
            </div>
          ) : (
            <motion.button whileTap={{ scale: 0.9 }} onClick={(e) => { e.stopPropagation(); onAdd(); }}
              className="w-10 h-10 rounded-full bg-turquoise/10 text-turquoise hover:bg-turquoise hover:text-ocean flex items-center justify-center transition shadow-lg border border-turquoise/20">
              <Plus size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
