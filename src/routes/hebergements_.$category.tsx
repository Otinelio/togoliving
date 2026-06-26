import { useState, useEffect } from "react";
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
        <div className="relative max-w-6xl mx-auto px-6 text-center py-4">
          <Link to="/hebergements" className="inline-flex items-center gap-2 text-turquoise hover:text-white transition mb-8">
            <ChevronLeft size={18} /> Retour aux catégories
          </Link>
          <h1 className="font-display text-4xl md:text-6xl">{matchedCategory.title}</h1>
          <p className="mt-5 text-white/80 max-w-2xl mx-auto leading-relaxed">
            Découvrez en détail toutes nos chambres de type {matchedCategory.title.toLowerCase()}.
          </p>
        </div>
        <div className="absolute -bottom-1 inset-x-0"><WaveDivider color="#F8F5F0" /></div>
      </section>

      <section className="bg-sand py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-28">
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
      <div className="bg-sand py-20">
        <div className="max-w-6xl mx-auto px-6 text-ocean">
          <div className="glass p-8 md:p-12 rounded-3xl border border-turquoise/20">
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

  useEffect(() => {
    if (medias.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % medias.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [medias.length]);

  const currentMedia = medias[currentMediaIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full overflow-hidden rounded-[36px] border border-ocean/8 bg-white shadow-sm hover:shadow-md transition-all duration-500 flex flex-col"
    >
      {/* === TOP — Cinematic Media Banner === */}
      <div className="group relative w-full aspect-video md:aspect-[21/9] bg-sand/50 overflow-hidden shrink-0 border-b border-ocean/5">
        {medias.length > 0 ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={`media-${currentMediaIndex}-${currentMedia.type}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              {currentMedia.type === "image" ? (
                <OptimizedImage
                  src={currentMedia.url}
                  alt={`Chambre N° ${room.id} - Média ${currentMediaIndex + 1}`}
                  width="1200"
                  height="600"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              ) : (
                <div className="relative h-full w-full">
                  <video
                    key={currentMedia.url}
                    src={currentMedia.url}
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                    {t("accommodations.category.video_badge")}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            Aucun média
          </div>
        )}

        {medias.length > 1 && (
          <>
            <button
              onClick={handlePrevMedia}
              className="absolute left-4 sm:left-6 top-1/2 z-10 flex h-10 w-10 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ocean shadow-md transition-all hover:scale-110 hover:bg-white"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNextMedia}
              className="absolute right-4 sm:right-6 top-1/2 z-10 flex h-10 w-10 sm:h-11 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ocean shadow-md transition-all hover:scale-110 hover:bg-white"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {medias.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${idx === currentMediaIndex ? "w-6 sm:w-8 bg-white" : "w-1.5 sm:w-2 bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Floating Badges */}
        <div className="absolute left-4 top-4 sm:left-6 sm:top-6 z-10 flex gap-2">
          <span className="rounded-full bg-ocean px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-bold text-white shadow-md uppercase tracking-wider">
            N° {room.id}
          </span>
          <span className={`rounded-full px-3.5 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold shadow-md flex items-center gap-1.5 ${
            isAvailable ? "bg-turquoise text-ocean" : "bg-red-500 text-white"
          }`}>
            {isAvailable && <span className="h-1.5 w-1.5 rounded-full bg-ocean animate-pulse" />}
            {room.status}
          </span>
        </div>
      </div>

      {/* === BOTTOM — Structured Details === */}
      <div className="p-6 md:p-10 flex flex-col gap-8">
        {/* Header and Price Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="min-w-0">
            <span className="rounded-full bg-ocean/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-ocean">
              {matchedCategory.title}
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl text-ocean tracking-tight leading-tight">
              {room.title ? `${room.title} N° ${room.id}` : `Chambre N° ${room.id}`}
            </h2>
            {room.capacity && (
              <p className="mt-2.5 flex items-center gap-2 font-accent text-lg text-turquoise">
                <MapPin size={18} /> {t("accommodations.category.capacity", { capacity: room.capacity })}
              </p>
            )}
          </div>

          {/* Price Box */}
          <div className="rounded-2xl border border-turquoise/15 bg-gradient-to-br from-sand/40 to-white p-5 md:min-w-[300px] shrink-0">
            <div className="flex items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ocean/50 block mb-1">Tarif par Nuit</span>
                {room.price_per_night ? (
                  <div className="text-2xl sm:text-3xl font-display font-bold text-ocean">
                    {room.price_per_night} <span className="text-xs font-body font-normal text-muted-foreground">/{t("accommodations.category.per_night")}</span>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">{t("accommodations.category.price_request")}</div>
                )}
              </div>
              {room.price_per_month && (
                <div className="border-l border-ocean/10 pl-5 flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ocean/50 block mb-1">Tarif Mensuel</span>
                  <div className="text-xl sm:text-2xl font-display font-semibold text-turquoise">
                    {room.price_per_month}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-ocean/5">
          {/* Description */}
          <div className="lg:col-span-7">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-ocean/60">
              Description de l'hébergement
            </h3>
            <div className={`text-muted-foreground leading-relaxed transition-all duration-500 ${isExpanded ? "" : "line-clamp-3 text-sm"}`}>
              <p className="whitespace-pre-wrap text-sm sm:text-base">{fullDescription}</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="lg:col-span-5">
            <h3 className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ocean/60">
              <span>{t("accommodations.category.amenities_title")}</span>
              {!isExpanded && parsedAmenities.length > 6 && (
                <span className="text-[11px] font-normal text-muted-foreground">
                  +{parsedAmenities.length - 6} autres
                </span>
              )}
            </h3>
            <div className="flex flex-wrap gap-2">
              {displayedAmenities.map((am: string) => {
                const Icon = ICON_MAP[am] || Wifi;
                return (
                  <div key={am} className="flex items-center gap-2 rounded-full border border-ocean/5 bg-sand/30 px-3 py-1.5 text-xs text-ocean/85 hover:border-turquoise hover:bg-white transition duration-300">
                    <div className="rounded-full bg-turquoise/10 p-1 text-turquoise">
                      <Icon size={12} />
                    </div>
                    {am}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Actions Row */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-ocean/10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-2 rounded-full border border-ocean/10 px-5 py-3 text-sm font-semibold text-ocean transition hover:border-turquoise hover:text-turquoise hover:bg-white w-full sm:w-auto"
          >
            {isExpanded ? (
              <><ChevronUp size={16} /> {t("accommodations.category.show_less")}</>
            ) : (
              <><ChevronDown size={16} /> {t("accommodations.category.show_more")}</>
            )}
          </button>

          {isAvailable ? (
            <Link
              // @ts-ignore
              to={`/reserver?room=${encodeURIComponent(room.id)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ocean px-8 py-3.5 text-sm font-medium text-white transition hover:bg-gold hover:text-ocean w-full sm:w-auto shadow-md hover:shadow-lg shimmer-gold"
            >
              <Calendar size={16} />
              {t("accommodations.category.book_room")}
            </Link>
          ) : (
            <button disabled className="inline-flex items-center justify-center gap-2 rounded-full border border-ocean/10 bg-sand px-8 py-3.5 text-sm font-medium text-ocean/40 w-full sm:w-auto cursor-not-allowed">
              {t("accommodations.category.unavailable")}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
