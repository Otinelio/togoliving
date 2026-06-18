import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Check, ChevronLeft, ChevronRight, MessageCircle,
  BedDouble, Users, User, Calendar, Phone, Mail, Clock, FileText, Home,
  Sofa, Building, Crown, Moon, Wallet
} from "lucide-react";
import { WaveDivider } from "@/components/WaveDivider";
import { whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/reserver")({
  head: () => ({
    meta: [
      { title: "Réserver votre Séjour | TOGOLIVING Lomé, Togo" },
      { name: "description", content: "Réservez votre studio ou appartement vue mer à TOGOLIVING. Confirmation rapide via WhatsApp." },
      { property: "og:url", content: "/reserver" },
    ],
    links: [{ rel: "canonical", href: "/reserver" }],
  }),
  component: Page,
});

// ─── Grille tarifaire officielle (details.md) ───────────────────────────────
const ROOM_DATA = [
  {
    category: "Studios",
    badge: "1 Pièce",
    icon: Home,
    desc: "Espace confortable, ventilé et climatisé, idéal pour un séjour solo ou en couple.",
    variants: [
      { name: "Studio Standard", rooms: ["4", "5", "6", "7"], day: 30000, month: 300000 },
      { name: "Studio Pro",      rooms: ["34"],               day: 35000, month: 350000 },
    ],
  },
  {
    category: "1 Chambre Salon",
    badge: "2 Pièces",
    icon: Sofa,
    desc: "Grand salon avec espace de vie, idéal pour des séjours prolongés.",
    variants: [
      { name: "Chambre Salon Standard", rooms: ["8", "9", "20"], day: 40000, month: 420000 },
      { name: "Chambre Salon Confort",  rooms: ["1", "56"],      day: 50000, month: 500000 },
    ],
  },
  {
    category: "2 Chambres Salon",
    badge: "3 Pièces",
    icon: Building,
    desc: "Appartement spacieux avec deux chambres et terrasse vue mer. Parfait pour les familles.",
    variants: [
      { name: "2 Chambres Salon Standard", rooms: ["2", "3"], day: 80000,  month: 600000 },
      { name: "2 Chambres Salon Pro",      rooms: ["78"],     day: 100000, month: 700000 },
    ],
  },
  {
    category: "3 Chambres Salon",
    badge: "VIP · 4 Pièces",
    icon: Crown,
    desc: "Immense espace de vie avec trois chambres pour les grandes familles ou groupes.",
    variants: [
      { name: "3 Chambres Salon Standard", rooms: ["30"], day: 100000, month: 700000 },
      { name: "3 Chambres Salon Pro",      rooms: ["10"], day: 100000, month: 750000 },
    ],
  },
];

const STEPS = ["Hébergement", "Séjour & Occupants", "Coordonnées", "Récapitulatif"];

function formatF(n: number) {
  return n.toLocaleString("fr-FR") + " F";
}

