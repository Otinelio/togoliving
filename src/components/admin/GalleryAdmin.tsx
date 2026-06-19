import { useState } from "react";
import { Plus, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";
import { useGallery } from "@/hooks/useGallery";
import { supabase } from "@/lib/supabase";
import { compressImage } from "@/lib/media";

export function GalleryAdmin() {
  const { items, isLoading, addItem, removeItem } = useGallery();
  const [category, setCategory] = useState("Tout");
  const [uploading, setUploading] = useState(false);

  const categories = ["Tout", "Piscine", "Plage", "Appartements", "Intérieur", "Bar"];

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
      
      addItem({
        category: category === "Tout" ? "Piscine" : category, // Default category
        imageUrl: publicData.publicUrl,
        altText: file.name
      });
    } catch (err) {
      console.error(err);
      alert("Erreur lors du téléchargement");
    } finally {
      setUploading(false);
    }
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
        
        <label className={`cursor-pointer inline-flex items-center gap-2 bg-turquoise text-ocean px-5 py-3 rounded-xl font-bold hover:bg-gold transition shadow-lg ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
          {uploading ? "Envoi..." : "Uploader une image"}
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 text-ocean"><Loader2 size={32} className="animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-white border-2 border-turquoise/20 shadow-sm hover:shadow-xl transition-all">
              <img src={item.imageUrl} alt={item.altText} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ocean/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className="bg-white/90 text-ocean px-2 py-1 rounded-lg text-xs font-bold">{item.category}</span>
                  <button onClick={async () => {
                    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) {
                      removeItem(item.id);
                      if (item.imageUrl && item.imageUrl.includes("supabase.co")) {
                        const path = item.imageUrl.split("/media/")[1];
                        if (path) await supabase.storage.from("media").remove([path]);
                      }
                    }
                  }} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl transition shadow">
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
    </div>
  );
}
