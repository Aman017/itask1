import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/itask1/',  // This should match your GitHub Pages repo name
  plugins: [react()],
  build: {
    outDir: 'dist',  // Ensure this is the output folder
  }
});
