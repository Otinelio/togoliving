import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";
import { supabase } from "@/lib/supabase";
import { compressImage } from "@/lib/media";

export function GalleryAdmin() {
  const { items, isLoading, addItem, removeItem } = useGallery();
  const [category, setCategory] = useState("Tout");
  const [uploading, setUploading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImage, setNewImage] = useState({ url: "", altText: "", category: "Piscine" });

  const categories = ["Tout", "Piscine", "Plage", "Appartements", "Intérieur", "Bar", "Loisir et détente"];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setUploading(true);
    try {
      const file = await compressImage(rawFile);
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { data, error } = await supabase.storage.from("media").upload(`gallery/${fileName}`, file);
      
      if (error) throw error;

      const { data: publicData } = supabase.storage.from("media").getPublicUrl(`gallery/${fileName}`);
      setNewImage(prev => ({ ...prev, url: publicData.publicUrl, altText: prev.altText || file.name }));
    } catch (err) {
      console.error(err);
      alert("Erreur lors du téléchargement");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveItem = () => {
    if (!newImage.url) {
      alert("L'URL de l'image est obligatoire");
      return;
    }
    addItem({
      category: newImage.category,
      imageUrl: newImage.url,
      altText: newImage.altText || "Image de la galerie"
    });
    setShowAddModal(false);
    setNewImage({ url: "", altText: "", category: "Piscine" });
  };

  const filteredItems = category === "Tout" ? items : items.filter(i => i.category === category);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="font-display text-4xl text-ocean mb-8">Gestion Galerie</h1>
      
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2 bg-white/50 p-2 rounded-2xl border border-turquoise/20 backdrop-blur-sm">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${category === c ? "bg-ocean text-white shadow-md" : "bg-transparent text-ocean/70 hover:bg-white"}`}>{c}</button>
          ))}
        </div>
        
        <button onClick={() => {
          setNewImage({ url: "", altText: "", category: category === "Tout" ? "Piscine" : category });
          setShowAddModal(true);
        }} className="inline-flex items-center gap-2 bg-turquoise text-ocean px-5 py-3 rounded-xl font-bold hover:bg-gold transition shadow-lg">
          <Plus size={18} /> Ajouter une image
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-ocean"><Loader2 size={32} className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border-2 border-turquoise/20 shadow-sm hover:shadow-xl transition-all">
              <img src={item.imageUrl} alt={item.altText} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ocean/60 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className="bg-white/90 text-ocean px-2 py-1 rounded-lg text-xs font-bold">{item.category}</span>
                  <button onClick={async () => {
                      if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;
                      removeItem(item.id);
                      if (item.imageUrl && item.imageUrl.includes("supabase.co")) {
                        const path = item.imageUrl.split("/media/")[1];
                        if (path) await supabase.storage.from("media").remove([path]);
                      }
                    }
                  } className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition shadow">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-20 text-center text-muted-foreground bg-white/40 rounded-3xl border-2 border-dashed border-turquoise/20">
              Aucune image trouvée dans cette catégorie.
            </div>
          )}
        </div>
      )}

      {/* Modal d'ajout d'image */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowAddModal(false)}>
          <div className="bg-sand w-full max-w-md rounded-3xl shadow-2xl relative border border-white/40 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-turquoise/20">
              <h2 className="font-display text-2xl text-ocean">Ajouter à la galerie</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-ocean/60 mb-1 block">Catégorie</label>
                <select 
                  value={newImage.category} 
                  onChange={e => setNewImage({...newImage, category: e.target.value})}
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean"
                >
                  {categories.filter(c => c !== "Tout").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div>
                <label className="text-[10px] uppercase font-bold text-ocean/60 mb-1 block">URL de l'image (Entrer URL ou Uploader)</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="https://..." 
                    value={newImage.url} 
                    onChange={e => setNewImage({...newImage, url: e.target.value})}
                    className="flex-1 bg-white px-3 py-2.5 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean"
                  />
                  <label className={`cursor-pointer inline-flex items-center justify-center gap-2 bg-turquoise/20 text-turquoise-dark px-3 py-2.5 rounded-xl font-bold hover:bg-turquoise hover:text-ocean transition shrink-0 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImageIcon size={16} />}
                    <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                  </label>
                </div>
                {newImage.url && (
                  <div className="mt-2 aspect-video bg-ocean/5 rounded-xl overflow-hidden border border-turquoise/20 relative">
                    <img src={newImage.url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-ocean/60 mb-1 block">Description de l'image (Pour indexation)</label>
                <input 
                  type="text" 
                  placeholder="Ex: Belle vue sur la piscine..." 
                  value={newImage.altText} 
                  onChange={e => setNewImage({...newImage, altText: e.target.value})}
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean"
                />
              </div>
            </div>

            <div className="p-4 border-t border-turquoise/20 flex justify-end gap-3 bg-white/50">
              <button onClick={() => setShowAddModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-ocean hover:bg-white transition">Annuler</button>
              <button onClick={handleSaveItem} className="flex items-center gap-2 bg-turquoise text-ocean px-6 py-2.5 rounded-xl font-bold hover:bg-gold transition shadow-lg">Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
