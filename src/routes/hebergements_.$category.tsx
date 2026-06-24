import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wifi, Wind, Tv, Coffee, Car, Plane, Waves, Droplets, GlassWater,
  UtensilsCrossed, BedDouble, ChevronLeft, ChevronRight, Calendar, ChevronDown, ChevronUp, MapPin,
  Zap, Microwave, ChefHat, Shirt, Sofa, Bell, Flame, CigaretteOff, ShieldAlert, Baby, Home, 
  Orbit, Refrigerator
} from "lucide-react";
import { useAccommodations } from "@/hooks/useAccommodations";
import { useRooms } from "@/hooks/useRooms";
import { type Room } from "@/data/defaultRooms";
import { WaveDivider } from "@/components/WaveDivider";
import { OptimizedImage } from "@/components/OptimizedImage";

// Icon map for features
const ICON_MAP: Record<string, any> = {
  "Wi-Fi Gratuit": Wifi,
  "Climatisation": Wind,
  "TV Canal+ / Satellite": Tv,
  "TV Satellite": Tv,
  "Télévision": Tv,
  "Télévision à écran plat": Tv,
  "Réfrigérateur": Droplets, // approximate
  "Patio privé": Waves,
  "Patio": Waves,
  "Table à manger": UtensilsCrossed,
  "Canapé": Sofa,
  "Coin salon": Sofa,
  "Terrasse vue mer": Waves,
  "Terrasse": Waves,
  "Literie premium": BedDouble,
  "Grande Terrasse": Waves,
  "Lits King Size": BedDouble,
  "Salle à manger": UtensilsCrossed,
  "Prise près du lit": Zap,
  "Micro-ondes": Microwave,
  "Kitchenette privative": ChefHat,
  "Cuisine privative": ChefHat,
  "Plateau / bouilloire": Coffee,
  "Bouilloire électrique": Coffee,
  "Fer à repasser": Shirt,
  "Service de réveil / réveil": Bell,
  "Service de réveil": Bell,
  "Plaque de cuisson": Flame,
  "Fumeurs: non-fumeurs": CigaretteOff,
  "Climatiseur indépendant dans les hébergements": Wind,
  "Détecteur de monoxyde de carbone": ShieldAlert,
  "Barrières de sécurité pour bébés": Baby,
  "Indépendant": Home,
  "Sol carrelé / en marbre": MapPin,
  "Linge de maison": BedDouble,
  "Très grands lits (> 2 mètres de long)": BedDouble,
  "Coin repas": UtensilsCrossed,
  "Ustensiles de cuisine": UtensilsCrossed,
  "Machine à café": Coffee,
  "Ventilateur": Wind
};

export const Route = createFileRoute("/hebergements_/$category")({
  component: CategoryDetailsPage,
});

