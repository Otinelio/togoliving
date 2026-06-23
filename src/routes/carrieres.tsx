import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, CheckCircle2, Send, Users, TrendingUp, HeartHandshake, X } from "lucide-react";
import { useState } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { ASSETS } from "@/lib/assets";
import { useJobs } from "@/hooks/useJobs";
import { useApplications } from "@/hooks/useApplications";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/carrieres")({
  head: () => ({
    meta: [
      { title: "Carrières & Emplois — TOGOLIVING Residence Balneaire" },
      { name: "description", content: "Rejoignez l'équipe TOGOLIVING. Découvrez nos offres d'emploi, nos valeurs et postulez pour faire carrière dans l'hôtellerie de luxe au Togo." },
      { property: "og:url", content: "/carrieres" },
    ],
    links: [{ rel: "canonical", href: "/carrieres" }],
  }),
  component: CarrieresPage,
});

function CarrieresPage() {
  const { jobs } = useJobs();
  const { addApplication } = useApplications();
  const openJobs = jobs.filter(j => j.status === "open");

  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // Soumission finale
    if (!selectedJob) return;
    setIsSubmitting(true);

    let uploadedResumeUrl = "";
    if (cvFile) {
      try {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from("media").upload(`resumes/${fileName}`, cvFile);
        
        if (!uploadError) {
          const { data } = supabase.storage.from("media").getPublicUrl(`resumes/${fileName}`);
          uploadedResumeUrl = data.publicUrl;
        } else {
          console.error("Error uploading CV:", uploadError);
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    }

    addApplication({
      jobId: selectedJob,
      applicantName: formData.name,
      applicantEmail: formData.email,
      applicantPhone: formData.phone,
      message: formData.message,
      resumeUrl: uploadedResumeUrl || (cvFile ? cvFile.name : ""),
    });
    setSubmitted(true);
    setIsSubmitting(false);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setStep(1);
      setCvFile(null);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  const closeForm = () => {
    setSelectedJob(null);
    setStep(1);
    setSubmitted(false);
    setCvFile(null);
  };

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${ASSETS.poolImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/95 via-ocean/80 to-ocean" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Recrutement</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">Rejoignez l'Aventure</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Faites carrière au sein d'une équipe passionnée par l'excellence et l'hospitalité. Découvrez nos opportunités et grandissez avec nous.
          </p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <p className="font-accent text-turquoise text-xl">Pourquoi TOGOLIVING ?</p>
          <h2 className="font-display text-4xl text-ocean">Notre Philosophie Employeur</h2>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { icon: HeartHandshake, title: "Esprit de Famille", desc: "Nous cultivons un environnement de travail bienveillant où le respect mutuel et l'entraide sont primordiaux." },
            { icon: TrendingUp, title: "Évolution Rapide", desc: "Nous privilégions la promotion interne et l'accompagnement de nos talents vers des postes à responsabilité." },
            { icon: Users, title: "Excellence & Formation", desc: "Nous offrons des formations continues pour maintenir nos standards élevés dans l'hôtellerie de luxe." },
          ].map((val, i) => (
            <motion.div key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-ocean/5 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-turquoise/15 text-turquoise flex items-center justify-center mb-5">
                <val.icon size={26} />
              </div>
              <h3 className="font-display text-2xl text-ocean mb-3">{val.title}</h3>
              <p className="text-muted-foreground">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <WaveDivider color="#1E3A5F" bgClass="bg-sand" />

      <section className="bg-ocean text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="font-accent text-turquoise text-xl">Opportunités Actuelles</p>
              <h2 className="font-display text-4xl">Postes à Pourvoir</h2>
            </div>
            <button onClick={() => setSelectedJob("spontaneous")} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-ocean font-medium shimmer-gold transition hover:scale-105">
              <Send size={18} /> Candidature Spontanée
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {openJobs.length === 0 ? (
              <div className="col-span-2 text-center py-10 text-white/60">
                Aucun poste n'est actuellement ouvert. N'hésitez pas à envoyer une candidature spontanée !
              </div>
            ) : (
              openJobs.map((job, i) => (
                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="glass-dark p-6 rounded-2xl hover:border-turquoise/50 transition flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-semibold px-3 py-1 bg-turquoise/20 text-turquoise rounded-full">{job.department}</span>
                    <span className="text-xs font-semibold px-3 py-1 bg-white/10 text-white rounded-full">{job.type}</span>
                  </div>
                  <h3 className="font-display text-2xl mb-2">{job.title}</h3>
                  <p className="text-white/70 text-sm mb-6 flex-1 whitespace-pre-wrap">{job.description}</p>
                  <button onClick={() => setSelectedJob(job.id)}
                    className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 rounded-lg border border-turquoise text-turquoise hover:bg-turquoise hover:text-ocean transition text-sm font-medium">
                    Postuler <Briefcase size={16} />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl text-ocean mb-8">Processus de Recrutement</h2>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {[
              "Envoi du CV & Lettre",
              "Entretien Téléphonique",
              "Entretien Physique",
              "Intégration",
            ].map((step, idx, arr) => (
              <div key={idx} className="flex flex-col items-center relative w-full">
                <div className="w-12 h-12 rounded-full bg-ocean text-white flex items-center justify-center font-display text-xl z-10">
                  {idx + 1}
                </div>
                <p className="mt-3 font-medium text-ocean text-sm">{step}</p>
                {idx < arr.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-full h-0.5 bg-ocean/20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Modal - Centered Multi-step Form */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ocean/90 backdrop-blur-sm flex items-center justify-center p-4">
            
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full relative">
              
              {/* Header */}
              <div className="bg-sand px-8 py-6 flex items-center justify-between border-b border-ocean/5 relative">
                <div>
                  <h3 className="text-2xl font-display text-ocean">Postuler</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {selectedJob === "spontaneous" ? "Candidature Spontanée" : jobs.find(j => j.id === selectedJob)?.title}
                  </p>
                </div>
                <button onClick={closeForm} className="absolute top-6 right-6 p-2 text-ocean/50 hover:bg-ocean/10 hover:text-ocean rounded-full transition">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <CheckCircle2 size={72} className="text-green-500 mx-auto mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-display text-ocean mb-3">Candidature Envoyée !</h3>
                    <p className="text-muted-foreground">Nous avons bien reçu votre candidature. Notre équipe des ressources humaines reviendra vers vous très vite.</p>
                  </div>
                ) : (
                  <>
                    {/* Progress Steps */}
                    <div className="flex items-center justify-center mb-8">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-turquoise text-ocean' : 'bg-sand text-ocean/50'}`}>1</div>
                      <div className={`w-16 h-1 bg-sand mx-2 rounded overflow-hidden`}>
                        <div className={`h-full bg-turquoise transition-all duration-300 ${step >= 2 ? 'w-full' : 'w-0'}`} />
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-turquoise text-ocean' : 'bg-sand text-ocean/50'}`}>2</div>
                      <div className={`w-16 h-1 bg-sand mx-2 rounded overflow-hidden`}>
                        <div className={`h-full bg-turquoise transition-all duration-300 ${step >= 3 ? 'w-full' : 'w-0'}`} />
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-turquoise text-ocean' : 'bg-sand text-ocean/50'}`}>3</div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      {/* Step 1 : Informations personnelles */}
                      {step === 1 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                          <h4 className="font-semibold text-ocean mb-4">Informations Personnelles</h4>
                          <div>
                            <label className="block text-sm font-medium text-ocean mb-1.5">Nom Complet</label>
                            <input required type="text" className="w-full p-3 rounded-xl border border-ocean/10 bg-sand/30 focus:border-turquoise focus:ring-1 focus:ring-turquoise outline-none transition" 
                              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: Jean Dupont" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-ocean mb-1.5">Adresse Email</label>
                            <input required type="email" className="w-full p-3 rounded-xl border border-ocean/10 bg-sand/30 focus:border-turquoise focus:ring-1 focus:ring-turquoise outline-none transition"
                              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="jean.dupont@email.com" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-ocean mb-1.5">Numéro de Téléphone</label>
                            <input required type="tel" className="w-full p-3 rounded-xl border border-ocean/10 bg-sand/30 focus:border-turquoise focus:ring-1 focus:ring-turquoise outline-none transition"
                              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+228 XX XX XX XX" />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2 : Lettre de motivation */}
                      {step === 2 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                          <h4 className="font-semibold text-ocean mb-4">Message / Motivation</h4>
                          <div>
                            <label className="block text-sm font-medium text-ocean mb-1.5">Présentez-vous brièvement</label>
                            <textarea required rows={6} className="w-full p-3 rounded-xl border border-ocean/10 bg-sand/30 focus:border-turquoise focus:ring-1 focus:ring-turquoise outline-none transition resize-none"
                              placeholder="Quelles sont vos motivations pour rejoindre l'équipe TOGOLIVING ?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3 : Upload CV */}
                      {step === 3 && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                          <h4 className="font-semibold text-ocean mb-4">Curriculum Vitae (CV)</h4>
                          <div className="border-2 border-dashed border-turquoise/50 bg-turquoise/5 rounded-2xl p-8 text-center relative hover:bg-turquoise/10 transition">
                            <input 
                              type="file" 
                              accept=".pdf,application/pdf" 
                              required 
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                            />
                            {cvFile ? (
                              <div className="flex flex-col items-center text-ocean">
                                <CheckCircle2 className="text-green-500 mb-2" size={32} />
                                <span className="font-medium text-sm text-center">{cvFile.name}</span>
                                <span className="text-xs text-muted-foreground mt-1">{(cvFile.size / 1024 / 1024).toFixed(2)} MB</span>
                                <span className="text-xs text-turquoise underline mt-3">Cliquez pour changer de fichier</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center text-ocean/60">
                                <Send className="text-turquoise mb-3" size={32} />
                                <span className="font-medium">Cliquez ou glissez votre CV ici</span>
                                <span className="text-xs mt-2">Format accepté : PDF (Max 5MB)</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}

                      {/* Navigation Buttons */}
                      <div className="flex items-center justify-between pt-6 mt-6 border-t border-ocean/5">
                        {step > 1 ? (
                          <button type="button" onClick={() => setStep(step - 1)} className="px-5 py-2.5 rounded-xl border border-ocean/10 text-ocean font-medium hover:bg-sand transition">
                            Retour
                          </button>
                        ) : (
                          <div /> // Spacer
                        )}
                        <button type="submit" disabled={isSubmitting} className={`px-6 py-2.5 rounded-xl bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition flex items-center gap-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}>
                          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                          {step < 3 ? "Suivant" : "Confirmer l'envoi"}
                        </button>
                      </div>

                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

