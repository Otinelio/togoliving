⚠️ Compteurs JS à zéro au chargement — contenu invisible pour Google
Impact Élevé
Sur la page d'accueil, les compteurs animés ("100m de la plage", "25 min de l'aéroport") sont rendus à "0" par JavaScript au premier rendu côté serveur, puis animés côté client. Si Google snapshotte la page avant hydratation, il voit "0m" et "0min" — ce qui peut nuire à la pertinence.

✅ Correction
Initialiser les valeurs des compteurs avec les valeurs finales dans le SSR (useState(finalValue) puis animer seulement via useEffect après hydratation), ou utiliser des valeurs en dur dans le HTML initial.

P incohérent entre le footer et les métadonnées
Impact Moyen
Le footer affiche "togoliving.net" comme URL, alors que le vrai site est "residencetogoliving.com". Le numéro de téléphone principal dans le footer est +228 93 87 20 88 mais lib/whatsapp.ts utilise 22893872088 (sans le +). Les citations NAP (Nom, Adresse, Téléphone) doivent être identiques partout.

✅ Correction
Standardiser sur tout le site :
Résidence TOGOLIVING
· Kpogan Agbetsiko, Route N2, 36BP50 Lomé, Togo · +228 93 87 20 88 · residencetogoliving.com


⚠️ Structure de liens internes insuffisante
Impact Moyen
Les boutons "Détails" de la section hébergements sur la page d'accueil pointent tous vers /hebergements — pas vers les pages spécifiques /hebergements/studios, /hebergements/chambre-salon, etc. Ces pages de détail ne reçoivent aucun lien depuis la page d'accueil.

✅ Correction
Mettre à jour les liens des cards "Détails" vers les pages de catégorie correspondantes. Ces pages doivent aussi être liées depuis le menu et le footer.


⚠️ Avis clients non balisés en Schema.org (Review/AggregateRating)
Impact Élevé
La page d'accueil affiche 6 avis clients (Booking.com & Google) et deux scores globaux (7.2/10 et 4.3/5). Ces données ne sont pas encodées en Schema.org, donc Google ne peut pas les exploiter pour des rich snippets avec étoiles dans les SERP.

✅ Correction
Ajouter un schema AggregateRating sur la page d'accueil :
{ "@type": "Hotel", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.3", "bestRating": "5", "ratingCount": "20" } }