/**
 * Tests unitaires de vérification Supabase
 * Vérifie que toutes les tables et le storage sont bien connectés
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

let passed = 0;
let failed = 0;

async function test(name: string, fn: () => Promise<void>) {
  try {
    await fn();
    passed++;
    console.log(`  ✅ ${name}`);
  } catch (err: any) {
    failed++;
    console.log(`  ❌ ${name} — ${err?.message || String(err)}`);
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

// ────────────────────────────────────────────────
console.log("\n🔵 1. HÉBERGEMENTS (table: accommodations)");
// ────────────────────────────────────────────────

await test("Lecture de la table accommodations", async () => {
  const { data, error } = await supabase.from("accommodations").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(Array.isArray(data), "data n'est pas un tableau");
  console.log(`     → ${data!.length} hébergements trouvés`);
});

await test("Vérification des colonnes clés (title, imageUrl, features, prices)", async () => {
  const { data, error } = await supabase.from("accommodations").select("id, title, \"imageUrl\", features, prices").limit(1);
  assert(!error, `Erreur: ${error?.message}`);
  if (data && data.length > 0) {
    const row = data[0];
    assert(row.hasOwnProperty("title"), "Colonne 'title' manquante");
    assert(row.hasOwnProperty("imageUrl"), "Colonne 'imageUrl' manquante");
    assert(row.hasOwnProperty("features"), "Colonne 'features' manquante");
    assert(row.hasOwnProperty("prices"), "Colonne 'prices' manquante");
  }
});

// ────────────────────────────────────────────────
console.log("\n🔵 2. ÉTAT DES CHAMBRES (table: rooms_status)");
// ────────────────────────────────────────────────

await test("Lecture de la table rooms_status", async () => {
  const { data, error } = await supabase.from("rooms_status").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(Array.isArray(data), "data n'est pas un tableau");
  console.log(`     → ${data!.length} chambres trouvées`);
});

await test("Vérification des colonnes clés (id, type, status, images, amenities)", async () => {
  const { data, error } = await supabase.from("rooms_status").select("id, type, status, images, amenities").limit(1);
  assert(!error, `Erreur: ${error?.message}`);
  if (data && data.length > 0) {
    const row = data[0];
    assert(row.hasOwnProperty("type"), "Colonne 'type' manquante");
    assert(row.hasOwnProperty("status"), "Colonne 'status' manquante");
    assert(row.hasOwnProperty("images"), "Colonne 'images' manquante");
    assert(row.hasOwnProperty("amenities"), "Colonne 'amenities' manquante");
  }
});

// ────────────────────────────────────────────────
console.log("\n🔵 3. GALERIE (table: gallery)");
// ────────────────────────────────────────────────

await test("Lecture de la table gallery", async () => {
  const { data, error } = await supabase.from("gallery").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(Array.isArray(data), "data n'est pas un tableau");
  console.log(`     → ${data!.length} images trouvées`);
});

await test("Vérification des catégories galerie existantes", async () => {
  const { data, error } = await supabase.from("gallery").select("category");
  assert(!error, `Erreur: ${error?.message}`);
  const cats = [...new Set((data || []).map((r: any) => r.category))];
  console.log(`     → Catégories: ${cats.join(", ") || "(vide)"}`);
});

await test("Vérification images 'Loisir et détente' dans gallery", async () => {
  const { data, error } = await supabase.from("gallery").select("*").eq("category", "Loisir et détente");
  assert(!error, `Erreur: ${error?.message}`);
  console.log(`     → ${data!.length} images 'Loisir et détente'`);
});

// ────────────────────────────────────────────────
console.log("\n🔵 4. EMPLOIS (table: jobs)");
// ────────────────────────────────────────────────

await test("Lecture de la table jobs", async () => {
  const { data, error } = await supabase.from("jobs").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(Array.isArray(data), "data n'est pas un tableau");
  console.log(`     → ${data!.length} emplois trouvés`);
});

await test("Vérification des colonnes clés (title, type, department, status)", async () => {
  const { data, error } = await supabase.from("jobs").select("title, type, department, status").limit(1);
  assert(!error, `Erreur: ${error?.message}`);
  if (data && data.length > 0) {
    const row = data[0];
    assert(row.hasOwnProperty("title"), "Colonne 'title' manquante");
    assert(row.hasOwnProperty("type"), "Colonne 'type' manquante");
    assert(row.hasOwnProperty("department"), "Colonne 'department' manquante");
    assert(row.hasOwnProperty("status"), "Colonne 'status' manquante");
  }
});

// ────────────────────────────────────────────────
console.log("\n🔵 5. CANDIDATURES (table: applications)");
// ────────────────────────────────────────────────

await test("Lecture de la table applications", async () => {
  const { data, error } = await supabase.from("applications").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(Array.isArray(data), "data n'est pas un tableau");
  console.log(`     → ${data!.length} candidatures trouvées`);
});

// ────────────────────────────────────────────────
console.log("\n🔵 6. ÉVÉNEMENTS (table: events)");
// ────────────────────────────────────────────────

await test("Lecture de la table events", async () => {
  const { data, error } = await supabase.from("events").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(Array.isArray(data), "data n'est pas un tableau");
  console.log(`     → ${data!.length} événements trouvés`);
});

// ────────────────────────────────────────────────
console.log("\n🔵 7. AVIS CLIENTS (table: reviews)");
// ────────────────────────────────────────────────

await test("Lecture de la table reviews", async () => {
  const { data, error } = await supabase.from("reviews").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(data !== null, "La table 'reviews' n'existe pas — exécutez supabase_setup.sql");
  console.log(`     → ${data!.length} avis trouvés`);
});

// ────────────────────────────────────────────────
console.log("\n🔵 8. MENU (table: menu_items)");
// ────────────────────────────────────────────────

await test("Lecture de la table menu_items", async () => {
  const { data, error } = await supabase.from("menu_items").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(data !== null, "La table 'menu_items' n'existe pas — exécutez supabase_setup.sql");
  console.log(`     → ${data!.length} articles menu trouvés`);
});

// ────────────────────────────────────────────────
console.log("\n🔵 9. PARAMÈTRES (table: site_settings)");
// ────────────────────────────────────────────────

await test("Lecture de la table site_settings", async () => {
  const { data, error } = await supabase.from("site_settings").select("*");
  assert(!error, `Erreur: ${error?.message}`);
  assert(data !== null, "La table 'site_settings' n'existe pas — exécutez supabase_setup.sql");
  console.log(`     → ${data!.length} entrée(s) paramètres`);
});

// ────────────────────────────────────────────────
console.log("\n🔵 10. SUPABASE STORAGE (bucket: media)");
// ────────────────────────────────────────────────

await test("Le bucket 'media' existe et est accessible", async () => {
  const { data, error } = await supabase.storage.from("media").list("site", { limit: 3 });
  assert(!error, `Erreur: ${error?.message}`);
  assert(Array.isArray(data), "data n'est pas un tableau");
  console.log(`     → ${data!.length} fichiers dans media/site (limité à 3)`);
});

await test("Vérification du dossier gallery/ dans le storage", async () => {
  const { data, error } = await supabase.storage.from("media").list("gallery", { limit: 3 });
  assert(!error, `Erreur: ${error?.message}`);
  console.log(`     → ${data!.length} fichiers dans media/gallery (limité à 3)`);
});

await test("Vérification du dossier resumes/ dans le storage", async () => {
  const { data, error } = await supabase.storage.from("media").list("resumes", { limit: 3 });
  assert(!error, `Erreur: ${error?.message}`);
  console.log(`     → ${data!.length} fichiers dans media/resumes (limité à 3)`);
});

// ────────────────────────────────────────────────
// RÉSULTATS
// ────────────────────────────────────────────────
console.log("\n" + "═".repeat(50));
console.log(`📊 RÉSULTATS: ${passed} réussi(s), ${failed} échoué(s) sur ${passed + failed} tests`);
if (failed === 0) {
  console.log("🟢 TOUT EST OPÉRATIONNEL !");
} else {
  console.log("🔴 Des tables ou dossiers sont manquants — vérifiez que vous avez exécuté supabase_setup.sql ET migration_v2.sql");
}
console.log("═".repeat(50) + "\n");
