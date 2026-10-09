import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { devApi } from './server/devApi';

export default defineConfig({
  plugins: [react(), devApi()],
  resolve: {
    alias: {
      // The light player has no expression engine, so it never calls eval()
      // (keeps the CSP strict) and is roughly half the size.
      'lottie-web': 'lottie-web/build/player/lottie_light',
    },
  },
  build: {
    target: 'es2020',
    // The 3D chunk (three + R3F + drei) is loaded lazily after first paint, so its
    // size does not affect initial load. See ANIMATIONS.md.
    chunkSizeWarningLimit: 1100,
  },
});
