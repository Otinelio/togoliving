import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LogOut, ChefHat } from "lucide-react";
import { useOrders, setOrderStatus } from "@/hooks/useOrders";
import { formatFCFA } from "@/lib/whatsapp";

export const Route = createFileRoute("/kitchen")({
  component: Page,
});

function chime() {
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new Ctx();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 660; g.gain.value = 0.2;
    o.start(); g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    o.stop(ctx.currentTime + 0.5);
  } catch {}
}

function rel(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)} min`;
}

function Page() {
  return <Dash />;
}

function Dash() {
  const orders = useOrders(5000);
  const active = orders.filter((o) => o.status === "En attente" || o.status === "En preparation");
  const last = useRef(active.length);
  const [, tick] = useState(0);

  useEffect(() => { const id = setInterval(() => tick((n) => n + 1), 30000); return () => clearInterval(id); }, []);
  useEffect(() => { if (active.length > last.current) chime(); last.current = active.length; }, [active.length]);

  return (
    <div className="min-h-screen bg-[#0a1828] text-white">
      <header className="sticky top-0 z-20 bg-ocean/95 backdrop-blur border-b border-turquoise/20 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChefHat className="text-turquoise" />
          <div className="font-display text-xl">Cuisine TOGOLIVING</div>
          <span className="ml-2 bg-gold text-ocean px-2.5 py-0.5 rounded-full text-sm font-semibold">{active.length}</span>
        </div>
        <a href="/" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-turquoise"><LogOut size={16} /> Sortir</a>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6">
        {active.length === 0 ? (
          <div className="glass-dark p-16 text-center text-white/60 font-display text-2xl">Pas de commande active</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {active.map((o) => (
              <motion.div key={o.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl p-5 border-2 ${o.status === "En preparation" ? "bg-blue-900/30 border-blue-400/50" : "bg-orange-900/30 border-orange-400/50"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="bg-gold text-ocean font-display text-3xl px-4 py-1.5 rounded-xl">{o.roomId}</div>
                  <div className="text-right">
                    <div className="text-xs text-white/60">{o.status}</div>
                    <div className="font-display text-xl text-turquoise">{rel(o.timestamp)}</div>
                  </div>
                </div>
                {o.guestName && <div className="text-sm text-turquoise mb-2">{o.guestName}</div>}
                <ul className="space-y-2 text-lg">
                  {o.items.map((i) => (
                    <li key={i.id} className="flex justify-between border-b border-white/10 pb-1">
                      <span><strong className="text-gold">{i.qty}×</strong> {i.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-right text-sm text-white/60 mt-2">{formatFCFA(o.totalPrice)}</div>
                <div className="flex gap-2 mt-4">
                  {o.status === "En attente" && (
                    <button onClick={() => setOrderStatus(o.id, "En preparation")} className="flex-1 py-3 rounded-xl bg-blue-500 text-white font-medium">Commencer</button>
                  )}
                  {o.status === "En preparation" && (
                    <button onClick={() => setOrderStatus(o.id, "Pret")} className="flex-1 py-3 rounded-xl bg-green-500 text-white font-medium">Pret</button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
