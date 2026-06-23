import { useState } from "react";
import { Plus, Trash2, Edit2, CheckCircle2, Calendar, Image as ImageIcon } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import type { AppEvent } from "@/data/defaultEvents";

export function EventsAdmin() {
  const { events, addEvent, updateEvent, removeEvent } = useEvents();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AppEvent>>({});

  const [uploading, setUploading] = useState(false);

  const handleEdit = (evt: AppEvent) => {
    setEditingId(evt.id);
    setFormData(evt);
  };

  const handleSave = () => {
    if (editingId === "new") {
      addEvent(formData as Omit<AppEvent, "id">);
    } else if (editingId) {
      updateEvent(editingId, formData);
    }
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
        <div>
          <h2 className="text-2xl font-display text-ocean">Gestion des Événements</h2>
          <p className="text-muted-foreground text-sm mt-1">Gérez les soirées et événements affichés sur la page Événements.</p>
        </div>
        <button
          onClick={() => {
            setEditingId("new");
            setFormData({ status: "published" });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-turquoise text-ocean rounded-xl font-medium hover:bg-turquoise/80 transition"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Ajouter</span>
        </button>
      </div>

      <div className="grid gap-4">
        {events.map((evt) => (
          <div key={evt.id} className="bg-white p-4 rounded-xl border border-ocean/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-ocean/5 shrink-0">
                    {evt.img ? <img src={evt.img} alt={evt.title} className="w-full h-full object-cover" /> : <ImageIcon className="w-full h-full p-4 text-ocean/20" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean">{evt.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Calendar size={14} /> {evt.date}
                    </div>
                    <p className="text-xs text-ocean/60 mt-1 line-clamp-1">{evt.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${evt.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {evt.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                  <button onClick={() => handleEdit(evt)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 size={18} /></button>
                  <button onClick={() => removeEvent(evt.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                </div>
              </>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-ocean/20">
            <p className="text-muted-foreground">Aucun événement trouvé.</p>
          </div>
        )}
      </div>

      {editingId && (
        <EventEditor 
          formData={formData} 
          setFormData={setFormData} 
          onSave={handleSave} 
          onCancel={() => setEditingId(null)} 
          uploading={uploading}
          setUploading={setUploading}
        />
      )}
    </div>
  );
}

import { Loader2, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { compressImage } from "@/lib/media";

function EventEditor({ formData, setFormData, onSave, onCancel, uploading, setUploading }: { formData: Partial<AppEvent>, setFormData: any, onSave: () => void, onCancel: () => void, uploading: boolean, setUploading: any }) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setUploading(true);
    try {
      const file = await compressImage(rawFile);
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const { data, error } = await supabase.storage.from("media").upload(`events/${fileName}`, file);
      
      if (error) throw error;

      const { data: publicData } = supabase.storage.from("media").getPublicUrl(`events/${fileName}`);
      setFormData({ ...formData, img: publicData.publicUrl });
    } catch (err) {
      console.error(err);
      alert("Erreur lors du téléchargement");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onCancel}>
      <div className="bg-sand w-full max-w-2xl rounded-3xl shadow-2xl relative border border-white/40 overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-turquoise/20">
          <h2 className="font-display text-2xl text-ocean">Événement</h2>
          <button onClick={onCancel} className="p-2 rounded-full hover:bg-white text-ocean transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Titre de l'événement" className="p-2.5 rounded-xl border border-ocean/10 w-full focus:border-turquoise focus:outline-none" 
                   value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
            <input type="text" placeholder="Date (ex: Samedi 15 Juillet - 20h00)" className="p-2.5 rounded-xl border border-ocean/10 w-full focus:border-turquoise focus:outline-none" 
                   value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
            
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-ocean/60">Image de l'événement</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input type="text" placeholder="URL de l'image (Entrer l'URL ou uploader)" className="p-2.5 rounded-xl border border-ocean/10 flex-1 focus:border-turquoise focus:outline-none" 
                       value={formData.img || ''} onChange={e => setFormData({...formData, img: e.target.value})} />
                <label className={`cursor-pointer inline-flex items-center justify-center gap-2 bg-turquoise/20 text-turquoise-dark px-4 py-2.5 rounded-xl font-bold hover:bg-turquoise hover:text-ocean transition shrink-0 ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
                  {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                  Uploader
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            </div>

            <select className="p-2.5 rounded-xl border border-ocean/10 w-full bg-white md:col-span-2 focus:border-turquoise focus:outline-none"
                    value={formData.status || 'published'} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
            </select>
            <textarea placeholder="Description courte..." className="p-2.5 rounded-xl border border-ocean/10 w-full md:col-span-2 focus:border-turquoise focus:outline-none resize-none" rows={3}
                      value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
          </div>
        </div>
        
        <div className="p-4 border-t border-turquoise/20 flex justify-end gap-3 bg-white/50 backdrop-blur-sm">
          <button onClick={onCancel} className="px-5 py-2.5 rounded-xl font-bold text-ocean hover:bg-white transition">Annuler</button>
          <button onClick={onSave} className="flex items-center gap-2 bg-turquoise text-ocean px-8 py-2.5 rounded-xl font-bold hover:bg-gold transition shadow-lg shadow-turquoise/20"><CheckCircle2 size={18} /> Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