function nights(from: string, to: string) {
  if (!from || !to) return 0;
  const d = (new Date(to).getTime() - new Date(from).getTime()) / 86400000;
  return d > 0 ? d : 0;
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex items-center mb-10">
      {STEPS.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              i < step  ? "bg-turquoise text-ocean shadow-md shadow-turquoise/30" :
              i === step ? "bg-ocean text-white shadow-md shadow-ocean/30 scale-110" :
                           "bg-white border-2 border-turquoise/20 text-muted-foreground"
            }`}>
              {i < step ? <Check size={15} /> : i + 1}
            </div>
            <span className={`text-[10px] mt-1 font-medium whitespace-nowrap hidden sm:block ${i === step ? "text-ocean" : "text-muted-foreground"}`}>
              {s}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 rounded transition-colors ${i < step ? "bg-turquoise" : "bg-turquoise/15"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Page() {
  // Lire les paramètres URL passés depuis /hebergements
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const initCat = Math.min(parseInt(params.get("cat") ?? "0") || 0, ROOM_DATA.length - 1);
  const initVar = Math.min(parseInt(params.get("var") ?? "0") || 0, ROOM_DATA[initCat].variants.length - 1);
  const initRoom = params.get("room") ?? "";
  const hasPreset = params.has("cat");

  const [step, setStep] = useState(hasPreset ? 1 : 0);
  const [d, setD] = useState({
    categoryIdx: initCat,
    variantIdx: initVar,
    roomNum: initRoom,
    arrivee: "",
    depart: "",
    adultes: 2,
    enfants: 0,
    dureeType: "nuit" as "nuit" | "mois",
    demandes: "",
    nom: "",
    tel: "",
    email: "",
    heure: "14:00",
  });

  const cat = ROOM_DATA[d.categoryIdx];
  const variant = cat.variants[d.variantIdx];
  const nbNuits = nights(d.arrivee, d.depart);
  const estimPrice = d.dureeType === "mois"
    ? variant.month
    : nbNuits > 0 ? variant.day * nbNuits : variant.day;
  const priceLabel = d.dureeType === "mois"
    ? `${formatF(variant.month)} / mois`
    : nbNuits > 0 ? `${formatF(variant.day * nbNuits)} (${nbNuits} nuit${nbNuits > 1 ? "s" : ""})`
      : `${formatF(variant.day)} / nuit`;

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const send = () => {
    const roomInfo = d.roomNum ? `Chambre N° ${d.roomNum}` : `Une chambre disponible de la catégorie ${variant.name}`;
    const msg = [
      "Bonjour TOGOLIVING,",
      "═══ NOUVELLE DEMANDE DE RÉSERVATION ═══",
      "",
      `Hébergement : ${cat.category} — ${variant.name}`,
      `${roomInfo}`,
      `Tarif estimé : ${priceLabel}`,
      "",
      `Arrivée : ${d.arrivee || "À définir"} à ${d.heure}`,
      `Départ  : ${d.depart || "À définir"}`,
      nbNuits > 0 ? `Durée   : ${nbNuits} nuit${nbNuits > 1 ? "s" : ""}` : "",
      "",
      `Adultes : ${d.adultes}`,
      `Enfants : ${d.enfants}`,
      "",
      `Nom      : ${d.nom}`,
      `Tél      : ${d.tel}`,
      `Email    : ${d.email || "—"}`,
      d.demandes ? `\nDemandes spéciales : ${d.demandes}` : "",
      "",
      "Merci de confirmer la disponibilité.",
    ].filter(Boolean).join("\n");
    window.open(whatsappUrl(msg), "_blank");
  };

  return (
    <>
      <section className="relative pt-32 pb-16 bg-ocean text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/85 to-ocean" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Réservation</p>
          <h1 className="font-display text-4xl md:text-5xl">Confirmez votre Séjour</h1>
          <p className="text-white/70 mt-3 text-sm">Confirmation rapide via WhatsApp · Pas de paiement en ligne</p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-14 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <StepIndicator step={step} />

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="glass p-6 sm:p-8 shadow-xl shadow-ocean/10"
          >
            <h2 className="font-display text-2xl text-ocean mb-6 flex items-center gap-2">
              {step === 0 && <><BedDouble size={22} className="text-turquoise" /> Choisir l'hébergement</>}
              {step === 1 && <><Calendar size={22} className="text-turquoise" /> Dates & Occupants</>}
              {step === 2 && <><User size={22} className="text-turquoise" /> Vos coordonnées</>}
              {step === 3 && <><FileText size={22} className="text-turquoise" /> Récapitulatif</>}
            </h2>

            {/* ── STEP 0 : Hébergement ── */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <span className="text-sm font-semibold text-ocean mb-2 block">Type d'appartement</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ROOM_DATA.map((r, i) => (
                      <button
                        key={r.category}
                        onClick={() => setD({ ...d, categoryIdx: i, variantIdx: 0, roomNum: "" })}
                        className={`text-left p-4 rounded-2xl border-2 transition-all ${
                          d.categoryIdx === i
                            ? "border-ocean bg-ocean/5 shadow-md"
                            : "border-turquoise/20 bg-white hover:border-turquoise/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xl text-turquoise"><r.icon size={22} /></span>
                          <span className={`font-display text-base ${d.categoryIdx === i ? "text-ocean" : "text-ocean/80"}`}>{r.category}</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.categoryIdx === i ? "bg-turquoise/20 text-ocean" : "bg-turquoise/10 text-ocean/60"}`}>
                          {r.badge}
                        </span>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{r.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-semibold text-ocean mb-2 block">Catégorie de chambre</span>
                  <div className="space-y-2">
                    {cat.variants.map((v, i) => (
                      <button
                        key={v.name}
                        onClick={() => setD({ ...d, variantIdx: i, roomNum: "" })}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                          d.variantIdx === i
                            ? "border-ocean bg-ocean/5"
                            : "border-turquoise/20 bg-white hover:border-turquoise/50"
                        }`}
                      >
                        <div>
                          <div className={`font-medium text-sm ${d.variantIdx === i ? "text-ocean" : "text-ocean/80"}`}>{v.name}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Chambres disponibles : N° {v.rooms.join(", ")}</div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <div className="font-bold text-ocean text-sm">{formatF(v.day)}<span className="text-xs font-normal text-muted-foreground">/nuit</span></div>
                          <div className="text-xs text-muted-foreground">{formatF(v.month)}/mois</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-sm font-semibold text-ocean mb-2 block">Chambre souhaitée <span className="font-normal text-muted-foreground">(optionnel)</span></span>
                  <select
                    value={d.roomNum}
                    onChange={(e) => setD({ ...d, roomNum: e.target.value })}
                    className="w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean focus:outline-none focus:border-turquoise text-sm"
                  >
                    <option value="">Pas de préférence</option>
                    {variant.rooms.map((r) => (
                      <option key={r} value={r}>Chambre N° {r}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* ── STEP 1 : Séjour & Occupants ── */}
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <span className="text-sm font-semibold text-ocean mb-2 block">Type de séjour</span>
                  <div className="grid grid-cols-2 gap-3">
                    {(["nuit", "mois"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setD({ ...d, dureeType: t })}
                        className={`py-3 rounded-xl text-sm font-medium border-2 transition flex items-center justify-center gap-2 ${
                          d.dureeType === t ? "border-ocean bg-ocean text-white" : "border-turquoise/20 bg-white text-ocean hover:border-turquoise"
                        }`}
                      >
                        {t === "nuit" ? <><Moon size={16} /> À la nuit</> : <><Calendar size={16} /> Au mois</>}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-ocean font-medium flex items-center gap-1"><Calendar size={13} /> Arrivée</span>
                    <input type="date" value={d.arrivee} onChange={(e) => setD({ ...d, arrivee: e.target.value })}
                      className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean focus:outline-none focus:border-turquoise text-sm" />
                  </label>
                  <label className="block">
                    <span className="text-sm text-ocean font-medium flex items-center gap-1"><Calendar size={13} /> Départ</span>
                    <input type="date" value={d.depart} onChange={(e) => setD({ ...d, depart: e.target.value })}
                      className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean focus:outline-none focus:border-turquoise text-sm" />
                  </label>
                </div>

                {nbNuits > 0 && (
                  <div className="flex items-center justify-between rounded-xl bg-turquoise/10 border border-turquoise/25 px-4 py-3">
                    <span className="text-sm text-ocean font-medium">Durée estimée</span>
                    <span className="font-bold text-ocean">{nbNuits} nuit{nbNuits > 1 ? "s" : ""}</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm text-ocean font-medium flex items-center gap-1"><Users size={13} /> Adultes</span>
                    <select value={d.adultes} onChange={(e) => setD({ ...d, adultes: +e.target.value })}
                      className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean focus:outline-none focus:border-turquoise text-sm">
                      {[1,2,3,4,5,6].map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-sm text-ocean font-medium flex items-center gap-1"><Users size={13} /> Enfants</span>
                    <select value={d.enfants} onChange={(e) => setD({ ...d, enfants: +e.target.value })}
                      className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean focus:outline-none focus:border-turquoise text-sm">
                      {[0,1,2,3,4].map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm text-ocean font-medium flex items-center gap-1"><FileText size={13} /> Demandes spéciales</span>
                  <textarea rows={3} value={d.demandes} onChange={(e) => setD({ ...d, demandes: e.target.value })}
                    placeholder="Vue mer souhaitée, lit bébé, transfert aéroport..."
                    className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean placeholder:text-ocean/30 focus:outline-none focus:border-turquoise text-sm" />
                </label>

                {/* Prix estimé */}
                <div className="rounded-xl bg-gold/10 border border-gold/30 px-4 py-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-ocean">Tarif estimé</span>
                  <span className="font-bold text-ocean">{priceLabel}</span>
                </div>
              </div>
            )}

            {/* ── STEP 2 : Coordonnées ── */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm text-ocean font-medium flex items-center gap-1"><User size={13} /> Nom complet *</span>
                  <input value={d.nom} onChange={(e) => setD({ ...d, nom: e.target.value })}
                    placeholder="Prénom et Nom"
                    className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean placeholder:text-ocean/30 focus:outline-none focus:border-turquoise text-sm" />
                </label>
                <label className="block">
                  <span className="text-sm text-ocean font-medium flex items-center gap-1"><Phone size={13} /> Téléphone / WhatsApp *</span>
                  <input type="tel" value={d.tel} onChange={(e) => setD({ ...d, tel: e.target.value })}
                    placeholder="+228 XX XX XX XX"
                    className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean placeholder:text-ocean/30 focus:outline-none focus:border-turquoise text-sm" />
                </label>
                <label className="block">
                  <span className="text-sm text-ocean font-medium flex items-center gap-1"><Mail size={13} /> Email <span className="text-muted-foreground font-normal">(optionnel)</span></span>
                  <input type="email" value={d.email} onChange={(e) => setD({ ...d, email: e.target.value })}
                    placeholder="votre@email.com"
                    className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean placeholder:text-ocean/30 focus:outline-none focus:border-turquoise text-sm" />
                </label>
                <label className="block">
                  <span className="text-sm text-ocean font-medium flex items-center gap-1"><Clock size={13} /> Heure d'arrivée prévue</span>
                  <input type="time" value={d.heure} onChange={(e) => setD({ ...d, heure: e.target.value })}
                    className="mt-1 w-full bg-white rounded-xl px-3 py-2.5 border-2 border-turquoise/20 text-ocean focus:outline-none focus:border-turquoise text-sm" />
                </label>
              </div>
            )}

            {/* ── STEP 3 : Récapitulatif ── */}
            {step === 3 && (
              <div className="space-y-4 text-ocean">
                {/* Hébergement */}
                <div className="rounded-2xl bg-ocean text-white p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Home size={18} className="text-turquoise" />
                    <span className="font-display text-lg">Hébergement choisi</span>
                  </div>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between"><span className="text-white/70">Type</span><span className="font-medium">{cat.category} — {cat.badge}</span></div>
                    <div className="flex justify-between"><span className="text-white/70">Catégorie</span><span className="font-medium">{variant.name}</span></div>
                    <div className="flex justify-between"><span className="text-white/70">Chambre</span><span className="font-medium">{d.roomNum ? `N° ${d.roomNum}` : "Pas de préférence"}</span></div>
                  </div>
                </div>

                {/* Séjour */}
                <div className="rounded-2xl border-2 border-turquoise/20 p-5 space-y-1.5 text-sm">
                  <div className="font-display text-base text-ocean mb-3 flex items-center gap-2"><Calendar size={16} className="text-turquoise" /> Séjour</div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Arrivée</span><span className="font-medium">{d.arrivee || "—"} à {d.heure}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Départ</span><span className="font-medium">{d.depart || "—"}</span></div>
                  {nbNuits > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Durée</span><span className="font-medium">{nbNuits} nuit{nbNuits > 1 ? "s" : ""}</span></div>}
                  <div className="flex justify-between"><span className="text-muted-foreground">Occupants</span><span className="font-medium">{d.adultes} adulte{d.adultes > 1 ? "s" : ""}{d.enfants > 0 ? ` + ${d.enfants} enfant${d.enfants > 1 ? "s" : ""}` : ""}</span></div>
                </div>

                {/* Coordonnées */}
                <div className="rounded-2xl border-2 border-turquoise/20 p-5 space-y-1.5 text-sm">
                  <div className="font-display text-base text-ocean mb-3 flex items-center gap-2"><User size={16} className="text-turquoise" /> Coordonnées</div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Nom</span><span className="font-medium">{d.nom || "—"}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tél.</span><span className="font-medium">{d.tel || "—"}</span></div>
                  {d.email && <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{d.email}</span></div>}
                  {d.demandes && <div className="flex flex-col gap-1"><span className="text-muted-foreground">Demandes</span><span className="font-medium text-xs bg-turquoise/10 rounded-lg px-3 py-2">{d.demandes}</span></div>}
                </div>

                {/* Tarif */}
                <div className="rounded-2xl bg-gold/10 border-2 border-gold/30 px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Tarif estimé</div>
                    <div className="font-display text-xl text-ocean mt-0.5">{priceLabel}</div>
                  </div>
                  <Wallet size={26} className="text-gold" />
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  En cliquant sur confirmer, vous serez redirigé vers WhatsApp pour finaliser votre réservation avec l'équipe TOGOLIVING.
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-turquoise/15">
              {step > 0 ? (
                <button onClick={back} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border-2 border-ocean/20 text-ocean hover:bg-white transition text-sm font-medium">
                  <ChevronLeft size={16} /> Retour
                </button>
              ) : <span />}

              {step < STEPS.length - 1 ? (
                <button onClick={next} className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-ocean text-white hover:bg-gold hover:text-ocean transition text-sm font-medium shadow-md shadow-ocean/20">
                  Suivant <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={send}
                  disabled={!d.nom || !d.tel}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-turquoise text-ocean font-semibold hover:bg-gold transition shimmer-gold shadow-lg shadow-turquoise/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
