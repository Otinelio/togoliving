import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // <-- Ajout de l'import Nitro
import sitemap from "vite-plugin-sitemap";
import fs from "fs";

export default defineConfig({
  vite: { // <-- Ajout de la clé vite pour passer des plugins supplémentaires
    plugins: [
      nitro({ preset: "vercel" }), // <-- Force le formatage pour Vercel
      {
        name: 'ensure-out-dir',
        closeBundle: {
          order: 'pre',
          handler() {
            if (!fs.existsSync('.vercel/output/static')) {
              fs.mkdirSync('.vercel/output/static', { recursive: true });
            }
          }
        }
      },
      sitemap({
        hostname: 'https://residencetogoliving.com',
        outDir: '.vercel/output/static',
        dynamicRoutes: [
          '/',
          '/a-propos',
          '/carrieres',
          '/contact',
          '/evenements',
          '/galerie',
          '/hebergements',
          '/loisirs',
          '/reserver',
          '/restaurant'
        ],
      })
    ]
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});