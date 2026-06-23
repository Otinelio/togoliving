import { useState } from "react";
import { Plus, Trash2, Loader2, Image as ImageIcon, Video, X, Pencil, Check, ChevronRight } from "lucide-react";
import { useAccommodations, type Accommodation } from "@/hooks/useAccommodations";
import { supabase } from "@/lib/supabase";
import { compressImage } from "@/lib/media";

export function AccommodationsAdmin() {
  const { items, isLoading, addItem, updateItem, removeItem } = useAccommodations();
  const [modalItem, setModalItem] = useState<Partial<Accommodation> | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "media" | "features" | "prices">("info");
  const [uploading, setUploading] = useState<"imageUrl" | "videoUrl" | "posterUrl" | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "imageUrl" | "videoUrl" | "posterUrl") => {
    const rawFile = e.target.files?.[0];
    if (!rawFile || !modalItem) return;

    setUploading(field);
    try {
      const file = field === "videoUrl" ? rawFile : await compressImage(rawFile);
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { data, error } = await supabase.storage.from("media").upload(`accommodations/${fileName}`, file);
      
      if (error) throw error;

      const { data: publicData } = supabase.storage.from("media").getPublicUrl(`accommodations/${fileName}`);
      
      setModalItem({ ...modalItem, [field]: publicData.publicUrl });
    } catch (err) {
      console.error(err);
      alert("Erreur lors du téléchargement");
    } finally {
      setUploading(null);
    }
  };

  const openNew = () => {
    setModalItem({
      title: "",
      subtitle: "",
      badge: "",
      isPremium: false,
      description: "",
      features: [],
      prices: []
    });
    setActiveTab("info");
  };

  const openEdit = (item: Accommodation) => {
    setModalItem(item);
    setActiveTab("info");
  };

  const save = () => {
    if (!modalItem) return;
    if (!modalItem.title) {
      alert("Le titre est obligatoire");
      return;
    }
    if (modalItem.id) {
      updateItem(modalItem.id, modalItem);
    } else {
      addItem(modalItem as Omit<Accommodation, "id">);
    }
    setModalItem(null);
  };

  const deleteAccommodation = async (item: Accommodation) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet hébergement ?")) {
      removeItem(item.id);
      for (const url of [item.imageUrl, item.videoUrl, item.posterUrl]) {
        if (url && url.includes("supabase.co")) {
          const path = url.split("/media/")[1];
          if (path) await supabase.storage.from("media").remove([path]);
        }
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-ocean">Hébergements (Site Client)</h1>
        <button onClick={openNew} className="bg-turquoise text-ocean px-5 py-3 rounded-xl font-bold hover:bg-gold transition shadow-lg flex items-center gap-2">
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-ocean"><Loader2 size={32} className="animate-spin" /></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(it => (
            <div key={it.id} className="glass rounded-2xl border-2 border-turquoise/20 overflow-hidden group hover:shadow-xl transition-all flex flex-col">
              <div className="aspect-[4/3] bg-ocean/5 relative overflow-hidden">
                {it.imageUrl ? (
                  <img src={it.imageUrl} className="w-full h-full object-cover" alt={it.title} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ocean/30">
                    <ImageIcon size={48} />
                  </div>
                )}
                {it.isPremium && (
                  <div className="absolute top-3 right-3 bg-gold text-ocean text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">Premium</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <h3 className="font-display text-2xl">{it.title}</h3>
                    {it.subtitle && <p className="text-sm text-white/80">{it.subtitle}</p>}
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                <div className="text-sm text-ocean/80 line-clamp-2">{it.description || "Aucune description"}</div>
                
                <div className="flex justify-end gap-2 pt-4 border-t border-turquoise/10">
                  <button onClick={() => openEdit(it)} className="p-2 bg-turquoise/10 text-turquoise hover:bg-turquoise hover:text-ocean rounded-xl transition">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => deleteAccommodation(it)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground bg-white/40 rounded-3xl border-2 border-dashed border-turquoise/20">
              Aucun hébergement configuré. Cliquez sur Ajouter.
            </div>
          )}
        </div>
      )}

      {/* Modal Multi-Step pour Créer/Modifier */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-sand w-full max-w-3xl rounded-3xl shadow-2xl relative border border-white/40 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-turquoise/20">
              <h2 className="font-display text-2xl text-ocean">{modalItem.id ? "Modifier Hébergement" : "Nouvel Hébergement"}</h2>
              <button onClick={() => setModalItem(null)} className="p-2 rounded-full hover:bg-white text-ocean transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
              {/* Sidebar / Tabs */}
              <div className="w-full md:w-48 shrink-0 bg-ocean/5 p-4 flex md:flex-col gap-2 overflow-x-auto border-b md:border-b-0 md:border-r border-turquoise/20">
                {(["info", "media", "features", "prices"] as const).map(t => (
                  <button 
                    key={t} 
                    onClick={() => setActiveTab(t)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                      activeTab === t ? "bg-ocean text-white shadow-md" : "text-ocean/60 hover:bg-white"
                    }`}
                  >
                    {t === "info" && "Informations"}
                    {t === "media" && "Médias"}
                    {t === "features" && "Équipements"}
                    {t === "prices" && "Tarifs & Variantes"}
                    {activeTab === t && <ChevronRight size={16} className="hidden md:block" />}
                  </button>
                ))}
              </div>

              {/* Form Content */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                
                {/* INFO TAB */}
                {activeTab === "info" && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1 block">Titre *</label>
                      <input 
                        value={modalItem.title} 
                        onChange={e => setModalItem({ ...modalItem, title: e.target.value })}
                        className="w-full bg-white px-4 py-3 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-ocean font-bold"
                        placeholder="Ex: Studios"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1 block">Sous-titre</label>
                        <input 
                          value={modalItem.subtitle || ""} 
                          onChange={e => setModalItem({ ...modalItem, subtitle: e.target.value })}
                          className="w-full bg-white px-4 py-3 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean"
                          placeholder="Ex: Appartement 1 pièce"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1 block">Badge</label>
                        <input 
                          value={modalItem.badge || ""} 
                          onChange={e => setModalItem({ ...modalItem, badge: e.target.value })}
                          className="w-full bg-white px-4 py-3 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean"
                          placeholder="Ex: 1 Pièce"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1 block">Description</label>
                      <textarea 
                        value={modalItem.description || ""} 
                        onChange={e => setModalItem({ ...modalItem, description: e.target.value })}
                        className="w-full bg-white px-4 py-3 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean resize-none"
                        rows={4}
                        placeholder="Description complète..."
                      />
                    </div>
                    <label className="flex items-center gap-2 text-sm font-bold text-ocean cursor-pointer w-max p-3 bg-white rounded-xl border border-turquoise/20">
                      <input 
                        type="checkbox" 
                        checked={!!modalItem.isPremium} 
                        onChange={e => setModalItem({ ...modalItem, isPremium: e.target.checked })}
                        className="w-5 h-5 accent-gold"
                      />
                      Marquer comme Premium (Affichage Doré)
                    </label>
                  </div>
                )}

                {/* MEDIA TAB */}
                {activeTab === "media" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 block">Image Principale</label>
                      <div className="aspect-[16/9] bg-white border-2 border-dashed border-turquoise/30 rounded-2xl overflow-hidden relative group">
                        {modalItem.imageUrl ? (
                          <img src={modalItem.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-ocean/40">
                            <ImageIcon size={40} className="mb-2" />
                            <span className="text-sm font-bold">Ajouter une image</span>
                          </div>
                        )}
                        <label className="absolute inset-0 bg-ocean/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center cursor-pointer transition text-white font-bold">
                          {uploading === "imageUrl" ? <Loader2 className="animate-spin" /> : "Parcourir..."}
                          <input type="file" accept="image/*" onChange={e => handleUpload(e, "imageUrl")} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 block">Vidéo de Présentation (Optionnel)</label>
                      <div className="aspect-[16/9] bg-white border-2 border-dashed border-turquoise/30 rounded-2xl overflow-hidden relative group">
                        {modalItem.videoUrl ? (
                          <video src={modalItem.videoUrl} className="w-full h-full object-cover" muted controls />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-ocean/40">
                            <Video size={40} className="mb-2" />
                            <span className="text-sm font-bold">Ajouter une vidéo</span>
                          </div>
                        )}
                        <label className="absolute inset-0 bg-ocean/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center cursor-pointer transition text-white font-bold">
                          {uploading === "videoUrl" ? <Loader2 className="animate-spin" /> : "Parcourir..."}
                          <input type="file" accept="video/*" onChange={e => handleUpload(e, "videoUrl")} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* FEATURES TAB */}
                {activeTab === "features" && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => {
                      setModalItem({ ...modalItem, features: [...(modalItem.features || []), { label: "Nouvel équipement" }] });
                    }} className="mb-4 inline-flex items-center gap-2 bg-ocean text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gold hover:text-ocean transition">
                      <Plus size={16} /> Ajouter un équipement
                    </button>
                    
                    <div className="space-y-2">
                      {(modalItem.features || []).map((f: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input 
                            value={f.label || f || ""} 
                            onChange={e => {
                              const nf = [...(modalItem.features || [])];
                              nf[idx] = { label: e.target.value };
                              setModalItem({ ...modalItem, features: nf });
                            }}
                            className="flex-1 bg-white px-4 py-2.5 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean"
                          />
                          <button onClick={() => {
                            const nf = [...(modalItem.features || [])];
                            nf.splice(idx, 1);
                            setModalItem({ ...modalItem, features: nf });
                          }} className="p-2.5 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                      {(modalItem.features || []).length === 0 && (
                        <div className="text-center py-10 text-ocean/50 text-sm font-medium border-2 border-dashed border-turquoise/20 rounded-2xl">
                          Aucun équipement ajouté.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* PRICES TAB */}
                {activeTab === "prices" && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                    <button onClick={() => {
                      setModalItem({ ...modalItem, prices: [...(modalItem.prices || []), { variant: "Standard", num: "1", day: "30 000 F", month: "300 000 F" }] });
                    }} className="mb-4 inline-flex items-center gap-2 bg-ocean text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-gold hover:text-ocean transition">
                      <Plus size={16} /> Ajouter une variante
                    </button>

                    <div className="space-y-4">
                      {(modalItem.prices || []).map((p: any, idx: number) => (
                        <div key={idx} className="bg-white p-4 rounded-2xl border border-turquoise/20 relative group shadow-sm">
                          <button onClick={() => {
                            const np = [...(modalItem.prices || [])];
                            np.splice(idx, 1);
                            setModalItem({ ...modalItem, prices: np });
                          }} className="absolute top-2 right-2 p-2 text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-xl transition">
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="grid grid-cols-2 gap-4 pr-10">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-ocean/50 block mb-1">Nom Variante</label>
                              <input 
                                value={p.variant || ""} 
                                onChange={e => {
                                  const np = [...(modalItem.prices || [])];
                                  np[idx] = { ...p, variant: e.target.value };
                                  setModalItem({ ...modalItem, prices: np });
                                }} 
                                className="w-full bg-sand/30 px-3 py-2 rounded-lg border border-turquoise/10 focus:outline-none focus:border-turquoise text-sm text-ocean font-bold" 
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-ocean/50 block mb-1">Chambres (N°)</label>
                              <input 
                                value={p.num || ""} 
                                onChange={e => {
                                  const np = [...(modalItem.prices || [])];
                                  np[idx] = { ...p, num: e.target.value };
                                  setModalItem({ ...modalItem, prices: np });
                                }} 
                                className="w-full bg-sand/30 px-3 py-2 rounded-lg border border-turquoise/10 focus:outline-none focus:border-turquoise text-sm text-ocean" 
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-ocean/50 block mb-1">Prix par Jour</label>
                              <input 
                                value={p.day || ""} 
                                onChange={e => {
                                  const np = [...(modalItem.prices || [])];
                                  np[idx] = { ...p, day: e.target.value };
                                  setModalItem({ ...modalItem, prices: np });
                                }} 
                                className="w-full bg-sand/30 px-3 py-2 rounded-lg border border-turquoise/10 focus:outline-none focus:border-turquoise text-sm text-ocean" 
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-ocean/50 block mb-1">Prix par Mois</label>
                              <input 
                                value={p.month || ""} 
                                onChange={e => {
                                  const np = [...(modalItem.prices || [])];
                                  np[idx] = { ...p, month: e.target.value };
                                  setModalItem({ ...modalItem, prices: np });
                                }} 
                                className="w-full bg-sand/30 px-3 py-2 rounded-lg border border-turquoise/10 focus:outline-none focus:border-turquoise text-sm text-ocean" 
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      {(modalItem.prices || []).length === 0 && (
                        <div className="text-center py-10 text-ocean/50 text-sm font-medium border-2 border-dashed border-turquoise/20 rounded-2xl">
                          Aucune variante de prix ajoutée.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-turquoise/20 flex justify-end gap-3 bg-white/50 backdrop-blur-sm">
              <button onClick={() => setModalItem(null)} className="px-5 py-2.5 rounded-xl font-bold text-ocean hover:bg-white transition">Annuler</button>
              <button onClick={save} className="flex items-center gap-2 bg-turquoise text-ocean px-8 py-2.5 rounded-xl font-bold hover:bg-gold transition shadow-lg shadow-turquoise/20">
                <Check size={18} /> Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
