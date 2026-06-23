import { useState } from "react";
import { Plus, Trash2, Edit2, CheckCircle2, Calendar, Image as ImageIcon } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import type { AppEvent } from "@/data/defaultEvents";

export function EventsAdmin() {
  const { events, addEvent, updateEvent, removeEvent } = useEvents();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<AppEvent>>({});

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
        {editingId === "new" && (
          <EventEditor formData={formData} setFormData={setFormData} onSave={handleSave} onCancel={() => setEditingId(null)} />
        )}

        {events.map((evt) => (
          <div key={evt.id} className="bg-white p-4 rounded-xl border border-ocean/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {editingId === evt.id ? (
              <EventEditor formData={formData} setFormData={setFormData} onSave={handleSave} onCancel={() => setEditingId(null)} />
            ) : (
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
            )}
          </div>
        ))}
        {events.length === 0 && editingId !== "new" && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-ocean/20">
            <p className="text-muted-foreground">Aucun événement trouvé.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EventEditor({ formData, setFormData, onSave, onCancel }: { formData: Partial<AppEvent>, setFormData: any, onSave: () => void, onCancel: () => void }) {
  return (
    <div className="w-full bg-sand/30 p-4 rounded-xl border border-ocean/10 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Titre de l'événement" className="p-2 rounded-lg border border-ocean/10 w-full" 
               value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
        <input type="text" placeholder="Date (ex: Samedi 15 Juillet - 20h00)" className="p-2 rounded-lg border border-ocean/10 w-full" 
               value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} />
        <input type="text" placeholder="URL de l'image" className="p-2 rounded-lg border border-ocean/10 w-full" 
               value={formData.img || ''} onChange={e => setFormData({...formData, img: e.target.value})} />
        <select className="p-2 rounded-lg border border-ocean/10 w-full bg-white"
                value={formData.status || 'published'} onChange={e => setFormData({...formData, status: e.target.value})}>
          <option value="published">Publié</option>
          <option value="draft">Brouillon</option>
        </select>
        <textarea placeholder="Description courte..." className="p-2 rounded-lg border border-ocean/10 w-full md:col-span-2" rows={2}
                  value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 text-sm text-ocean hover:bg-ocean/5 rounded-lg transition">Annuler</button>
        <button onClick={onSave} className="px-4 py-2 text-sm bg-ocean text-white rounded-lg hover:bg-ocean/90 transition flex items-center gap-2"><CheckCircle2 size={16} /> Enregistrer</button>
      </div>
    </div>
  );
}
