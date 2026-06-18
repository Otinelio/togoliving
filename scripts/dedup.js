import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function deduplicate() {
  const { data, error } = await supabase.from("menu_items").select("*");
  if (error) {
    console.error("Error fetching menu items", error);
    return;
  }

  const seen = new Set();
  const toDelete = [];

  for (const item of data) {
    const key = `${item.name.toLowerCase().trim()}_${item.category.toLowerCase().trim()}`;
    if (seen.has(key)) {
      toDelete.push(item.id);
    } else {
      seen.add(key);
    }
  }

  if (toDelete.length > 0) {
    console.log(`Found ${toDelete.length} duplicates. Deleting...`);
    for (const id of toDelete) {
      await supabase.from("menu_items").delete().eq("id", id);
    }
    console.log("Done.");
  } else {
    console.log("No duplicates found.");
  }
}

deduplicate();
