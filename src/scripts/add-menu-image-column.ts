import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addImageColumn() {
  console.log("Adding 'image' column to menu_items table...");
  
  // Try to add the column via RPC or a simple update test
  // Since we can't run DDL from the client, we'll test if the column already exists
  const { data, error } = await supabase
    .from("menu_items")
    .select("image")
    .limit(1);

  if (error) {
    console.log("The 'image' column does not exist yet.");
    console.log("Please run this SQL in the Supabase SQL Editor:");
    console.log("");
    console.log("  ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS image TEXT;");
    console.log("");
    console.log("Then run this script again to verify.");
  } else {
    console.log("✅ 'image' column already exists in menu_items table!");
    console.log("Sample data:", data);
  }
}

addImageColumn();
