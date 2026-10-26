import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap': ['gsap', 'gsap/ScrollTrigger'],
          'vendor-motion': ['motion'],
          'vendor-lenis': ['lenis'],
          'vendor-spline': ['@splinetool/runtime'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
});
