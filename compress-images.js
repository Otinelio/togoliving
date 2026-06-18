import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesDir = path.join(process.cwd(), 'src', 'Assets', 'images');

async function processDirectory(directory) {
  if (!fs.existsSync(directory)) return;

  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const tempPath = fullPath + '.tmp';
      try {
        const metadata = await sharp(fullPath).metadata();
        const originalSize = stat.size / 1024 / 1024; // MB
        
        // Si l'image fait moins de 200KB, on l'ignore (déjà bien optimisée)
        if (originalSize < 0.2) continue;

        let sharpInstance = sharp(fullPath);
        
        // Redimensionner si la largeur dépasse 1920px (idéal pour le web)
        if (metadata.width > 1920) {
          sharpInstance = sharpInstance.resize(1920, null, { withoutEnlargement: true });
        }

        // Compression (MozJPEG ou PNG optimal)
        if (/\.png$/i.test(file)) {
          sharpInstance = sharpInstance.png({ quality: 80, compressionLevel: 9 });
        } else {
          sharpInstance = sharpInstance.jpeg({ quality: 80, mozjpeg: true });
        }
        
        await sharpInstance.toFile(tempPath);
        
        const newStat = fs.statSync(tempPath);
        const newSize = newStat.size / 1024 / 1024; // MB
        
        fs.renameSync(tempPath, fullPath);
        
        const percentage = Math.round((1 - newSize / originalSize) * 100);
        console.log(`✅ ${file}: ${originalSize.toFixed(2)}MB -> ${newSize.toFixed(2)}MB (-${percentage}%)`);
      } catch (e) {
        console.error(`❌ Erreur sur ${file}:`, e.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

console.log("🚀 Démarrage de l'optimisation des images...");
processDirectory(imagesDir).then(() => {
  console.log("🎉 Optimisation terminée ! Le site sera beaucoup plus rapide.");
});
