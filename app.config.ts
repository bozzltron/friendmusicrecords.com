import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: false, // Using public/manifest.json
        includeAssets: [
          'favicon.ico',
          'icons/*.png'
        ],
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,webp,ico,jpg,jpeg}'],
          navigateFallback: '/',
        },
        devOptions: {
          enabled: false,
        },
      })
    ],
    server: {
      port: 5000,
      hmr: {
        overlay: true, // Show error overlay
        clientPort: 5000,
      },
      watch: {
        usePolling: false, // Use native file system events (faster)
        ignored: ['**/node_modules/**', '**/.git/**'],
      }
    }
  }
});

