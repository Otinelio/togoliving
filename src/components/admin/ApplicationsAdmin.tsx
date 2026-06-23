import { useApplications } from "@/hooks/useApplications";
import { Mail, Phone, Clock, CheckCircle2, XCircle, Trash2, User, FileText } from "lucide-react";

export function ApplicationsAdmin() {
  const { applications, isLoading, updateStatus, removeApplication } = useApplications();

  if (isLoading) return <div className="text-center p-8 text-muted-foreground">Chargement...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-ocean/5">
        <h2 className="text-2xl font-display text-ocean">Candidatures</h2>
        <p className="text-muted-foreground text-sm mt-1">Gérez les postulations reçues via le site web.</p>
      </div>

      <div className="grid gap-4">
        {applications.map((app) => (
          <div key={app.id} className="bg-white p-5 rounded-xl border border-ocean/10 shadow-sm flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-ocean flex items-center gap-2">
                  <User size={18} className="text-turquoise" /> {app.applicantName}
                </h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                  app.status === 'reviewed' ? 'bg-orange-100 text-orange-700' :
                  app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {app.status === 'new' ? 'Nouveau' : app.status === 'reviewed' ? 'En revue' : app.status === 'accepted' ? 'Accepté' : 'Refusé'}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-ocean/80 mb-4">
                <a href={`mailto:${app.applicantEmail}`} className="flex items-center gap-1 hover:text-turquoise"><Mail size={14}/> {app.applicantEmail}</a>
                <a href={`tel:${app.applicantPhone}`} className="flex items-center gap-1 hover:text-turquoise"><Phone size={14}/> {app.applicantPhone}</a>
                <span className="flex items-center gap-1 text-muted-foreground"><Clock size={14}/> {new Date(app.createdAt).toLocaleDateString()}</span>
                {app.resumeUrl && (
                  <span className="flex items-center gap-1 text-gold"><FileText size={14}/> CV: {app.resumeUrl}</span>
                )}
              </div>

              <div className="bg-sand/50 p-4 rounded-lg text-sm text-ocean/90 border border-ocean/5">
                <p className="font-medium mb-1">Message :</p>
                <p className="whitespace-pre-wrap">{app.message}</p>
              </div>
            </div>

            <div className="flex md:flex-col gap-2 shrink-0 md:w-40">
              <p className="text-xs text-muted-foreground mb-1 hidden md:block">Actions</p>
              <select 
                className="p-2 text-sm rounded-lg border border-ocean/10 bg-white"
                value={app.status}
                onChange={(e) => updateStatus(app.id, e.target.value as any)}
              >
                <option value="new">Nouveau</option>
                <option value="reviewed">En revue</option>
                <option value="accepted">Accepté</option>
                <option value="rejected">Refusé</option>
              </select>
              <button 
                onClick={() => removeApplication(app.id)}
                className="mt-auto p-2 text-red-600 hover:bg-red-50 rounded-lg flex items-center justify-center gap-2 text-sm transition"
              >
                <Trash2 size={16} /> <span className="hidden md:inline">Supprimer</span>
              </button>
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-ocean/20">
            <p className="text-muted-foreground">Aucune candidature pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
