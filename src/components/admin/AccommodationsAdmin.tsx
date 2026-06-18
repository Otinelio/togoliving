import { useState } from "react";
import { Plus, Trash2, Home, Loader2, Image as ImageIcon, Video, X } from "lucide-react";
import { useAccommodations, type Accommodation } from "@/hooks/useAccommodations";
import { supabase } from "@/lib/supabase";
import { compressImage } from "@/lib/media";

export function AccommodationsAdmin() {
  const { items, isLoading, addItem, updateItem, removeItem } = useAccommodations();
  const [uploading, setUploading] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string, field: "imageUrl" | "videoUrl" | "posterUrl") => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setUploading(`${id}-${field}`);
    try {
      const file = field === "videoUrl" ? rawFile : await compressImage(rawFile);
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { data, error } = await supabase.storage.from("media").upload(`accommodations/${fileName}`, file);
      
      if (error) throw error;

      const { data: publicData } = supabase.storage.from("media").getPublicUrl(`accommodations/${fileName}`);
      
      updateItem(id, { [field]: publicData.publicUrl });
    } catch (err) {
      console.error(err);
      alert("Erreur lors du téléchargement");
    } finally {
      setUploading(null);
    }
  };

  const createNew = () => {
    addItem({
      title: "Nouvel Hébergement",
      subtitle: "",
      badge: "",
      isPremium: false,
      description: "",
      features: [],
      prices: []
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-ocean">Hébergements (Site Client)</h1>
        <button onClick={createNew} className="bg-turquoise text-ocean px-5 py-3 rounded-xl font-bold hover:bg-gold transition shadow-lg flex items-center gap-2">
          <Plus size={18} /> Ajouter
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-ocean"><Loader2 size={32} className="animate-spin" /></div>
      ) : (
        <div className="space-y-6">
          {items.map(it => (
            <div key={it.id} className="glass p-6 rounded-2xl border-2 border-turquoise/20 flex flex-col md:flex-row gap-6">
              
              {/* Media Section */}
              <div className="w-full md:w-64 shrink-0 space-y-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-ocean/5 border-2 border-dashed border-turquoise/30 relative group">
                  {it.imageUrl ? (
                    <img src={it.imageUrl} className="w-full h-full object-cover" alt="Cover" />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-ocean/50">
                      <ImageIcon size={32} className="mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider">Image Principale</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-ocean/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer text-white font-medium text-sm">
                    {uploading === `${it.id}-imageUrl` ? <Loader2 className="animate-spin" /> : "Modifier Image"}
                    <input type="file" accept="image/*" onChange={(e) => handleUpload(e, it.id, "imageUrl")} className="hidden" />
                  </label>
                </div>
                
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-ocean/5 border-2 border-dashed border-turquoise/30 relative group">
                  {it.videoUrl ? (
                    <video src={it.videoUrl} className="w-full h-full object-cover" muted controls />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-ocean/50">
                      <Video size={32} className="mb-2" />
                      <span className="text-xs font-bold uppercase tracking-wider">Vidéo (Optionnel)</span>
                    </div>
                  )}
                  <label className="absolute inset-0 bg-ocean/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer text-white font-medium text-sm">
                    {uploading === `${it.id}-videoUrl` ? <Loader2 className="animate-spin" /> : "Modifier Vidéo"}
                    <input type="file" accept="video/*" onChange={(e) => handleUpload(e, it.id, "videoUrl")} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Data Section */}
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <input 
                    value={it.title} 
                    onChange={(e) => updateItem(it.id, { title: e.target.value })}
                    className="font-display text-3xl text-ocean bg-transparent focus:outline-none border-b-2 border-transparent focus:border-turquoise w-full max-w-sm"
                    placeholder="Titre (ex: Studios)"
                  />
                  <button onClick={async () => {
                    removeItem(it.id);
                    // Cleanup files
                    for (const url of [it.imageUrl, it.videoUrl, it.posterUrl]) {
                      if (url && url.includes("supabase.co")) {
                        const path = url.split("/media/")[1];
                        if (path) await supabase.storage.from("media").remove([path]);
                      }
                    }
                  }} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition">
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input 
                    value={it.subtitle || ""} 
                    onChange={(e) => updateItem(it.id, { subtitle: e.target.value })}
                    className="bg-white px-4 py-2.5 rounded-xl border border-turquoise/20 text-sm focus:outline-none focus:border-turquoise w-full"
                    placeholder="Sous-titre (ex: Appartement 1 pièce)"
                  />
                  <input 
                    value={it.badge || ""} 
                    onChange={(e) => updateItem(it.id, { badge: e.target.value })}
                    className="bg-white px-4 py-2.5 rounded-xl border border-turquoise/20 text-sm focus:outline-none focus:border-turquoise w-full"
                    placeholder="Badge (ex: 1 Pièce)"
                  />
                </div>

                <textarea
                  value={it.description || ""}
                  onChange={(e) => updateItem(it.id, { description: e.target.value })}
                  className="bg-white px-4 py-3 rounded-xl border border-turquoise/20 text-sm focus:outline-none focus:border-turquoise w-full resize-none"
                  rows={3}
                  placeholder="Description complète..."
                />

                <label className="flex items-center gap-2 text-sm font-bold text-ocean cursor-pointer w-max">
                  <input 
                    type="checkbox" 
                    checked={!!it.isPremium} 
                    onChange={(e) => updateItem(it.id, { isPremium: e.target.checked })}
                    className="w-4 h-4 accent-gold"
                  />
                  Marquer comme Premium (Affichage Doré)
                </label>

                {/* Features */}
                <div className="pt-4 border-t border-turquoise/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-ocean">Équipements (Features)</span>
                    <button onClick={() => {
                      const newFeatures = [...(it.features || []), { label: "Nouvel équipement" }];
                      updateItem(it.id, { features: newFeatures });
                    }} className="text-xs flex items-center gap-1 bg-ocean/5 hover:bg-ocean/10 text-ocean px-2 py-1 rounded-lg transition">
                      <Plus size={12} /> Ajouter
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(it.features || []).map((f: any, idx: number) => (
                      <div key={idx} className="flex items-center bg-white border border-turquoise/20 rounded-lg overflow-hidden group">
                        <input 
                          value={f.label || f || ""} 
                          onChange={(e) => {
                            const newFeatures = [...(it.features || [])];
                            newFeatures[idx] = { label: e.target.value };
                            updateItem(it.id, { features: newFeatures });
                          }}
                          className="px-3 py-1.5 text-xs text-ocean focus:outline-none w-32"
                        />
                        <button onClick={() => {
                          const newFeatures = [...(it.features || [])];
                          newFeatures.splice(idx, 1);
                          updateItem(it.id, { features: newFeatures });
                        }} className="px-2 text-red-400 hover:text-red-600 hover:bg-red-50 transition h-full">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prices & Variants */}
                <div className="pt-4 border-t border-turquoise/10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-ocean">Tarifs & Variantes</span>
                    <button onClick={() => {
                      const newPrices = [...(it.prices || []), { variant: "Standard", num: "1", day: "30 000 F", month: "300 000 F" }];
                      updateItem(it.id, { prices: newPrices });
                    }} className="text-xs flex items-center gap-1 bg-ocean/5 hover:bg-ocean/10 text-ocean px-2 py-1 rounded-lg transition">
                      <Plus size={12} /> Ajouter une variante
                    </button>
                  </div>
                  <div className="space-y-3">
                    {(it.prices || []).map((p: any, idx: number) => (
                      <div key={idx} className="bg-sand/30 p-3 rounded-xl border border-turquoise/20 relative group">
                        <button onClick={() => {
                          const newPrices = [...(it.prices || [])];
                          newPrices.splice(idx, 1);
                          updateItem(it.id, { prices: newPrices });
                        }} className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-500 hover:text-white">
                          <X size={12} />
                        </button>
                        <div className="grid sm:grid-cols-2 gap-2">
                          <label className="block">
                            <span className="text-[10px] uppercase font-bold text-ocean/50 ml-1">Nom Variante</span>
                            <input value={p.variant || ""} onChange={(e) => {
                              const newPrices = [...(it.prices || [])];
                              newPrices[idx] = { ...p, variant: e.target.value };
                              updateItem(it.id, { prices: newPrices });
                            }} className="w-full mt-1 bg-white px-3 py-1.5 rounded-lg border text-sm text-ocean focus:outline-none focus:border-turquoise" placeholder="ex: Studio Standard" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] uppercase font-bold text-ocean/50 ml-1">Chambres (Numéros)</span>
                            <input value={p.num || ""} onChange={(e) => {
                              const newPrices = [...(it.prices || [])];
                              newPrices[idx] = { ...p, num: e.target.value };
                              updateItem(it.id, { prices: newPrices });
                            }} className="w-full mt-1 bg-white px-3 py-1.5 rounded-lg border text-sm text-ocean focus:outline-none focus:border-turquoise" placeholder="ex: N° 4, 5, 6" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] uppercase font-bold text-ocean/50 ml-1">Prix par Jour</span>
                            <input value={p.day || ""} onChange={(e) => {
                              const newPrices = [...(it.prices || [])];
                              newPrices[idx] = { ...p, day: e.target.value };
                              updateItem(it.id, { prices: newPrices });
                            }} className="w-full mt-1 bg-white px-3 py-1.5 rounded-lg border text-sm text-ocean focus:outline-none focus:border-turquoise" placeholder="ex: 30 000 F" />
                          </label>
                          <label className="block">
                            <span className="text-[10px] uppercase font-bold text-ocean/50 ml-1">Prix par Mois</span>
                            <input value={p.month || ""} onChange={(e) => {
                              const newPrices = [...(it.prices || [])];
                              newPrices[idx] = { ...p, month: e.target.value };
                              updateItem(it.id, { prices: newPrices });
                            }} className="w-full mt-1 bg-white px-3 py-1.5 rounded-lg border text-sm text-ocean focus:outline-none focus:border-turquoise" placeholder="ex: 300 000 F" />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
          {items.length === 0 && (
            <div className="py-20 text-center text-muted-foreground bg-white/40 rounded-3xl border-2 border-dashed border-turquoise/20">
              Aucun hébergement configuré. Cliquez sur Ajouter.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
