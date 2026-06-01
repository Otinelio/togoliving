import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LayoutDashboard, UtensilsCrossed, BedDouble, QrCode, ClipboardList, Settings,
  LogOut, Plus, Trash2, Download,
} from "lucide-react";
import { PinScreen } from "@/components/PinScreen";
import { QRCodeCard } from "@/components/QRCodeCard";
import { useMenu } from "@/hooks/useMenu";
import { useRooms } from "@/hooks/useRooms";
import { useOrders } from "@/hooks/useOrders";
import { useSettings, DEFAULT_SETTINGS } from "@/hooks/useSettings";
import { MENU_CATEGORIES, type MenuCategory } from "@/data/defaultMenu";
import type { Room, RoomStatus, RoomType } from "@/data/defaultRooms";
import { formatFCFA } from "@/lib/whatsapp";

export const Route = createFileRoute("/admin")({ component: Page });

type Section = "overview" | "menu" | "rooms" | "qr" | "history" | "settings";

function Page() {
  const { settings } = useSettings();
  const [u, setU] = useState(false);
  if (!u) return <PinScreen title="Administration" expectedPin={settings.pinAdmin} onUnlock={() => setU(true)} />;
  return <Dash />;
}

function Dash() {
  const [section, setSection] = useState<Section>("overview");
  const nav: { id: Section; icon: typeof LayoutDashboard; label: string }[] = [
    { id: "overview", icon: LayoutDashboard, label: "Vue Generale" },
    { id: "menu", icon: UtensilsCrossed, label: "Gestion Menu" },
    { id: "rooms", icon: BedDouble, label: "Chambres" },
    { id: "qr", icon: QrCode, label: "QR Codes" },
    { id: "history", icon: ClipboardList, label: "Historique" },
    { id: "settings", icon: Settings, label: "Parametres" },
  ];

  return (
    <div className="min-h-screen bg-sand flex">
      <aside className="w-64 bg-ocean text-white p-5 hidden md:flex md:flex-col">
        <div className="font-display text-xl mb-8">
          <span className="text-white">TOGO</span><span className="text-turquoise">LIVING</span>
          <div className="text-xs text-turquoise font-body mt-1">Admin</div>
        </div>
        <nav className="space-y-1 flex-1">
          {nav.map((n) => (
            <button key={n.id} onClick={() => setSection(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                section === n.id ? "bg-turquoise text-ocean" : "hover:bg-white/10"
              }`}>
              <n.icon size={18} /> {n.label}
            </button>
          ))}
        </nav>
        <a href="/" className="mt-auto inline-flex items-center gap-2 text-sm text-white/70 hover:text-turquoise"><LogOut size={16} /> Quitter</a>
      </aside>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ocean text-white flex overflow-x-auto">
        {nav.map((n) => (
          <button key={n.id} onClick={() => setSection(n.id)}
            className={`flex-1 min-w-[80px] py-3 text-xs flex flex-col items-center gap-1 ${section === n.id ? "text-turquoise" : ""}`}>
            <n.icon size={18} /> {n.label.split(" ")[0]}
          </button>
        ))}
      </div>

      <main className="flex-1 p-5 md:p-8 pb-24 md:pb-8 overflow-x-hidden">
        {section === "overview" && <Overview />}
        {section === "menu" && <Menu />}
        {section === "rooms" && <Rooms />}
        {section === "qr" && <QRSection />}
        {section === "history" && <History />}
        {section === "settings" && <SettingsSection />}
      </main>
    </div>
  );
}

function Overview() {
  const orders = useOrders(5000);
  const { rooms } = useRooms();
  const { items } = useMenu();
  const revenue = orders.reduce((s, o) => s + o.totalPrice, 0);
  const occ = rooms.filter((r) => r.status === "Occupe").length;
  const active = items.filter((i) => !i.soldOut).length;

  return (
    <div>
      <h1 className="font-display text-3xl text-ocean mb-6">Vue Generale</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { l: "Total commandes", v: orders.length },
          { l: "Revenu total", v: formatFCFA(revenue) },
          { l: "Chambres occupees", v: `${occ}/${rooms.length}` },
          { l: "Articles menu actifs", v: active },
        ].map((s) => (
          <div key={s.l} className="glass p-5">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="font-display text-2xl text-ocean mt-1">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="glass p-5">
        <h2 className="font-display text-xl text-ocean mb-3">Activite recente</h2>
        <ul className="divide-y divide-turquoise/10">
          {orders.slice(0, 8).map((o) => (
            <li key={o.id} className="py-2 flex justify-between text-sm">
              <span>Ch. <strong>{o.roomId}</strong> · {o.items.length} article(s) · {o.status}</span>
              <span className="text-muted-foreground">{formatFCFA(o.totalPrice)}</span>
            </li>
          ))}
          {orders.length === 0 && <li className="py-4 text-center text-muted-foreground text-sm">Aucune commande</li>}
        </ul>
      </div>
    </div>
  );
}

function Menu() {
  const { items, addItem, updateItem, removeItem, toggleSoldOut } = useMenu();
  const [tab, setTab] = useState<MenuCategory>("Petit-Dejeuner");
  const [form, setForm] = useState({ name: "", price: "", description: "" });

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    addItem({ name: form.name, category: tab, price: +form.price, description: form.description });
    setForm({ name: "", price: "", description: "" });
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ocean mb-6">Gestion Menu</h1>
      <div className="flex flex-wrap gap-2 mb-5">
        {MENU_CATEGORIES.map((c) => (
          <button key={c} onClick={() => setTab(c)}
            className={`px-3 py-1.5 rounded-full text-sm ${tab === c ? "bg-ocean text-white" : "bg-white border border-turquoise/30"}`}>{c}</button>
        ))}
      </div>

      <form onSubmit={add} className="glass p-4 mb-6 grid md:grid-cols-4 gap-3">
        <input required placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white px-3 py-2 rounded border border-turquoise/30" />
        <input required type="number" placeholder="Prix FCFA" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="bg-white px-3 py-2 rounded border border-turquoise/30" />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-white px-3 py-2 rounded border border-turquoise/30 md:col-span-1" />
        <button className="bg-ocean text-white rounded px-3 py-2 inline-flex items-center justify-center gap-1"><Plus size={16} /> Ajouter</button>
      </form>

      <div className="grid md:grid-cols-2 gap-3">
        {items.filter((i) => i.category === tab).map((it) => (
          <div key={it.id} className="bg-white border border-turquoise/20 rounded-xl p-4 flex justify-between gap-3">
            <div className="flex-1">
              <input value={it.name} onChange={(e) => updateItem(it.id, { name: e.target.value })} className="font-display text-ocean bg-transparent w-full" />
              {it.description && <input value={it.description} onChange={(e) => updateItem(it.id, { description: e.target.value })} className="text-xs text-muted-foreground bg-transparent w-full" />}
              <div className="mt-1">
                <input type="number" value={it.price} onChange={(e) => updateItem(it.id, { price: +e.target.value })} className="text-gold font-semibold bg-transparent w-24" /> FCFA
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <label className="text-xs flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" checked={!!it.soldOut} onChange={() => toggleSoldOut(it.id)} /> Indispo.
              </label>
              <button onClick={() => removeItem(it.id)} className="text-destructive p-1"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Rooms() {
  const { rooms, addRoom, updateRoom, removeRoom } = useRooms();
  const [newId, setNewId] = useState("");
  const [newType, setNewType] = useState<RoomType>("Studio");

  return (
    <div>
      <h1 className="font-display text-3xl text-ocean mb-6">Chambres</h1>
      <div className="glass p-4 mb-5 flex flex-wrap gap-2">
        <input placeholder="Numero" value={newId} onChange={(e) => setNewId(e.target.value)} className="bg-white px-3 py-2 rounded border border-turquoise/30" />
        <select value={newType} onChange={(e) => setNewType(e.target.value as RoomType)} className="bg-white px-3 py-2 rounded border border-turquoise/30">
          <option>Studio</option><option>Standard 40m2</option><option>Superieur 50m2</option>
        </select>
        <button onClick={() => { if (newId) { addRoom({ id: newId, type: newType, status: "Disponible", floor: +newId[0] || 1 }); setNewId(""); }}}
          className="bg-ocean text-white rounded px-3 py-2 inline-flex items-center gap-1"><Plus size={16} /> Ajouter</button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-turquoise/20">
        <table className="w-full text-sm">
          <thead className="bg-ocean text-white text-left">
            <tr><th className="p-3">N°</th><th className="p-3">Type</th><th className="p-3">Statut</th><th className="p-3">Client</th><th className="p-3">Notes</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {rooms.map((r: Room) => (
              <tr key={r.id} className="border-t border-turquoise/10">
                <td className="p-3 font-display text-ocean">{r.id}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">
                  <select value={r.status} onChange={(e) => updateRoom(r.id, { status: e.target.value as RoomStatus })} className="bg-sand px-2 py-1 rounded border border-turquoise/30">
                    <option>Disponible</option><option>Occupe</option><option>Maintenance</option>
                  </select>
                </td>
                <td className="p-3"><input value={r.guest ?? ""} onChange={(e) => updateRoom(r.id, { guest: e.target.value })} className="bg-sand px-2 py-1 rounded border border-turquoise/20 w-32" /></td>
                <td className="p-3"><input value={r.notes ?? ""} onChange={(e) => updateRoom(r.id, { notes: e.target.value })} className="bg-sand px-2 py-1 rounded border border-turquoise/20 w-32" /></td>
                <td className="p-3"><button onClick={() => removeRoom(r.id)} className="text-destructive"><Trash2 size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QRSection() {
  const { rooms } = useRooms();
  const { settings } = useSettings();
  const [tab, setTab] = useState<"rooms" | "menu">("rooms");

  return (
    <div>
      <h1 className="font-display text-3xl text-ocean mb-6">QR Codes</h1>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setTab("rooms")} className={`px-4 py-2 rounded-full text-sm ${tab === "rooms" ? "bg-ocean text-white" : "bg-white border border-turquoise/30"}`}>Chambres</button>
        <button onClick={() => setTab("menu")} className={`px-4 py-2 rounded-full text-sm ${tab === "menu" ? "bg-ocean text-white" : "bg-white border border-turquoise/30"}`}>Menu</button>
      </div>

      {tab === "rooms" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((r) => (
            <QRCodeCard key={r.id}
              value={`${settings.domain}/room/${r.id}`}
              label={`Chambre ${r.id}`}
              sublabel={`${r.type} · Scannez pour commander`}
              filename={`QR-Chambre-${r.id}-TOGOLIVING.png`}
            />
          ))}
        </div>
      )}

      {tab === "menu" && (
        <div className="max-w-md">
          <QRCodeCard
            value={`${settings.domain}/restaurant`}
            label="Menu TOGOLIVING"
            sublabel="Scannez pour voir notre menu complet"
            filename="QR-Menu-TOGOLIVING.png"
            size={400}
          />
        </div>
      )}
    </div>
  );
}

function History() {
  const orders = useOrders(5000);
  const [room, setRoom] = useState(""); const [status, setStatus] = useState("");
  const filtered = orders.filter((o) =>
    (!room || o.roomId.includes(room)) && (!status || o.status === status)
  );

  const exportCsv = () => {
    const rows = [["Date", "Chambre", "Client", "Articles", "Total", "Statut"]];
    filtered.forEach((o) => rows.push([
      new Date(o.timestamp).toLocaleString("fr-FR"), o.roomId, o.guestName ?? "",
      o.items.map((i) => `${i.qty}x ${i.name}`).join(" | "),
      String(o.totalPrice), o.status,
    ]));
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `togoliving-orders-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-ocean mb-6">Historique Commandes</h1>
      <div className="glass p-4 mb-5 flex flex-wrap gap-2 items-center">
        <input placeholder="Filtrer par chambre" value={room} onChange={(e) => setRoom(e.target.value)} className="bg-white px-3 py-2 rounded border border-turquoise/30" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-white px-3 py-2 rounded border border-turquoise/30">
          <option value="">Tous statuts</option><option>En attente</option><option>En preparation</option><option>Pret</option><option>Livre</option>
        </select>
        <button onClick={exportCsv} className="ml-auto inline-flex items-center gap-1 bg-ocean text-white rounded px-3 py-2 text-sm"><Download size={16} /> CSV</button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl border border-turquoise/20">
        <table className="w-full text-sm">
          <thead className="bg-ocean text-white text-left">
            <tr><th className="p-3">Date</th><th className="p-3">Ch.</th><th className="p-3">Client</th><th className="p-3">Articles</th><th className="p-3">Total</th><th className="p-3">Statut</th></tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-t border-turquoise/10">
                <td className="p-3 whitespace-nowrap">{new Date(o.timestamp).toLocaleString("fr-FR")}</td>
                <td className="p-3 font-semibold">{o.roomId}</td>
                <td className="p-3">{o.guestName ?? "—"}</td>
                <td className="p-3">{o.items.map((i) => `${i.qty}× ${i.name}`).join(", ")}</td>
                <td className="p-3 text-gold font-semibold">{formatFCFA(o.totalPrice)}</td>
                <td className="p-3">{o.status}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-muted-foreground">Aucune commande</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsSection() {
  const { settings, setSettings } = useSettings();
  const [confirm, setConfirm] = useState(false);

  const reset = () => {
    ["togoliving_menu", "togoliving_rooms", "togoliving_orders", "togoliving_settings"].forEach((k) => localStorage.removeItem(k));
    location.reload();
  };

  const field = (k: keyof typeof settings, label: string, type = "text") => (
    <label className="block">
      <span className="text-sm text-ocean">{label}</span>
      <input type={type} value={settings[k]} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}
        className="mt-1 w-full bg-white px-3 py-2 rounded border border-turquoise/30" />
    </label>
  );

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-3xl text-ocean mb-6">Parametres</h1>
      <div className="space-y-4">
        {field("hotelName", "Nom de l'etablissement")}
        {field("whatsapp", "Numero WhatsApp")}
        {field("domain", "Domaine URL (pour les QR)")}
        {field("pinAdmin", "PIN Admin")}
        {field("pinReception", "PIN Reception")}
        {field("pinKitchen", "PIN Cuisine")}
        <button onClick={() => setSettings(DEFAULT_SETTINGS)} className="px-4 py-2 rounded-lg bg-white border border-ocean/20 text-ocean text-sm">Restaurer defauts</button>
      </div>

      <div className="mt-10 border-t border-turquoise/20 pt-6">
        <h2 className="font-display text-xl text-destructive mb-2">Zone de danger</h2>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm">Reinitialiser toutes les donnees</button>
        ) : (
          <div className="flex gap-2">
            <button onClick={reset} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm">Confirmer</button>
            <button onClick={() => setConfirm(false)} className="px-4 py-2 rounded-lg bg-white border border-ocean/20 text-sm">Annuler</button>
          </div>
        )}
      </div>
    </div>
  );
}
