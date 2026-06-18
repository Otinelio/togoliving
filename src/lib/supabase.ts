import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
