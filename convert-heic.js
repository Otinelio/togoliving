import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageDir = path.join(__dirname, './src/Assets/images/appartements');
const files = ['IMG_4201.HEIC', 'IMG_4210.HEIC', 'IMG_4214.HEIC'];

sharp.cache(false);

(async () => {
  for (const file of files) {
    const inputPath = path.join(imageDir, file);
    const outputPath = path.join(imageDir, file.replace('.HEIC', '.jpg'));
    
    try {
      await sharp(inputPath, { 
        unlimited: true
      })
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(outputPath);
      console.log(`✓ Converted ${file} to ${path.basename(outputPath)}`);
    } catch (err) {
      console.error(`✗ Failed to convert ${file}:`, err.message);
    }
  }
})();
