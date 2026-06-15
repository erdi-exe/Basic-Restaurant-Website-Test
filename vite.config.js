import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
