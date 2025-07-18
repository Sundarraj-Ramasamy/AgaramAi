import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

export default defineConfig({
  base: '/', // Or adjust if deploying under a subpath
  build: {
    outDir: 'dist',
  },
  plugins: [react(), compression()],
});
