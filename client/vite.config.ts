// Vite Configuration
// Configures development server and build settings
// Proxies /api requests to backend server

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Frontend runs on port 5173 (Vite default)
    port: 5173,
    // Proxy API requests to Express backend on port 3001
    // Allows frontend to call /api/* without CORS issues in development
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
