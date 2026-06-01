import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import { MENU_CATEGORIES, type MenuCategory } from "@/data/defaultMenu";
import { addOrder, type OrderItem } from "@/hooks/useOrders";
import { formatFCFA } from "@/lib/whatsapp";
import { WaveDivider } from "@/components/WaveDivider";

export const Route = createFileRoute("/room/$roomId")({
  component: RoomPage,
});

function RoomPage() {
  const { roomId } = Route.useParams();
  const { items } = useMenu();
  const [tab, setTab] = useState<MenuCategory>("Petit-Dejeuner");
  const [cart, setCart] = useState<Record<string, OrderItem>>({});
  const [guestName, setGuest] = useState("");
  const [drawerOpen, setDrawer] = useState(false);
  const [confirmed, setConfirmed] = useState<null | { items: OrderItem[]; total: number }>(null);

  const filtered = items.filter((i) => i.category === tab);

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
        <p className="mt-2 text-white/70 text-center max-w-md">Notre equipe a recu votre commande pour la chambre {roomId}. Elle arrive bientot.</p>
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
      <div className="relative pt-10 pb-6 px-6 text-center">
        <div className="font-display text-2xl font-bold">
          <span className="text-white">TOGO</span><span className="text-turquoise">LIVING</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-gold mt-4">Chambre {roomId}</h1>
        <p className="font-accent text-turquoise mt-1 text-lg">Commandez depuis votre chambre</p>
        <div className="absolute -bottom-1 inset-x-0 opacity-50"><WaveDivider color="#0c1f36" /></div>
      </div>

      <div className="px-4 max-w-3xl mx-auto">
        <input value={guestName} onChange={(e) => setGuest(e.target.value)} placeholder="Votre prenom (optionnel)"
          className="w-full bg-white/10 border border-turquoise/30 rounded-lg px-4 py-2.5 text-white placeholder:text-white/40 mb-5" />

        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 snap-x">
          {MENU_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setTab(c)}
              className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm transition ${tab === c ? "bg-turquoise text-ocean" : "bg-white/10 text-white border border-white/15"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {filtered.map((it) => (
            <div key={it.id} className={`rounded-xl p-4 border ${it.soldOut ? "bg-white/5 opacity-50 border-white/10" : "bg-white/8 border-gold/30 hover:border-gold"}`}>
              <div className="flex justify-between gap-3">
                <div>
                  <div className="font-display text-lg">{it.name}</div>
                  {it.description && <div className="text-xs text-white/60 mt-1">{it.description}</div>}
                  <div className="text-turquoise font-semibold mt-2">{formatFCFA(it.price)}</div>
                  {it.soldOut && <div className="text-xs mt-1 text-white/50">Indisponible</div>}
                </div>
                {!it.soldOut && (
                  <motion.button whileTap={{ scale: 0.85 }} onClick={() => add(it.id, it.name, it.price)}
                    className="shrink-0 self-start w-10 h-10 rounded-full bg-gold text-ocean flex items-center justify-center">
                    <Plus size={20} />
                  </motion.button>
                )}
              </div>
              {cart[it.id] && (
                <div className="mt-3 flex items-center justify-end gap-2 text-sm">
                  <button onClick={() => dec(it.id)} className="w-7 h-7 rounded-full bg-white/10"><Minus size={14} className="mx-auto" /></button>
                  <span className="w-6 text-center">{cart[it.id].qty}</span>
                  <button onClick={() => add(it.id, it.name, it.price)} className="w-7 h-7 rounded-full bg-white/10"><Plus size={14} className="mx-auto" /></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {totals.count > 0 && (
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
