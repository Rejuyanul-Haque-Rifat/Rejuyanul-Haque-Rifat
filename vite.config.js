import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator';

export default defineConfig({
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
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
