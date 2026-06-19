import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedRooms() {
  const rooms = [
    { id: "4", type: "Studios", status: "Disponible", floor: 0 },
    { id: "5", type: "Studios", status: "Disponible", floor: 0 },
    { id: "6", type: "Studios", status: "Disponible", floor: 0 },
    { id: "7", type: "Studios", status: "Disponible", floor: 0 },
    { id: "34", type: "Studios", status: "Disponible", floor: 3 },
  ];

  console.log("Seeding rooms_status for Studios...");
  for (const r of rooms) {
    const { error } = await supabase.from("rooms_status").upsert(r);
    if (error) {
      console.error(`Error inserting room ${r.id}:`, error.message);
    } else {
      console.log(`Room ${r.id} added/updated.`);
    }
  }
  console.log("Rooms seed completed!");
}

seedRooms();
