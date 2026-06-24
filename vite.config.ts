import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite"; // <-- Ajout de l'import Nitro
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  vite: { // <-- Ajout de la clé vite pour passer des plugins supplémentaires
    plugins: [
      nitro({ preset: "vercel" }), // <-- Force le formatage pour Vercel
      sitemap({
        hostname: 'https://residencetogoliving.com',
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