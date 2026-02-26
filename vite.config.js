import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    compression({
      algorithm: 'brotli',
      ext: '.br',
      deleteOriginFile: false
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['styled-components']
        }
      }
    },
    minify: 'terser',
    sourcemap: false
  }
});
