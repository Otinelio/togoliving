import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { error } = await supabase.from('rooms_status').update({ description: 'Test' }).eq('id', '10');
  console.log("Error when updating description:", error);
}

test().catch(console.error);
