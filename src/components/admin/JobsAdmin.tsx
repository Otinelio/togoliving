import { useState } from "react";
import { Plus, Trash2, Edit2, CheckCircle2, Briefcase } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import type { Job } from "@/data/defaultJobs";

export function JobsAdmin() {
  const { jobs, addJob, updateJob, removeJob } = useJobs();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Job>>({});

  const handleEdit = (job: Job) => {
    setEditingId(job.id);
    setFormData(job);
  };

  const handleSave = () => {
    if (editingId === "new") {
      addJob(formData as Omit<Job, "id">);
    } else if (editingId) {
      updateJob(editingId, formData);
    }
    setEditingId(null);
    setFormData({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
        <div>
          <h2 className="text-2xl font-display text-ocean">Gestion des Emplois</h2>
          <p className="text-muted-foreground text-sm mt-1">Gérez les offres d'emploi affichées sur la page Carrières.</p>
        </div>
        <button
          onClick={() => {
            setEditingId("new");
            setFormData({ status: "open", type: "CDI" });
          }}
          className="flex items-center gap-2 px-4 py-2 bg-turquoise text-ocean rounded-xl font-medium hover:bg-turquoise/80 transition"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Ajouter</span>
        </button>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-xl border border-ocean/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ocean">{job.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-medium mt-1">
                      <span className="bg-ocean/10 text-ocean px-2 py-0.5 rounded">{job.department}</span>
                      <span className="bg-turquoise/20 text-turquoise-dark px-2 py-0.5 rounded">{job.type}</span>
                    </div>
                    <p className="text-xs text-ocean/60 mt-1 line-clamp-1">{job.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${job.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {job.status === 'open' ? 'Ouvert' : 'Fermé'}
                  </span>
                  <button onClick={() => handleEdit(job)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 size={18} /></button>
                  <button onClick={() => removeJob(job.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                </div>
              </>
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-ocean/20">
            <p className="text-muted-foreground">Aucune offre d'emploi.</p>
          </div>
        )}
      </div>

      {editingId && (
        <JobEditor 
          formData={formData} 
          setFormData={setFormData} 
          onSave={handleSave} 
          onCancel={() => setEditingId(null)} 
        />
      )}
    </div>
  );
}

import { X } from "lucide-react";

function JobEditor({ formData, setFormData, onSave, onCancel }: { formData: Partial<Job>, setFormData: any, onSave: () => void, onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ocean/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={onCancel}>
      <div className="bg-sand w-full max-w-2xl rounded-3xl shadow-2xl relative border border-white/40 overflow-hidden flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-turquoise/20">
          <h2 className="font-display text-2xl text-ocean">Offre d'emploi</h2>
          <button onClick={onCancel} className="p-2 rounded-full hover:bg-white text-ocean transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Titre du poste" className="p-2.5 rounded-xl border border-ocean/10 w-full focus:border-turquoise focus:outline-none" 
                   value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
            <input type="text" placeholder="Département (ex: Accueil, Restauration)" className="p-2.5 rounded-xl border border-ocean/10 w-full focus:border-turquoise focus:outline-none" 
                   value={formData.department || ''} onChange={e => setFormData({...formData, department: e.target.value})} />
            <select className="p-2.5 rounded-xl border border-ocean/10 w-full bg-white focus:border-turquoise focus:outline-none"
                    value={formData.type || 'CDI'} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Freelance">Freelance</option>
            </select>
            <select className="p-2.5 rounded-xl border border-ocean/10 w-full bg-white focus:border-turquoise focus:outline-none"
                    value={formData.status || 'open'} onChange={e => setFormData({...formData, status: e.target.value})}>
              <option value="open">Ouvert</option>
              <option value="closed">Fermé</option>
            </select>
            <textarea placeholder="Description de l'offre..." className="p-2.5 rounded-xl border border-ocean/10 w-full md:col-span-2 focus:border-turquoise focus:outline-none resize-none" rows={5}
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
