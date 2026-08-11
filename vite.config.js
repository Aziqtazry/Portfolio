import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        gestureMouse: 'project-gesturemouse.html',
        myMeds: 'project-mymeds.html',
        speechTracker: 'project-speechtracker.html'
      }
    }
  }
});
