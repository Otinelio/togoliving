import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const directories = [
  { path: "src/Assets/images/piscine", cat: "Piscine" },
  { path: "src/Assets/images/plage", cat: "Plage" },
  { path: "src/Assets/images/appartements", cat: "Appartements" },
  { path: "src/Assets/images/interieur", cat: "Intérieur" },
  { path: "src/Assets/images/bar", cat: "Bar" },
];

async function seedGallery() {
  console.log("Emptying gallery...");
  const { error: delError } = await supabase.from("gallery").delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (delError) console.error("Error emptying gallery:", delError.message);

  const imagesToInsert = [];

  for (const dir of directories) {
    if (fs.existsSync(dir.path)) {
      const files = fs.readdirSync(dir.path).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
      for (const file of files) {
        imagesToInsert.push({
          category: dir.cat,
          imageUrl: `/images/gallery/${file}`,
          altText: `${dir.cat} image`
        });
      }
    }
  }

  console.log(`Inserting ${imagesToInsert.length} images into gallery...`);
  const { error } = await supabase.from("gallery").insert(imagesToInsert);
  if (error) console.error("Error inserting into gallery:", error.message);
  
  console.log("Done!");
}

seedGallery();
