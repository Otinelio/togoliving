import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const videosDir = path.join(process.cwd(), 'public', 'videos');

if (!fs.existsSync(videosDir)) {
  console.log(`Le dossier n'existe pas : ${videosDir}`);
  process.exit(1);
}

const files = fs.readdirSync(videosDir).filter(file => file.toLowerCase().endsWith('.mp4') || file.toLowerCase().endsWith('.mov'));

for (const file of files) {
  // Ignorer les fichiers originaux déjà renommés
  if (file.startsWith('original_hevc_')) continue;

  const filePath = path.join(videosDir, file);
  
  try {
    // Vérifier le codec avec ffprobe
    const probe = execSync(`ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=noprint_wrappers=1:nokey=1 "${filePath}"`, { encoding: 'utf-8' }).trim();
    
    if (probe === 'hevc') {
      console.log(`[HEVC détecté] Conversion de ${file} vers H.264... Cela peut prendre quelques minutes.`);
      const tempPath = path.join(videosDir, `temp_${file}`);
      
      // Conversion en H.264
      execSync(`ffmpeg -y -i "${filePath}" -c:v libx264 -preset fast -crf 23 -c:a aac -b:a 128k "${tempPath}"`, { stdio: 'inherit' });
      
      // Sauvegarder l'original et remplacer par le nouveau
      fs.renameSync(filePath, path.join(videosDir, `original_hevc_${file}`));
      fs.renameSync(tempPath, filePath);
      console.log(`✅ Succès ! ${file} a été converti (L'original est sauvegardé sous original_hevc_${file})`);
    } else {
      console.log(`[Ignoré] ${file} est déjà au format ${probe}.`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${file}:`, error.message);
  }
}
console.log('🎉 Toutes les vidéos ont été traitées !');
