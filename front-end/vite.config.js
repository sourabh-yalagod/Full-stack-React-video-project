import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  server: {
    // proxy: {
    //   "/api": {
    //     target: "https://videotube-auro.onrender.com", // Backend URL
    //     changeOrigin: true, // Adjust the origin header
    //     secure: false, // Set to true if using a valid SSL certificate
    //     rewrite: (path) => path.replace(/^\/api/, '') // Adjust path if needed
    //   }
    // },
    proxy: {
      "/api": "https://videotube-auro.onrender.com",
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
