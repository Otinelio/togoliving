import sharp from 'sharp';
import path from 'path';
import https from 'https';

const BG_URL = "https://utfkuniyorywtvhjdivj.supabase.co/storage/v1/object/public/media/site/piscine/piscine.jpg";
const LOGO_URL = "https://utfkuniyorywtvhjdivj.supabase.co/storage/v1/object/public/media/site/Residence_Togoliving_logo.png";
const OUT_PATH = path.join(process.cwd(), 'public', 'og-image.jpg');

function downloadToBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const data: Buffer[] = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function generateOG() {
  console.log("⏳ Downloading background...");
  const bgBuffer = await downloadToBuffer(BG_URL);
  
  console.log("⏳ Downloading logo...");
  const logoBuffer = await downloadToBuffer(LOGO_URL);

  console.log("⚙️ Processing images...");
  
  // Resize logo
  const resizedLogo = await sharp(logoBuffer)
    .resize({ width: 500, withoutEnlargement: true })
    .toBuffer();

  // Create composite
  await sharp(bgBuffer)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .composite([
      {
        // Dark overlay to make logo pop
        input: Buffer.from('<svg width="1200" height="630"><rect width="1200" height="630" fill="rgba(30, 58, 95, 0.4)"/></svg>'),
        top: 0,
        left: 0,
      },
      {
        input: resizedLogo,
        gravity: 'center'
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(OUT_PATH);

  console.log(`✅ OG Image successfully created at: ${OUT_PATH}`);
}

generateOG().catch(console.error);
