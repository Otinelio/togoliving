import { useState, useRef } from "react";
import {
  Plus, Trash2, Loader2, Image as ImageIcon, X,
  ChevronDown, Check, AlertCircle, Upload, Pencil,
  UtensilsCrossed,
} from "lucide-react";
import { useMenu } from "@/hooks/useMenu";
import { supabase } from "@/lib/supabase";
import { MENU_CATEGORIES, type MenuCategory } from "@/data/defaultMenu";
import { formatFCFA } from "@/lib/whatsapp";
import { compressImage } from "@/lib/media";

export function MenuAdmin() {
  const { items, addItem, updateItem, removeItem, toggleSoldOut } = useMenu();
  const [tab, setTab] = useState<MenuCategory>("Petit-Déjeuner");
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [addImage, setAddImage] = useState<File | null>(null);
  const [addImagePreview, setAddImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<ReturnType<typeof useMenu>["items"][0] | null>(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", description: "" });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const addFileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (rawFile: File): Promise<string> => {
    const file = await compressImage(rawFile);
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage.from("media").upload(`menu/${fileName}`, file);
    if (error) throw error;
    const { data: publicData } = supabase.storage.from("media").getPublicUrl(`menu/${fileName}`);
    return publicData.publicUrl;
  };

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAddImage(file);
      setAddImagePreview(URL.createObjectURL(file));
    }
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    let imageUrl: string | undefined;
    if (addImage) {
      setUploading("new");
      try {
        imageUrl = await uploadImage(addImage);
      } catch {
        alert("Erreur lors du téléchargement de l'image");
        setUploading(null);
        return;
      }
    }

    addItem({
      name: form.name,
      category: tab,
      price: +form.price,
      description: form.description,
      image: imageUrl,
    });
    setForm({ name: "", price: "", description: "" });
    setAddImage(null);
    setAddImagePreview(null);
    setUploading(null);
    setShowAddForm(false);
  };

  const handleItemImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(id);
    try {
      const imageUrl = await uploadImage(file);
      updateItem(id, { image: imageUrl });
      if (editingItem && editingItem.id === id) {
        setEditingItem({ ...editingItem, image: imageUrl });
      }
    } catch {
      alert("Erreur lors du téléchargement");
    } finally {
      setUploading(null);
    }
  };

  const handleRemoveImage = async (id: string, currentImageUrl?: string) => {
    updateItem(id, { image: null as unknown as string });
    if (editingItem && editingItem.id === id) {
      setEditingItem({ ...editingItem, image: undefined });
    }
    // Delete from storage if it exists
    if (currentImageUrl && currentImageUrl.includes("supabase.co")) {
      const path = currentImageUrl.split("/media/")[1];
      if (path) {
        await supabase.storage.from("media").remove([path]);
      }
    }
  };

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editForm.name || !editForm.price) return;
    updateItem(editingItem.id, {
      name: editForm.name,
      price: +editForm.price,
      description: editForm.description,
    });
    setEditingItem(null);
  };

  const openEdit = (item: ReturnType<typeof useMenu>["items"][0]) => {
    setEditingItem(item);
    setEditForm({ name: item.name, price: String(item.price), description: item.description || "" });
  };

  const filtered = items.filter((i) => i.category === tab);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-4xl text-ocean">Gestion Menu</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} articles au total · {filtered.length} dans cette catégorie</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all shadow-lg ${
            showAddForm
              ? "bg-ocean/10 text-ocean border-2 border-ocean/20"
              : "bg-turquoise text-ocean shimmer-gold hover:bg-gold"
          }`}
        >
          {showAddForm ? <X size={18} /> : <Plus size={18} />}
          {showAddForm ? "Fermer" : "Ajouter un plat"}
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8 bg-white/50 p-2 rounded-2xl border border-turquoise/20 backdrop-blur-sm">
        {MENU_CATEGORIES.filter(c => c !== "Tout").map((c) => {
          const count = items.filter(i => i.category === c).length;
          return (
            <button key={c} onClick={() => setTab(c)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all inline-flex items-center gap-2 ${
                tab === c
                  ? "bg-ocean text-white shadow-md shadow-ocean/20"
                  : "bg-transparent text-ocean/70 hover:bg-white hover:text-ocean"
              }`}>
              {c}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                tab === c ? "bg-white/20 text-white" : "bg-ocean/10 text-ocean/50"
              }`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Add Form (Expandable) */}
      {showAddForm && (
        <form onSubmit={add} className="glass p-6 rounded-2xl mb-10 shadow-sm border-2 border-turquoise/30 animate-in fade-in slide-in-from-top-2 duration-300">
          <h3 className="text-sm font-bold uppercase tracking-wider text-ocean mb-5 flex items-center gap-2">
            <Plus size={16} className="text-turquoise"/>
            Nouvel article dans « {tab} »
          </h3>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Image upload zone */}
            <div className="w-full md:w-48 shrink-0">
              <div
                onClick={() => addFileRef.current?.click()}
                className="aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-turquoise/30 bg-ocean/5 cursor-pointer hover:border-turquoise hover:bg-ocean/10 transition-all relative group"
              >
                {addImagePreview ? (
                  <>
                    <img src={addImagePreview} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-ocean/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-sm font-bold">
                      Changer
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-ocean/40">
                    <Upload size={28} className="mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider text-center px-2">Photo du plat</span>
                    <span className="text-[10px] mt-1">(Optionnel)</span>
                  </div>
                )}
                {uploading === "new" && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <Loader2 className="animate-spin text-ocean" size={28} />
                  </div>
                )}
              </div>
              <input ref={addFileRef} type="file" accept="image/*" onChange={handleAddImageChange} className="hidden" />
            </div>

            {/* Text fields */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1.5 block">Nom *</label>
                <input required placeholder="Ex: Poulet Braisé"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white px-4 py-3.5 rounded-xl border-2 border-turquoise/20 focus:border-turquoise focus:outline-none text-sm font-medium text-ocean placeholder:text-ocean/30"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1.5 block">Prix (FCFA) *</label>
                <input required type="number" placeholder="Ex: 6000"
                  value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full bg-white px-4 py-3.5 rounded-xl border-2 border-turquoise/20 focus:border-turquoise focus:outline-none text-sm font-medium text-ocean placeholder:text-ocean/30"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1.5 block">Description</label>
                <textarea placeholder="Ingrédients, accompagnements..."
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-white px-4 py-3.5 rounded-xl border-2 border-turquoise/20 focus:border-turquoise focus:outline-none text-sm font-medium text-ocean placeholder:text-ocean/30 resize-none"
                  rows={2}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={uploading === "new"}
                  className="bg-ocean text-white rounded-xl px-8 py-3.5 inline-flex items-center justify-center gap-2 hover:bg-gold hover:text-ocean transition-colors font-bold shadow-lg shadow-ocean/25 disabled:opacity-50"
                >
                  {uploading === "new" ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                  Ajouter à {tab}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((it) => {
          return (
            <div key={it.id} className="bg-white rounded-2xl border-2 transition-all shadow-sm overflow-hidden group border-turquoise/10 hover:border-turquoise/30 hover:shadow-xl hover:shadow-ocean/5">
              {/* Image area */}
              <div className="relative h-44 bg-gradient-to-br from-ocean/5 to-turquoise/5 overflow-hidden">
                {it.image ? (
                  <img src={it.image} className="w-full h-full object-cover" alt={it.name} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-ocean/25">
                    <UtensilsCrossed size={40} strokeWidth={1.5} />
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-2">Pas de photo</span>
                  </div>
                )}

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => toggleSoldOut(it.id)}
                    className={`text-[10px] px-3 py-1.5 rounded-full font-bold transition-colors border backdrop-blur-sm flex items-center gap-1.5 shadow-sm ${
                      it.soldOut
                        ? "bg-red-500/90 text-white border-red-600/50"
                        : "bg-green-500/90 text-white border-green-600/50"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      it.soldOut ? "bg-white animate-pulse" : "bg-white"
                    }`} />
                    {it.soldOut ? "Épuisé" : "Dispo"}
                  </button>
                </div>

                {/* Price badge */}
                <div className="absolute top-3 left-3">
                  <div className="bg-gold/95 backdrop-blur-sm text-ocean px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm border border-gold/80">
                    {formatFCFA(it.price)}
                  </div>
                </div>
              </div>

              {/* Info area */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg text-ocean leading-tight line-clamp-1">{it.name}</h3>
                  <button
                    onClick={() => openEdit(it)}
                    className="shrink-0 p-2 rounded-xl bg-ocean/5 text-ocean/50 hover:bg-turquoise/20 hover:text-ocean transition opacity-0 group-hover:opacity-100"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
                {it.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">{it.description}</p>
                )}
                {it.subcategory && (
                  <span className="inline-block text-[10px] px-2.5 py-1 rounded-full bg-turquoise/10 text-turquoise font-bold uppercase tracking-wider">
                    {it.subcategory}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center text-muted-foreground bg-white/40 rounded-3xl border-2 border-dashed border-turquoise/20">
            <UtensilsCrossed size={40} className="mx-auto mb-3 text-ocean/20" />
            <p className="font-bold text-ocean/40">Aucun article dans « {tab} »</p>
            <p className="text-sm mt-1">Cliquez sur "Ajouter un plat" pour commencer.</p>
          </div>
        )}
      </div>

      {/* Edit Popup */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setEditingItem(null)}>
          <div className="bg-sand w-full max-w-lg rounded-3xl shadow-2xl relative border border-white/40 overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-ocean transition-colors z-10 shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Edit Image Area */}
            <div className="relative h-48 sm:h-56 bg-ocean/5 flex-shrink-0">
              {editingItem.image ? (
                <img src={editingItem.image} className="w-full h-full object-cover" alt={editingItem.name} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-ocean/30">
                  <UtensilsCrossed size={48} strokeWidth={1.5} className="mb-2" />
                  <span className="text-sm font-bold uppercase tracking-widest">Pas de photo</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-ocean/40 opacity-0 hover:opacity-100 transition flex items-center justify-center gap-3">
                <label className={`inline-flex items-center gap-2 bg-white text-ocean px-4 py-2 rounded-xl text-sm font-bold cursor-pointer hover:bg-turquoise transition shadow-lg ${
                  uploading === editingItem.id ? "opacity-50 pointer-events-none" : ""
                }`}>
                  {uploading === editingItem.id ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                  {editingItem.image ? "Changer" : "Ajouter une photo"}
                  <input type="file" accept="image/*" onChange={(e) => handleItemImageUpload(e, editingItem.id)} className="hidden" />
                </label>
                
                {editingItem.image && (
                  <button
                    onClick={() => handleRemoveImage(editingItem.id, editingItem.image)}
                    className="bg-red-500 text-white p-2.5 rounded-xl hover:bg-red-600 transition shadow-lg"
                    title="Supprimer la photo"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>

            <form onSubmit={saveEdit} className="p-6 overflow-y-auto">
              <h2 className="font-display text-2xl text-ocean mb-5">Modifier {editingItem.name}</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1 block">Nom *</label>
                  <input
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-white px-4 py-3 rounded-xl border-2 border-turquoise/20 focus:border-turquoise focus:outline-none text-sm font-display text-ocean"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1 block">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full bg-white px-4 py-3 rounded-xl border-2 border-turquoise/20 focus:border-turquoise focus:outline-none text-sm text-ocean/80 resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60 mb-1 block">Prix (FCFA) *</label>
                  <input
                    required
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full bg-white px-4 py-3 rounded-xl border-2 border-turquoise/20 focus:border-turquoise focus:outline-none text-sm font-bold text-gold"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-turquoise/10">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-turquoise text-ocean px-5 py-3 rounded-xl text-sm font-bold hover:bg-gold transition shadow-md shadow-turquoise/20"
                >
                  <Check size={18} />
                  Enregistrer
                </button>
                
                {confirmDelete === editingItem.id ? (
                  <div className="flex items-center gap-2 p-1 bg-red-50 rounded-xl border border-red-200">
                    <button
                      type="button"
                      onClick={() => { removeItem(editingItem.id); setConfirmDelete(null); setEditingItem(null); }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition"
                    >
                      Supprimer !
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(null)}
                      className="text-red-600 px-3 py-2 text-xs font-bold hover:bg-red-100 rounded-lg transition"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(editingItem.id)}
                    className="p-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition border border-transparent hover:border-red-200"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
