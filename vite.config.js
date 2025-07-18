import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // because you're deploying to https://agaramai.com
  plugins: [react()]
});
