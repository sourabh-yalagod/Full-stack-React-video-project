import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist', // Ensure the build output directory is 'dist'
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://videotube-auro.onrender.com', // Backend API URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias for easier imports
    },
  },
});

