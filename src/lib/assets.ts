/**
 * All site media assets served from Supabase Storage.
 * These replace the old local @/Assets imports.
 */
const BASE = "https://utfkuniyorywtvhjdivj.supabase.co/storage/v1/object/public/media/site";

export const ASSETS = {
  // Logo
  logo: `${BASE}/Residence_Togoliving_logo.png`,

  // Accueil / Hero
  heroImg: `${BASE}/accueil_img.jpg`,
  poolImg: `${BASE}/accueil2_img.jpg`,

  // Piscine
  piscine: `${BASE}/piscine/piscine.jpg`,
  piscine1: `${BASE}/piscine/piscine1.jpg`,
  piscineAccueil: `${BASE}/piscine/accueil_img.jpg`,
  piscineAccueil1: `${BASE}/piscine/accueil1_img.jpg`,
  piscineIMG4283: `${BASE}/piscine/IMG_4283.jpg`,

  // Appartements (images)
  studioIMG4201: `${BASE}/appartements/IMG_4201.jpg`,
  chambreSalonIMG4211: `${BASE}/appartements/IMG_4211.jpg`,
  deuxChambresIMG4212: `${BASE}/appartements/IMG_4212.jpg`,
  troisChambresSalonIMG4247: `${BASE}/appartements/IMG_4247.jpg`,
  appartIMG4234: `${BASE}/appartements/IMG_4234.jpg`,
  appartIMG4240: `${BASE}/appartements/IMG_4240.jpg`,
  appart19DA: `${BASE}/appartements/19DA4565-B3A8-44DD-80DC-6A34D4CCABEB.jpg`,
  appartDFC0: `${BASE}/appartements/DFC0BEA9-C7FE-4500-91CF-48D6F9F02EB1.jpg`,

  // Appartements (vidéos)
  videoIMG0077: `${BASE}/appartements/IMG_0077.mp4`,
  videoIMG0085: `${BASE}/appartements/IMG_0085.MP4`,
  videoIMG0285: `${BASE}/appartements/IMG_0285.MP4`,
  videoIMG1684: `${BASE}/appartements/IMG_1684.MP4`,

  // Bar
  bar60DBC: `${BASE}/bar/60DBC121-7976-41CA-870B-EEAA1AD17DC4.jpg`,
  bar69A51: `${BASE}/bar/69A51B0D-E2CC-40B9-8BC3-5F2CF11CAA54.JPG.jpg`,
  barC21DF: `${BASE}/bar/C21DF370-673F-4DC8-8681-D83FE80DDC88.jpg`,
  barIMG2449: `${BASE}/bar/IMG_2449.jpg`,
  barIMG4009: `${BASE}/bar/IMG_4009.jpg`,
  barIMG4606: `${BASE}/bar/IMG_4606.jpg`,

  // Intérieur
  interieur3B98: `${BASE}/interieur/3B98AFD0-A1A8-4B2D-9525-A39069FB7103.jpg`,
  interieurBCC6: `${BASE}/interieur/BCC6E7A7-A8B1-40AD-9DD0-A73A219B7FC0.jpg`,
  interieurBE2C: `${BASE}/interieur/BE2C3740-7127-4D44-8CED-854D6F7BA84F.JPG.jpg`,
  interieurIMG4230: `${BASE}/interieur/IMG_4230.jpg`,
  interieurIMG4683: `${BASE}/interieur/IMG_4683.jpg`,

  // Plage
  plageIMG4188: `${BASE}/plage/IMG_4188.jpg`,
} as const;
