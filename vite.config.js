import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/]
      },
      devOptions: {
        enabled: true
      }
    }),
    obfuscatorPlugin({
      options: {
        compact: true,
        controlFlowFlattening: true,
        deadCodeInjection: false,
        debugProtection: true,
        disableConsoleOutput: true,
      }
    })
  ],
  build: {
    minify: 'terser',
    chunkSizeWarningLimit: 1000
  }
});
