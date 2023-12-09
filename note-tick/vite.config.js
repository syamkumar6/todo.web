import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Set the production mode
    mode: 'production',
    // Specify the output directory (adjust as needed)
    outDir: 'dist',
    // Enable minification for the production build
    minify: 'terser',
    // Enable splitting chunks to improve loading performance
    chunkSizeWarningLimit: 600,
  },
});