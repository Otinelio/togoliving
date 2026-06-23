import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CalendarHeart, Users, PartyPopper, Briefcase, Camera, MessageCircle, Music, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { ASSETS } from "@/lib/assets";
import { useEvents } from "@/hooks/useEvents";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements & Réceptions — TOGOLIVING Residence Balneaire | Lome, Togo" },
      { name: "description", content: "Organisez vos mariages, séminaires, anniversaires et réceptions privées à TOGOLIVING. Cadre prestigieux avec vue mer et service traiteur." },
      { property: "og:url", content: "/evenements" },
    ],
    links: [{ rel: "canonical", href: "/evenements" }],
  }),
  component: EvenementsPage,
});

function EvenementsPage() {
  const { events } = useEvents();
  const publishedEvents = events.filter(e => e.status === "published");

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        {/* Placeholder image for events, using pool as fallback or hero */}
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${ASSETS.piscine1})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/90 via-ocean/80 to-ocean" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="font-accent text-turquoise text-xl">Réceptions & Célébrations</p>
          <h1 className="font-display text-5xl md:text-6xl mt-2">Événements Inoubliables</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Un cadre exceptionnel entre ciel, terre et océan pour faire de vos événements des moments gravés à jamais.
          </p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="font-display text-4xl text-ocean">Nos Espaces & Services</h2>
          <p className="text-ocean/70 mt-4 max-w-2xl mx-auto">
            Que ce soit pour un événement privé ou professionnel, la Résidence TOGOLIVING vous accompagne de la conception à la réalisation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: CalendarHeart, title: "Mariages & Noces", desc: "Le lieu idéal pour dire 'Oui' avec la mer en toile de fond. Réception, banquet et suite nuptiale." },
            { icon: Briefcase, title: "Séminaires & Retraites", desc: "Alliez travail et détente. Espaces modulables, connexion WiFi très haut débit (516 Mb/s) et pauses café." },
            { icon: PartyPopper, title: "Anniversaires", desc: "Fêtez vos moments spéciaux autour de la piscine ou dans notre restaurant avec un menu personnalisé." },
            { icon: Users, title: "Privatisations", desc: "Privatisez une partie ou l'ensemble de la résidence pour des événements exclusifs et VIP." },
          ].map((type, i) => (
            <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass p-8 text-center rounded-2xl hover-lift border border-ocean/5 bg-white">
              <div className="w-16 h-16 mx-auto rounded-full bg-gold/10 text-gold flex items-center justify-center mb-5">
                <type.icon size={28} />
              </div>
              <h3 className="font-display text-2xl text-ocean mb-3">{type.title}</h3>
              <p className="text-ocean/70 text-sm">{type.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 border-y border-ocean/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-accent text-turquoise text-xl">À ne pas manquer</p>
            <h2 className="font-display text-4xl text-ocean">Agenda & Soirées TOGOLIVING</h2>
            <p className="text-ocean/70 mt-4 max-w-2xl mx-auto">
              Découvrez nos événements à venir : Soirées DJ, soirées à thème, concerts live et animations autour de la piscine.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {publishedEvents.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-ocean/60">
                Aucun événement prévu pour le moment. Restez connectés !
              </div>
            ) : (
              publishedEvents.map((evt, i) => (
                <EventCard key={evt.id} evt={evt} index={i} />
              ))
            )}
          </div>
        </div>
      </section>


      <section className="py-20 bg-ocean text-white relative">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-accent text-turquoise text-xl">Service Traiteur</p>
            <h2 className="font-display text-4xl mb-6">Une Gastronomie d'Exception pour vos Invités</h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Le restaurant Living's met à votre disposition son savoir-faire culinaire pour élaborer des menus sur-mesure : cuisine africaine raffinée, spécialités françaises ou buffets internationaux.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-turquoise" /> Buffets chauds et froids</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-turquoise" /> Cocktails dînatoires et vin d'honneur</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-turquoise" /> Gâteaux sur commande (mariages, anniversaires)</li>
              <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-turquoise" /> Service en salle ou autour de la piscine</li>
            </ul>
            <Link to="/restaurant" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-turquoise text-turquoise hover:bg-turquoise hover:text-ocean transition">
              Découvrir la carte du restaurant
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            <img src={ASSETS.bar60DBC} alt="Bar et Cocktails" className="rounded-xl w-full h-48 object-cover" />
            <img src={ASSETS.barIMG2449} alt="Service Traiteur" className="rounded-xl w-full h-48 object-cover mt-8" />
          </motion.div>
        </div>
      </section>

      <WaveDivider color="#F8F5F0" bgClass="bg-ocean" />

      <section className="bg-sand py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Music className="mx-auto text-turquoise mb-4" size={40} />
          <h2 className="font-display text-4xl text-ocean mb-4">Prêt à organiser votre événement ?</h2>
          <p className="text-ocean/80 text-lg mb-8">
            Contactez notre équipe événementielle pour discuter de votre projet, organiser une visite des lieux et obtenir un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/22893872088?text=Bonjour,%20je%20souhaite%20avoir%20des%20informations%20pour%20organiser%20un%20%C3%A9v%C3%A9nement%20%C3%A0%20TOGOLIVING." target="_blank" rel="noreferrer" 
               className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition shimmer-gold text-lg">
              <MessageCircle size={20} /> Parler à un conseiller
            </a>
            <Link to="/contact" className="inline-flex justify-center items-center px-8 py-4 rounded-full border-2 border-ocean text-ocean font-medium hover:bg-ocean hover:text-white transition text-lg">
              Voir la page Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function EventCard({ evt, index }: { evt: any, index: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaList = [evt.img, ...(evt.images || [])].filter(Boolean);
  const videosList = (evt.videoUrls || []).filter(Boolean);
  const hasMultipleMedia = mediaList.length + videosList.length > 1;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
      className="bg-sand rounded-2xl shadow-sm border border-ocean/5 overflow-hidden flex flex-col group relative">
      
      {/* Gallery Section */}
      <div className="h-56 w-full relative overflow-hidden bg-ocean/20">
        <div ref={scrollRef} className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide no-scrollbar">
          
          {/* Main Thumbnail & Additional Images */}
          {mediaList.map((src, idx) => (
            <div key={`img-${idx}`} className="w-full h-full flex-shrink-0 snap-center relative">
              <img src={src} alt={`${evt.title} ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}

          {/* Videos */}
          {videosList.map((vid: string, idx: number) => (
            <div key={`vid-${idx}`} className="w-full h-full flex-shrink-0 snap-center relative bg-black flex items-center justify-center">
              <video src={vid} controls playsInline className="w-full h-full object-cover" />
            </div>
          ))}

          {/* Fallback if no media */}
          {mediaList.length === 0 && videosList.length === 0 && (
            <div className="w-full h-full flex items-center justify-center bg-ocean/10">
              <Camera className="text-ocean/30" size={40} />
            </div>
          )}
        </div>

        {/* Badge À venir */}
        <div className="absolute top-4 right-4 bg-ocean text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">À venir</div>

        {/* Scroll Controls */}
        {hasMultipleMedia && (
          <>
            <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition z-10 opacity-0 group-hover:opacity-100">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition z-10 opacity-0 group-hover:opacity-100">
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium z-10 flex items-center gap-1">
              <Camera size={10} /> {mediaList.length + videosList.length}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="text-turquoise text-sm font-semibold mb-2">{evt.date}</div>
        <h3 className="font-display text-2xl text-ocean mb-3">{evt.title}</h3>
        <p className="text-muted-foreground flex-1 mb-6 text-sm whitespace-pre-wrap">{evt.description}</p>
        <a href={`https://wa.me/22893872088?text=Bonjour,%20je%20souhaite%20r%C3%A9server%20des%20places%20pour%20l'%C3%A9v%C3%A9nement%20:%20${encodeURIComponent(evt.title)}`} target="_blank" rel="noreferrer"
          className="w-full text-center px-4 py-2.5 rounded-lg border border-turquoise text-ocean hover:bg-turquoise hover:text-white transition font-medium text-sm">
          Réserver ma place
        </a>
      </div>
    </motion.div>
  );
}
