import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { LogOut, Bell } from "lucide-react";
import { useOrders, setOrderStatus, type OrderStatus } from "@/hooks/useOrders";
import { formatFCFA } from "@/lib/whatsapp";

export const Route = createFileRoute("/reception")({
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: Page,
});

function chime() {
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880; g.gain.value = 0.15;
    o.start(); o.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.25);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.stop(ctx.currentTime + 0.45);
  } catch { /* */ }
}

function relTime(ts: number) {
  const sec = Math.max(0, Math.floor((Date.now() - ts) / 1000));
  if (sec < 60) return `il y a ${sec}s`;
  const m = Math.floor(sec / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  return `il y a ${h}h ${m % 60}min`;
}

const STATUS_DOT: Record<OrderStatus, string> = {
  "En attente": "bg-orange-400",
  "En preparation": "bg-blue-400",
  "Pret": "bg-yellow-400",
  "Livre": "bg-green-400",
};

function Page() {
  return <Dashboard />;
}

function Dashboard() {
  const orders = useOrders(3000);
  const [now, setNow] = useState(new Date());
  const lastCount = useRef(orders.length);
  const [, force] = useState(0);

  useEffect(() => {
    const id = setInterval(() => { setNow(new Date()); force((n) => n + 1); }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (orders.length > lastCount.current) chime();
    lastCount.current = orders.length;
  }, [orders.length]);

  const today = useMemo(() => {
    const d0 = new Date(); d0.setHours(0,0,0,0);
    const t = orders.filter((o) => o.timestamp >= d0.getTime());
    const revenue = t.reduce((s, o) => s + o.totalPrice, 0);
    const counts: Record<string, number> = {};
    t.forEach((o) => o.items.forEach((i) => { counts[i.name] = (counts[i.name] ?? 0) + i.qty; }));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";
    const rooms = new Set(t.map((o) => o.roomId)).size;
    return { total: t.length, revenue, top, rooms };
  }, [orders]);

  return (
    <div className="min-h-screen bg-[#0c1f36] text-white">
      <header className="sticky top-0 z-20 bg-ocean/95 backdrop-blur border-b border-turquoise/20 px-5 py-3 flex items-center justify-between">
        <div className="font-display text-xl">
          <span className="text-white">TOGO</span><span className="text-turquoise">LIVING</span>
          <span className="ml-3 text-sm font-body text-turquoise">Reception</span>
        </div>
        <div className="hidden md:block text-sm text-white/70">{now.toLocaleString("fr-FR")}</div>
        <a href="/" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-turquoise"><LogOut size={16} /> Sortir</a>
      </header>

      <div className="max-w-7xl mx-auto px-5 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[
            { l: "Commandes du jour", v: today.total },
            { l: "Revenu (FCFA)",     v: today.revenue.toLocaleString("fr-FR") },
            { l: "Article top",       v: today.top },
            { l: "Chambres actives",  v: today.rooms },
          ].map((s) => (
            <div key={s.l} className="glass-dark p-4">
              <div className="text-xs text-white/60">{s.l}</div>
              <div className="font-display text-2xl text-gold mt-1 truncate">{s.v}</div>
            </div>
          ))}
        </div>

        <h2 className="font-display text-xl mb-4 flex items-center gap-2"><Bell size={18} className="text-turquoise" /> Commandes en direct</h2>

        {orders.length === 0 ? (
          <div className="glass-dark p-12 text-center text-white/60">Aucune commande pour le moment.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((o) => (
              <motion.div key={o.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-white/8 border border-turquoise/20 rounded-2xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-gold text-ocean font-display text-xl px-3 py-1 rounded-lg">Ch. {o.roomId}</div>
                  <div className="text-xs flex items-center gap-1.5 text-white/70">
                    <span className={`inline-block w-2 h-2 rounded-full ${STATUS_DOT[o.status]}`} /> {o.status}
                  </div>
                </div>
                {o.guestName && <div className="text-sm text-turquoise mb-1">{o.guestName}</div>}
                <div className="text-xs text-white/50 mb-3">{relTime(o.timestamp)}</div>
                <ul className="space-y-1 text-sm">
                  {o.items.map((i) => (
                    <li key={i.id} className="flex justify-between">
                      <span>{i.qty}× {i.name}</span>
                      <span className="text-white/60">{formatFCFA(i.qty * i.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-display mt-3 text-gold">
                  <span>Total</span><span>{formatFCFA(o.totalPrice)}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  {o.status === "En attente" && (
                    <button onClick={() => setOrderStatus(o.id, "En preparation")} className="flex-1 px-3 py-2 rounded-lg bg-turquoise text-ocean text-sm">Confirmer</button>
                  )}
                  {o.status !== "Livre" && (
                    <button onClick={() => setOrderStatus(o.id, "Livre")} className="flex-1 px-3 py-2 rounded-lg bg-green-500/80 text-white text-sm">Livre</button>
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
