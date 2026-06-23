import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  LayoutDashboard, UtensilsCrossed, BedDouble, QrCode, Settings,
  LogOut, Plus, Trash2, Clock, Building, Globe, Phone, Lock, AlertTriangle, Image as ImageIcon, Home, FileText, User, Star
} from "lucide-react";
import { GalleryAdmin } from "@/components/admin/GalleryAdmin";
import { AccommodationsAdmin } from "@/components/admin/AccommodationsAdmin";
import { MenuAdmin } from "@/components/admin/MenuAdmin";
import { PinScreen } from "@/components/PinScreen";
import { QRCodeCard } from "@/components/QRCodeCard";
import { useMenu } from "@/hooks/useMenu";
import { useRooms } from "@/hooks/useRooms";
import { useOrders } from "@/hooks/useOrders";
import { useReviews } from "@/hooks/useReviews";
import { useSettings, DEFAULT_SETTINGS } from "@/hooks/useSettings";
import { MENU_CATEGORIES, type MenuCategory } from "@/data/defaultMenu";
import type { Room, RoomStatus, RoomType } from "@/data/defaultRooms";
import { formatFCFA } from "@/lib/whatsapp";

export const Route = createFileRoute("/admin")({ component: Page });

type Section = "overview" | "menu" | "gallery" | "accommodations" | "rooms" | "qr" | "reviews" | "settings";

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
    { id: "gallery", icon: ImageIcon, label: "Galerie Photos" },
    { id: "accommodations", icon: Home, label: "Hébergements" },
    { id: "rooms", icon: BedDouble, label: "Disponibilité" },
    { id: "reviews", icon: Star, label: "Avis" },
    { id: "qr", icon: QrCode, label: "QR Codes" },
    { id: "settings", icon: Settings, label: "Parametres" },
  ];

  return (
    <div className="min-h-screen bg-sand flex font-body">
      <aside className="w-72 shrink-0 bg-ocean text-white p-6 hidden md:flex md:flex-col shadow-2xl sticky top-0 h-screen overflow-y-auto z-20">
        <div className="font-display text-3xl mb-10 flex flex-col">
          <div><span className="text-white">TOGO</span><span className="text-turquoise">LIVING</span></div>
          <span className="text-[10px] text-turquoise/70 font-accent uppercase tracking-[0.2em] mt-1">Administration</span>
        </div>
        <nav className="space-y-2 flex-1">
          {nav.map((n) => (
            <button key={n.id} onClick={() => setSection(n.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${section === n.id ? "bg-turquoise text-ocean shadow-lg shadow-turquoise/20 scale-[1.02]" : "hover:bg-white/10 text-white/70 hover:text-white"
                }`}>
              <n.icon size={18} className={section === n.id ? "text-ocean" : "text-turquoise"} /> {n.label}
            </button>
          ))}
        </nav>
        <a href="/" className="mt-auto flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-all"><LogOut size={16} /> Quitter vers le site</a>
      </aside>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-ocean text-white flex overflow-x-auto shadow-[0_-10px_40px_rgba(0,0,0,0.2)]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {nav.map((n) => (
          <button key={n.id} onClick={() => setSection(n.id)}
            className={`shrink-0 min-w-[11.1%] flex-1 py-4 flex flex-col items-center justify-center transition-colors relative ${section === n.id ? "text-turquoise bg-white/5" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
            <n.icon size={22} className="mb-1" />
            {section === n.id && (
              <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-turquoise"></span>
            )}
          </button>
        ))}
      </div>

      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-10 md:pt-12 pb-32 md:pb-12">
        {section === "overview" && <Overview onNavigate={setSection} />}
        {section === "menu" && <MenuAdmin />}
        {section === "gallery" && <GalleryAdmin />}
        {section === "accommodations" && <AccommodationsAdmin />}
        {section === "rooms" && <Rooms />}
        {section === "qr" && <QRSection />}
        {section === "reviews" && <ReviewsAdmin />}
        {section === "settings" && <SettingsSection />}
      </main>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (section: Section) => void }) {
  const orders = useOrders(5000);
  const { rooms } = useRooms();
  const { items } = useMenu();
  const occ = rooms.filter((r) => r.status === "Occupe").length;
  const active = items.filter((i) => !i.soldOut).length;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="font-display text-4xl text-ocean mb-8">Vue Générale</h1>
      
      <div className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-wider text-ocean/60 mb-4">Accès Rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button onClick={() => onNavigate("menu")} className="p-5 rounded-2xl bg-white border border-turquoise/10 hover:border-turquoise hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-ocean/5 text-ocean flex items-center justify-center group-hover:bg-turquoise group-hover:text-white transition-colors"><UtensilsCrossed size={20} /></div>
            <span className="font-bold text-sm text-ocean">Menu</span>
          </button>
          <button onClick={() => onNavigate("rooms")} className="p-5 rounded-2xl bg-white border border-turquoise/10 hover:border-turquoise hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-ocean/5 text-ocean flex items-center justify-center group-hover:bg-turquoise group-hover:text-white transition-colors"><BedDouble size={20} /></div>
            <span className="font-bold text-sm text-ocean">Disponibilité</span>
          </button>
          <button onClick={() => onNavigate("qr")} className="p-5 rounded-2xl bg-white border border-turquoise/10 hover:border-turquoise hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-ocean/5 text-ocean flex items-center justify-center group-hover:bg-turquoise group-hover:text-white transition-colors"><QrCode size={20} /></div>
            <span className="font-bold text-sm text-ocean">QR Codes</span>
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:shadow-ocean/5 transition-all border border-turquoise/10">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-turquoise/20 rounded-full blur-2xl group-hover:bg-turquoise/30 transition-all"></div>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="p-2.5 rounded-xl bg-ocean/5 text-turquoise"><BedDouble size={22} /></div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chambres occupées</div>
          </div>
          <div className="font-display text-3xl text-ocean relative z-10">{occ}/{rooms.length}</div>
        </div>
        <div className="glass p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:shadow-ocean/5 transition-all border border-turquoise/10">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-turquoise/20 rounded-full blur-2xl group-hover:bg-turquoise/30 transition-all"></div>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="p-2.5 rounded-xl bg-ocean/5 text-turquoise"><UtensilsCrossed size={22} /></div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Articles menu actifs</div>
          </div>
          <div className="font-display text-3xl text-ocean relative z-10">{active}</div>
        </div>
      </div>

      <div className="glass p-8 rounded-2xl">
        <h2 className="font-display text-2xl text-ocean mb-6 flex items-center gap-3"><Clock size={24} className="text-turquoise" /> Activité récente</h2>
        <ul className="space-y-3">
          {orders.slice(0, 8).map((o) => (
            <li key={o.id} className="p-4 rounded-xl bg-white/60 border border-turquoise/10 flex justify-between items-center hover:border-turquoise/40 hover:bg-white transition-all shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-ocean/5 flex items-center justify-center text-ocean font-bold font-display text-lg">{o.roomId}</div>
                <div>
                  <div className="text-sm font-bold text-ocean">{o.items.length} article(s)</div>
                  <div className="text-xs font-medium text-muted-foreground mt-0.5">{o.status}</div>
                </div>
              </div>
              <span className="font-bold text-ocean bg-gold/20 px-4 py-1.5 rounded-full text-sm border border-gold/30">{formatFCFA(o.totalPrice)}</span>
            </li>
          ))}
          {orders.length === 0 && <li className="py-10 text-center text-muted-foreground bg-white/40 rounded-xl border-2 border-dashed border-turquoise/20 font-medium">Aucune commande récente</li>}
        </ul>
      </div>
    </div>
  );
}




function ReviewsAdmin() {
  const { reviews, deleteReview } = useReviews();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="font-display text-4xl text-ocean mb-8">Avis des Clients</h1>
      
      {reviews.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground bg-white/40 rounded-3xl border-2 border-dashed border-turquoise/20">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"><Star size={24} className="text-turquoise/50" /></div>
          Aucun avis pour le moment.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map(r => (
            <div key={r.id} className="glass p-6 rounded-2xl border border-turquoise/10 relative group hover:shadow-xl hover:-translate-y-1 transition-all">
              <button onClick={() => { if (window.confirm("Êtes-vous sûr de vouloir supprimer cet avis ?")) deleteReview(r.id); }} className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-bold text-ocean">{r.guest_name || "Client Anonyme"}</div>
                  <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                </div>
                <div className="text-xs font-bold text-ocean bg-turquoise/10 px-2 py-1 rounded-md">Chambre {r.room_id}</div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={16} className={r.rating >= star ? "text-gold fill-gold" : "text-gray-300"} />
                ))}
              </div>
              
              {r.comment && (
                <p className="text-sm text-ocean/80 italic bg-white/50 p-3 rounded-xl">"{r.comment}"</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Rooms() {
  const { rooms, addRoom, updateRoom, removeRoom } = useRooms();
  const [newId, setNewId] = useState("");
  const [newType, setNewType] = useState<RoomType>("Studios");
  const [filterType, setFilterType] = useState<RoomType | "Toutes">("Toutes");
  const [filterStatus, setFilterStatus] = useState<RoomStatus | "Tous">("Tous");

  const filteredRooms = rooms.filter(r => 
    (filterType === "Toutes" || r.type === filterType) &&
    (filterStatus === "Tous" || r.status === filterStatus)
  );

  const stats = {
    total: rooms.length,
    dispo: rooms.filter(r => r.status === "Disponible").length,
    occupe: rooms.filter(r => r.status === "Occupe").length,
    maint: rooms.filter(r => r.status === "Maintenance").length
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
        <h1 className="font-display text-3xl sm:text-4xl text-ocean">Disponibilité</h1>
        <div className="w-full xl:w-auto flex gap-2 bg-white/50 p-1.5 rounded-2xl border border-turquoise/20 overflow-x-auto">
          <div className="flex-1 xl:flex-none px-2 sm:px-4 py-2 bg-white rounded-xl shadow-sm border border-turquoise/10 text-center min-w-[70px]">
            <div className="text-[9px] sm:text-[10px] font-bold text-muted-foreground uppercase">Total</div>
            <div className="font-display text-lg sm:text-xl text-ocean leading-none mt-1">{stats.total}</div>
          </div>
          <div className="flex-1 xl:flex-none px-2 sm:px-4 py-2 bg-green-50 rounded-xl shadow-sm border border-green-200 text-center min-w-[70px]">
            <div className="text-[9px] sm:text-[10px] font-bold text-green-600/70 uppercase">Dispo</div>
            <div className="font-display text-lg sm:text-xl text-green-600 leading-none mt-1">{stats.dispo}</div>
          </div>
          <div className="flex-1 xl:flex-none px-2 sm:px-4 py-2 bg-red-50 rounded-xl shadow-sm border border-red-200 text-center min-w-[70px]">
            <div className="text-[9px] sm:text-[10px] font-bold text-red-600/70 uppercase">Occupées</div>
            <div className="font-display text-lg sm:text-xl text-red-600 leading-none mt-1">{stats.occupe}</div>
          </div>
          <div className="flex-1 xl:flex-none px-2 sm:px-4 py-2 bg-orange-50 rounded-xl shadow-sm border border-orange-200 text-center min-w-[70px]">
            <div className="text-[9px] sm:text-[10px] font-bold text-orange-600/70 uppercase">Maint.</div>
            <div className="font-display text-lg sm:text-xl text-orange-600 leading-none mt-1">{stats.maint}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="glass p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-ocean mb-3 flex items-center gap-2"><Plus size={14} className="text-turquoise" /> Ajouter chambre</h3>
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <input placeholder="N°" value={newId} onChange={(e) => setNewId(e.target.value)} className="w-16 bg-white px-3 py-2.5 rounded-xl border-2 border-turquoise/20 focus:border-turquoise text-sm focus:outline-none font-bold text-ocean text-center" />
            <select value={newType} onChange={(e) => setNewType(e.target.value as RoomType)} className="flex-1 bg-white px-3 py-2.5 rounded-xl border-2 border-turquoise/20 focus:border-turquoise text-sm focus:outline-none font-medium text-ocean min-w-[120px]">
              <option>Studios</option><option>Chambre Salon</option><option>2 Chambres Salon</option><option>3 Chambres Salon</option>
            </select>
            <button onClick={() => { if (newId) { addRoom({ id: newId, type: newType, status: "Disponible", floor: +newId[0] || 1 }); setNewId(""); } }}
              className="w-full sm:w-auto bg-ocean text-white rounded-xl px-4 py-2.5 flex items-center justify-center hover:bg-gold hover:text-ocean transition-colors shadow-md"><Plus size={18} /></button>
          </div>
        </div>
        
        <div className="lg:col-span-2 glass p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col justify-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-ocean mb-3">Filtres</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)} className="w-full sm:w-auto bg-white px-4 py-2.5 rounded-xl border-2 border-turquoise/20 text-sm focus:outline-none font-medium text-ocean">
              <option value="Toutes">Tous les types</option>
              <option>Studios</option><option>Chambre Salon</option><option>2 Chambres Salon</option><option>3 Chambres Salon</option>
            </select>
            <div className="flex gap-1 bg-white p-1 rounded-xl border-2 border-turquoise/20 overflow-x-auto flex-1 w-full sm:w-auto">
              <button onClick={() => setFilterStatus("Tous")} className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${filterStatus === "Tous" ? "bg-ocean text-white shadow" : "text-ocean/60 hover:bg-turquoise/10"}`}>Tous</button>
              <button onClick={() => setFilterStatus("Disponible")} className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${filterStatus === "Disponible" ? "bg-green-500 text-white shadow" : "text-green-600/60 hover:bg-green-50"}`}>Dispo</button>
              <button onClick={() => setFilterStatus("Occupe")} className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${filterStatus === "Occupe" ? "bg-red-500 text-white shadow" : "text-red-600/60 hover:bg-red-50"}`}>Occupé</button>
              <button onClick={() => setFilterStatus("Maintenance")} className={`flex-1 sm:flex-none px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${filterStatus === "Maintenance" ? "bg-orange-500 text-white shadow" : "text-orange-600/60 hover:bg-orange-50"}`}>Maint.</button>
            </div>
          </div>
        </div>
      </div>

      {filteredRooms.length === 0 ? (
        <div className="py-20 text-center glass rounded-3xl border-2 border-dashed border-turquoise/30">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"><BedDouble size={24} className="text-turquoise/50" /></div>
          <p className="text-ocean font-medium text-lg">Aucune chambre ne correspond aux filtres</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredRooms.map((r: Room) => {
            const isDispo = r.status === "Disponible";
            const isOcc = r.status === "Occupe";
            
            return (
              <div key={r.id} className="bg-white rounded-2xl border border-turquoise/10 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden group flex flex-col">
                <div className={`absolute top-0 inset-x-0 h-1.5 ${isDispo ? 'bg-green-500' : isOcc ? 'bg-red-500' : 'bg-orange-500'}`}></div>
                
                <div className="flex justify-between items-start mb-4 mt-2">
                  <div>
                    <div className="font-display text-3xl text-ocean tracking-tight">N° {r.id}</div>
                    <div className="text-[10px] font-bold text-turquoise uppercase tracking-widest mt-0.5 px-2 py-1 bg-turquoise/10 rounded-full inline-block">{r.type}</div>
                  </div>
                  <button onClick={() => { if (window.confirm("Êtes-vous sûr de vouloir supprimer cette chambre ?")) removeRoom(r.id); }} className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-xl transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
                </div>
                
                <div className="space-y-3 flex-1 flex flex-col justify-end mt-2">
                  <select value={r.status} onChange={(e) => updateRoom(r.id, { status: e.target.value as RoomStatus })} 
                    className={`w-full px-3 py-2 rounded-xl border text-sm font-bold focus:outline-none appearance-none cursor-pointer transition-colors text-center ${
                      isDispo ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' :
                      isOcc ? 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100' :
                      'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
                    }`}>
                    <option value="Disponible">🟢 Disponible</option>
                    <option value="Occupe">🔴 Occupée</option>
                    <option value="Maintenance">🟠 Maintenance</option>
                  </select>
                  
                  {isOcc && (
                    <div className="relative animate-in slide-in-from-top-2 fade-in duration-200">
                      <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean/40" />
                      <input value={r.guest ?? ""} placeholder="Client actuel..." onChange={(e) => updateRoom(r.id, { guest: e.target.value })} 
                        className="w-full bg-sand/50 pl-9 pr-3 py-2 rounded-xl border border-transparent focus:bg-white focus:border-turquoise text-sm font-medium text-ocean placeholder:text-ocean/40 transition-all" />
                    </div>
                  )}
                  
                  <div className="relative">
                    <FileText size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ocean/40" />
                    <input value={r.notes ?? ""} placeholder="Notes / Ménage..." onChange={(e) => updateRoom(r.id, { notes: e.target.value })} 
                      className="w-full bg-sand/50 pl-9 pr-3 py-2 rounded-xl border border-transparent focus:bg-white focus:border-turquoise text-sm font-medium text-ocean placeholder:text-ocean/40 transition-all" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function QRSection() {
  const { rooms } = useRooms();
  const { settings } = useSettings();
  const [tab, setTab] = useState<"rooms" | "menu">("rooms");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="font-display text-4xl text-ocean mb-8">QR Codes</h1>
      <div className="flex gap-2 mb-8 bg-white/50 p-2 rounded-2xl border border-turquoise/20 backdrop-blur-sm inline-flex">
        <button onClick={() => setTab("rooms")} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "rooms" ? "bg-ocean text-white shadow-md" : "bg-transparent text-ocean/70 hover:bg-white"}`}>Chambres</button>
        <button onClick={() => setTab("menu")} className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === "menu" ? "bg-ocean text-white shadow-md" : "bg-transparent text-ocean/70 hover:bg-white"}`}>Menu Unique (Restaurant)</button>
      </div>

      {tab === "rooms" && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map((r) => (
            <div key={r.id} className="transform transition-transform hover:-translate-y-1">
              <QRCodeCard
                value={`${settings.domain}/room/${r.id}`}
                label={`Chambre ${r.id}`}
                sublabel={`${r.type} · Conciergerie`}
                filename={`QR-Chambre-${r.id}-TOGOLIVING.png`}
              />
            </div>
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



function SettingsSection() {
  const { settings, setSettings } = useSettings();
  const [confirm, setConfirm] = useState(false);

  const reset = () => {
    ["togoliving_menu", "togoliving_rooms", "togoliving_orders", "togoliving_settings"].forEach((k) => localStorage.removeItem(k));
    location.reload();
  };

  const field = (k: keyof typeof settings, label: string, type = "text", icon: React.ReactNode) => (
    <label className="block group">
      <span className="text-xs font-bold uppercase tracking-wider text-ocean mb-2 flex items-center gap-2">{icon} {label}</span>
      <input type={type} value={settings[k] as string} onChange={(e) => setSettings({ ...settings, [k]: e.target.value })}
        className="w-full bg-white px-4 py-3.5 rounded-xl border-2 border-turquoise/20 focus:border-turquoise focus:outline-none transition-colors group-hover:border-turquoise/40 font-medium text-ocean" />
    </label>
  );

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="font-display text-4xl text-ocean mb-8">Paramètres</h1>

      <div className="glass p-8 rounded-3xl mb-8 shadow-sm">
        <h2 className="font-display text-2xl text-ocean mb-6 border-b-2 border-turquoise/20 pb-3">Informations Générales</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="block">
            <span className="text-xs font-bold uppercase tracking-wider text-ocean mb-2 flex items-center gap-2"><Building size={16} className="text-turquoise" /> Nom de l'établissement</span>
            <div className="w-full bg-ocean/5 px-4 py-3.5 rounded-xl border-2 border-transparent font-medium text-ocean/70 cursor-not-allowed">
              {settings.hotelName}
            </div>
          </div>
          {field("domain", "Domaine URL (QR)", "text", <Globe size={16} className="text-turquoise" />)}
          {field("whatsapp", "Numéro WhatsApp Principal", "text", <Phone size={16} className="text-turquoise" />)}
          {field("additionalNumbers", "Autres numéros (séparés par virgule)", "text", <Phone size={16} className="text-turquoise" />)}
        </div>

        <h2 className="font-display text-2xl text-ocean mt-10 mb-6 border-b-2 border-turquoise/20 pb-3">Sécurité (Codes PIN)</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {field("pinAdmin", "PIN Admin", "text", <Lock size={16} className="text-turquoise" />)}
        </div>

        <div className="mt-8 pt-6 border-t-2 border-turquoise/10 flex justify-end">
          <button onClick={() => setSettings(DEFAULT_SETTINGS)} className="px-6 py-3 rounded-xl bg-white border-2 border-turquoise/30 text-ocean text-sm font-bold hover:bg-turquoise/10 transition-colors">Restaurer les défauts</button>
        </div>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="p-4 bg-red-100 rounded-2xl text-red-600 shrink-0"><AlertTriangle size={32} /></div>
          <div>
            <h2 className="font-display text-2xl text-red-600 mb-2">Zone de danger</h2>
            <p className="text-sm font-medium text-red-600/80 mb-6">La réinitialisation effacera toutes les données locales (menu, chambres, commandes, paramètres). Cette action est irréversible.</p>
            {!confirm ? (
              <button onClick={() => setConfirm(true)} className="px-6 py-3 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">Réinitialiser toutes les données</button>
            ) : (
              <div className="flex flex-wrap gap-3 items-center bg-red-100 p-4 rounded-xl border border-red-200">
                <span className="text-sm font-bold text-red-700 mr-2">Êtes-vous absolument sûr ?</span>
                <button onClick={reset} className="px-6 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">Oui, effacer</button>
                <button onClick={() => setConfirm(false)} className="px-6 py-2.5 rounded-xl bg-white border-2 border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-colors">Annuler</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
