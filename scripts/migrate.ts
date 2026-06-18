import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import mime from "mime-types"; // Needs to be installed, or we can infer manually

// WARNING: You must install mime-types or run this script with `npx tsx scripts/migrate.ts`
// Ensure you have run the supabase_setup.sql in your Supabase SQL Editor BEFORE running this.

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function uploadFile(localPath: string, remotePath: string) {
  try {
    const fullPath = path.resolve(process.cwd(), localPath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`File not found: ${fullPath}`);
      return null;
    }
    const fileBuffer = fs.readFileSync(fullPath);
    let contentType = "application/octet-stream";
    if (localPath.endsWith(".jpg") || localPath.endsWith(".jpeg")) contentType = "image/jpeg";
    else if (localPath.endsWith(".png")) contentType = "image/png";
    else if (localPath.endsWith(".mp4") || localPath.endsWith(".MP4")) contentType = "video/mp4";

    console.log(`Uploading ${localPath}...`);
    const { data, error } = await supabase.storage
      .from("media")
      .upload(remotePath, fileBuffer, { contentType, upsert: true });

    if (error) throw error;
    
    const { data: publicData } = supabase.storage.from("media").getPublicUrl(remotePath);
    return publicData.publicUrl;
  } catch (error) {
    console.error(`Error uploading ${localPath}:`, error);
    return null;
  }
}

async function migrate() {
  console.log("Starting migration...");

  // 1. Upload Gallery Images
  console.log("Migrating Gallery...");
  const galleryItems = [
    { cat: "Piscine", src: "src/Assets/images/piscine/IMG_4283.jpg", alt: "Piscine" },
    { cat: "Piscine", src: "src/Assets/images/piscine/accueil1_img.jpg", alt: "Piscine" },
    { cat: "Piscine", src: "src/Assets/images/piscine/accueil_img.jpg", alt: "Piscine" },
    { cat: "Piscine", src: "src/Assets/images/piscine/piscine.jpg", alt: "Piscine" },
    { cat: "Piscine", src: "src/Assets/images/piscine/piscine1.jpg", alt: "Piscine" },
    { cat: "Plage", src: "src/Assets/images/plage/IMG_4188.jpg", alt: "Plage" },
    { cat: "Appartements", src: "src/Assets/images/appartements/19DA4565-B3A8-44DD-80DC-6A34D4CCABEB.jpg", alt: "Appartement" },
    // ... we can add the rest, but let's keep it brief for now or read dynamically
  ];

  for (const item of galleryItems) {
    const fileName = path.basename(item.src);
    const remotePath = `gallery/${fileName}`;
    const publicUrl = await uploadFile(item.src, remotePath);
    if (publicUrl) {
      await supabase.from("gallery").insert({
        category: item.cat,
        image_url: publicUrl,
        alt_text: item.alt
      });
    }
  }

  // 2. Settings (Hero Images)
  console.log("Migrating Settings...");
  const heroUrl = await uploadFile("src/Assets/images/piscine/accueil1_img.jpg", "site/hero.jpg");
  const galleryHeroUrl = await uploadFile("src/Assets/images/piscine/piscine1.jpg", "site/galleryHero.jpg");
  await supabase.from("site_settings").insert({
    id: "default",
    hero_image_url: heroUrl,
    gallery_hero_url: galleryHeroUrl
  });

  console.log("Migration finished! (Note: Menu & Accommodations should be inserted manually via admin or an expanded script)");
}

// migrate();
