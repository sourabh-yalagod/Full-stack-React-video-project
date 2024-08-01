import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  server: {
    proxy: {
      "/api": "https://videotube-auro.onrender.com", // Backend URL
      // changeOrigin: true,
      // secure: false,
      // rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
