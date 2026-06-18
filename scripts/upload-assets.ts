/**
 * Script to upload all local assets to Supabase Storage.
 * Run with: npx tsx scripts/upload-assets.ts
 *
 * After running, the script will output the public URLs that you
 * can paste into src/lib/assets.ts.
 */
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = "https://utfkuniyorywtvhjdivj.supabase.co";
const supabaseAnonKey = "sb_publishable_axjzCD6xxgLo2Eh-DVNMwQ_5ZcxK01p";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BUCKET = "media";
const ASSETS_DIR = path.resolve(__dirname, "../src/Assets/images");

async function getAllFiles(dir: string, baseDir: string = dir): Promise<{ localPath: string; remotePath: string }[]> {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: { localPath: string; remotePath: string }[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllFiles(fullPath, baseDir));
    } else {
      const relativePath = path.relative(baseDir, fullPath);
      const remotePath = `site/${relativePath.replace(/\\/g, "/")}`;
      files.push({ localPath: fullPath, remotePath });
    }
  }

  return files;
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".mov": "video/quicktime",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

async function main() {
  console.log("📁 Scanning assets directory:", ASSETS_DIR);
  const files = await getAllFiles(ASSETS_DIR);
  console.log(`🔍 Found ${files.length} files to upload\n`);

  const results: Record<string, string> = {};

  for (const file of files) {
    const fileBuffer = fs.readFileSync(file.localPath);
    const contentType = getMimeType(file.localPath);

    console.log(`⬆️  Uploading: ${file.remotePath} (${(fileBuffer.length / 1024).toFixed(0)} KB)`);

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(file.remotePath, fileBuffer, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error(`   ❌ Error: ${error.message}`);
      continue;
    }

    const { data: publicData } = supabase.storage.from(BUCKET).getPublicUrl(file.remotePath);
    results[file.remotePath] = publicData.publicUrl;
    console.log(`   ✅ Done → ${publicData.publicUrl}`);
  }

  // Output the mapping for src/lib/assets.ts
  console.log("\n\n// ===== Copy the following into src/lib/assets.ts =====\n");
  console.log("export const ASSETS = {");
  for (const [remotePath, url] of Object.entries(results)) {
    const key = remotePath
      .replace("site/", "")
      .replace(/[\/\-\.]/g, "_")
      .replace(/_+/g, "_")
      .replace(/_$/, "")
      .toLowerCase();
    console.log(`  ${key}: "${url}",`);
  }
  console.log("} as const;");
}

main().catch(console.error);