function CategoryDetailsPage() {
  const { t } = useTranslation();
  const { category } = Route.useParams();
  const { items: categories, isLoading: isLoadingCats } = useAccommodations();
  const { rooms, isLoading: isLoadingRooms } = useRooms();

  if (isLoadingCats || isLoadingRooms) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sand">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ocean"></div>
      </div>
    );
  }

  // Find the exact category from the URL slug
  const matchedCategory = categories.find(
    (c) => c.title.toLowerCase().replace(/ /g, "-") === category
  );

  if (!matchedCategory) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-sand text-ocean text-center px-4">
        <h1 className="font-display text-4xl mb-4">{t("accommodations.category.not_found")}</h1>
        <Link to="/hebergements" className="text-turquoise underline">{t("accommodations.category.back_link")}</Link>
      </div>
    );
  }

  // Filter individual rooms that belong to this category
  // Matching by exact title or type
  const categoryRooms = rooms.filter((r) => r.type === matchedCategory.title);

  return (
    <>
      <section className="relative pt-32 pb-20 bg-ocean text-white overflow-hidden">
        {matchedCategory.imageUrl && (
          <div 
            className="absolute inset-0 opacity-30" 
          >
            <OptimizedImage src={matchedCategory.imageUrl} alt={matchedCategory.title} width="1920" height="600" className="w-full h-full object-cover object-center" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-ocean/80 to-ocean" />
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <Link to="/hebergements" className="inline-flex items-center gap-2 text-turquoise hover:text-white transition mb-6">
            <ChevronLeft size={18} /> Retour aux catégories
          </Link>
          <h1 className="font-display text-4xl md:text-6xl">{matchedCategory.title}</h1>
          <p className="mt-4 text-white/80 max-w-2xl mx-auto">
            Découvrez en détail toutes nos chambres de type {matchedCategory.title.toLowerCase()}.
          </p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-24">
          {categoryRooms.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              Aucune chambre configurée pour cette catégorie actuellement.
            </div>
          ) : (
            categoryRooms.map((room, idx) => (
              <RoomCard 
                key={room.id} 
                room={room} 
                matchedCategory={matchedCategory} 
              />
            ))
          )}
        </div>
      </section>

      {/* SEO Content Block */}
      <div className="bg-sand py-16">
        <div className="max-w-4xl mx-auto px-6 text-ocean">
          <div className="glass p-8 md:p-12 rounded-3xl shadow-xl shadow-ocean/5 border border-turquoise/20">
            <h2 className="font-display text-3xl mb-6 text-ocean" dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_title", { category: matchedCategory.title.toLowerCase() }) }} />
            <div className="space-y-4 text-ocean/80 leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_p1", { category: matchedCategory.title.toLowerCase() }) }} />
              <p dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_p2") }} />
              <p dangerouslySetInnerHTML={{ __html: t("accommodations.category.why_p3") }} />
              <div className="bg-turquoise/10 p-6 rounded-2xl mt-6 border border-turquoise/20">
                <p className="italic text-ocean" dangerouslySetInnerHTML={{ __html: t("accommodations.category.review", { category: matchedCategory.title.toLowerCase() }) }} />
                <p className="font-bold mt-2 text-ocean">{t("accommodations.category.review_author")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RoomCard({ room, matchedCategory }: { room: Room; matchedCategory: any }) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Parse specific room amenities, fallback to category amenities if none
  let parsedAmenities = [];
  if (room.amenities && Array.isArray(room.amenities)) {
    parsedAmenities = room.amenities;
  } else if (matchedCategory.features) {
    parsedAmenities = matchedCategory.features.map((f: any) => f.label);
  }

  // Media parsing (Images and Videos)
  const medias: { type: "image" | "video"; url: string }[] = [];
  
  const roomImages = room.images && Array.isArray(room.images) && room.images.length > 0 
    ? room.images 
    : (matchedCategory.imageUrl ? [matchedCategory.imageUrl] : []);
  roomImages.forEach(img => medias.push({ type: "image", url: img }));

  if (room.videoUrl) medias.push({ type: "video", url: room.videoUrl });
  if (room.videoUrls && Array.isArray(room.videoUrls)) {
    room.videoUrls.forEach(vid => medias.push({ type: "video", url: vid }));
  }

  const isAvailable = room.status === "Disponible";
  const displayedAmenities = isExpanded ? parsedAmenities : parsedAmenities.slice(0, 6);
  const fullDescription = room.description || matchedCategory.description || "Aucune description détaillée n'a été ajoutée pour cette chambre.";

  const handleNextMedia = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMediaIndex((prev) => (prev + 1) % medias.length);
  };

  const handlePrevMedia = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentMediaIndex((prev) => (prev - 1 + medias.length) % medias.length);
  };

  const currentMedia = medias[currentMediaIndex];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-ocean/5 border border-ocean/10"
    >
      {/* Photo Carousel or Single Image */}
      <div className="relative h-[300px] md:h-[450px] bg-sand/50 group">
        {medias.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`media-${currentMediaIndex}-${currentMedia.type}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {currentMedia.type === "image" ? (
                <OptimizedImage 
                  src={currentMedia.url} 
                  alt={`Chambre N° ${room.id} - Média ${currentMediaIndex + 1}`} 
                  width="800"
                  height="450"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <video 
                    key={currentMedia.url}
                    src={currentMedia.url}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 z-10">
                    {t("accommodations.category.video_badge")}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Aucun média
          </div>
        )}

        {/* Carousel Controls */}
        {medias.length > 1 && (
          <>
            <button 
              onClick={handlePrevMedia}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-ocean flex items-center justify-center opacity-80 hover:opacity-100 transition-all hover:bg-white hover:scale-110 z-10 shadow-lg"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextMedia}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-ocean flex items-center justify-center opacity-80 hover:opacity-100 transition-all hover:bg-white hover:scale-110 z-10 shadow-lg"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Media Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {medias.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentMediaIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-ocean text-white shadow-lg">
            N° {room.id}
          </span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg ${
            isAvailable ? "bg-turquoise text-ocean" : "bg-red-500 text-white"
          }`}>
            {room.status}
          </span>
        </div>
      </div>

      <div className="p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-3xl text-ocean mb-2">
              {room.title ? `${room.title} N° ${room.id}` : `Chambre N° ${room.id}`}
            </h2>
            {room.capacity && (
              <p className="text-turquoise font-medium font-accent text-lg flex items-center gap-2">
                <MapPin size={18} /> {t("accommodations.category.capacity", { capacity: room.capacity })}
              </p>
            )}
          </div>
          
          {/* Pricing */}
          <div className="bg-sand/50 px-6 py-4 rounded-2xl border border-turquoise/10 text-right shrink-0">
            {room.price_per_night ? (
              <div className="text-xl font-display text-ocean font-bold">
                {room.price_per_night} <span className="text-sm font-body text-muted-foreground font-normal">{t("accommodations.category.per_night")}</span>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">{t("accommodations.category.price_request")}</div>
            )}
            {room.price_per_month && (
              <div className="text-md text-ocean/80 mt-1">
                {room.price_per_month} <span className="text-xs text-muted-foreground">{t("accommodations.category.per_month")}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4 border-b border-ocean/10 pb-2">
            Description
          </h3>
          <div className={`prose prose-ocean max-w-none text-muted-foreground transition-all duration-500 overflow-hidden ${isExpanded ? '' : 'line-clamp-3'}`}>
            <p className="whitespace-pre-wrap">{fullDescription}</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-bold text-ocean uppercase tracking-wider mb-4 border-b border-ocean/10 pb-2 flex justify-between items-center">
            <span>{t("accommodations.category.amenities_title")}</span>
            {!isExpanded && parsedAmenities.length > 6 && (
              <span className="text-xs font-normal text-muted-foreground">
                {t("accommodations.category.amenities_more", { count: parsedAmenities.length - 6 })}
              </span>
            )}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {displayedAmenities.map((am: string) => {
              const Icon = ICON_MAP[am] || Wifi;
              return (
                <div key={am} className="flex items-center gap-3 text-sm text-ocean/80">
                  <div className="p-2 rounded-lg bg-turquoise/10 text-turquoise">
                    <Icon size={16} />
                  </div>
                  {am}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-ocean/10">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-ocean font-semibold hover:text-turquoise transition-colors"
          >
            {isExpanded ? (
              <><ChevronUp size={20} /> {t("accommodations.category.show_less")}</>
            ) : (
              <><ChevronDown size={20} /> {t("accommodations.category.show_more")}</>
            )}
          </button>

          {isAvailable ? (
            <Link
              // @ts-ignore
              to={`/reserver?room=${encodeURIComponent(room.id)}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-ocean text-white font-medium hover:bg-gold hover:text-ocean transition shimmer-gold shadow-lg w-full sm:w-auto justify-center"
            >
              <Calendar size={18} />
              {t("accommodations.category.book_room")}
            </Link>
          ) : (
            <button disabled className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-sand text-ocean/50 font-medium border border-ocean/10 cursor-not-allowed w-full sm:w-auto justify-center">
              {t("accommodations.category.unavailable")}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
