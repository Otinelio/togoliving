import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/reserver")({
  head: () => ({
    meta: [
      { title: "Reserver votre Sejour | TOGOLIVING Lome, Togo" },
      { name: "description", content: "Reservez votre studio ou appartement vue mer a TOGOLIVING. Confirmation rapide via WhatsApp." },
      { property: "og:url", content: "/reserver" },
    ],
    links: [{ rel: "canonical", href: "/reserver" }],
  }),
  component: Page,
});

const steps = ["Hebergement", "Personnes", "Coordonnees", "Recapitulatif"];

function Page() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    type: "Studio", arrivee: "", depart: "",
    adultes: 2, enfants: 0, demandes: "",
    nom: "", tel: "", email: "", heure: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const send = () => {
    const msg = `Bonjour TOGOLIVING,\nNOUVELLE RESERVATION:\nHebergement: ${d.type}\nArrivee: ${d.arrivee} a ${d.heure}\nDepart: ${d.depart}\nAdultes: ${d.adultes} | Enfants: ${d.enfants}\nNom: ${d.nom}\nTel: ${d.tel}\nEmail: ${d.email}\nDemandes: ${d.demandes || "Aucune"}`;
    window.open(whatsappUrl(msg), "_blank");
  };

  return (
    <>
      <section className="relative pt-32 pb-16 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Reservation</p>
          <h1 className="font-display text-4xl md:text-5xl">Confirmez votre Sejour</h1>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex justify-between items-center mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition ${
                  i <= step ? "bg-turquoise text-ocean" : "bg-white border border-turquoise/30 text-muted-foreground"
                }`}>
                  {i < step ? <Check size={16} /> : i + 1}
                </div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-turquoise" : "bg-turquoise/20"}`} />}
              </div>
            ))}
          </div>

          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="glass p-7">
            <h2 className="font-display text-2xl text-ocean mb-5">{steps[step]}</h2>

            {step === 0 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm text-ocean">Type d'hebergement</span>
                  <select value={d.type} onChange={(e) => setD({ ...d, type: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30">
                    <option>Studio</option><option>Chambre Salon Standard 40m2</option><option>Chambre Salon Superieur 50m2</option>
                  </select>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block"><span className="text-sm text-ocean">Arrivee</span>
                    <input type="date" value={d.arrivee} onChange={(e) => setD({ ...d, arrivee: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" /></label>
                  <label className="block"><span className="text-sm text-ocean">Depart</span>
                    <input type="date" value={d.depart} onChange={(e) => setD({ ...d, depart: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" /></label>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <label className="block"><span className="text-sm text-ocean">Adultes</span>
                    <select value={d.adultes} onChange={(e) => setD({ ...d, adultes: +e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30">{[1,2,3,4].map(n=><option key={n}>{n}</option>)}</select></label>
                  <label className="block"><span className="text-sm text-ocean">Enfants</span>
                    <select value={d.enfants} onChange={(e) => setD({ ...d, enfants: +e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30">{[0,1,2,3,4].map(n=><option key={n}>{n}</option>)}</select></label>
                </div>
                <label className="block"><span className="text-sm text-ocean">Demandes speciales</span>
                  <textarea rows={3} value={d.demandes} onChange={(e) => setD({ ...d, demandes: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" /></label>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <label className="block"><span className="text-sm text-ocean">Nom complet</span>
                  <input value={d.nom} onChange={(e) => setD({ ...d, nom: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" /></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block"><span className="text-sm text-ocean">Telephone</span>
                    <input value={d.tel} onChange={(e) => setD({ ...d, tel: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" /></label>
                  <label className="block"><span className="text-sm text-ocean">Heure d'arrivee</span>
                    <input type="time" value={d.heure} onChange={(e) => setD({ ...d, heure: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" /></label>
                </div>
                <label className="block"><span className="text-sm text-ocean">Email</span>
                  <input type="email" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })} className="mt-1 w-full bg-white rounded-lg px-3 py-2.5 border border-turquoise/30" /></label>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-2 text-ocean">
                <p><strong>Hebergement:</strong> {d.type}</p>
                <p><strong>Arrivee:</strong> {d.arrivee || "—"} a {d.heure || "—"}</p>
                <p><strong>Depart:</strong> {d.depart || "—"}</p>
                <p><strong>Personnes:</strong> {d.adultes} adultes, {d.enfants} enfants</p>
                <p><strong>Nom:</strong> {d.nom}</p>
                <p><strong>Tel:</strong> {d.tel}</p>
                <p><strong>Email:</strong> {d.email}</p>
                {d.demandes && <p><strong>Demandes:</strong> {d.demandes}</p>}
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 0 ? (
                <button onClick={back} className="inline-flex items-center gap-1 px-4 py-2 rounded-lg border border-ocean/30 text-ocean hover:bg-white">
                  <ChevronLeft size={16} /> Retour
                </button>
              ) : <span />}
              {step < steps.length - 1 ? (
                <button onClick={next} className="inline-flex items-center gap-1 px-5 py-2.5 rounded-lg bg-ocean text-white hover:bg-gold hover:text-ocean transition">
                  Suivant <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={send} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-turquoise text-ocean font-medium hover:bg-gold transition shimmer-gold">
                  <MessageCircle size={18} /> Confirmer via WhatsApp
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
