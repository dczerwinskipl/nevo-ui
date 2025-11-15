import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    watch: {
      // Watch workspace packages for changes
      ignored: ["!**/node_modules/@nevo/**"],
    },
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // Include workspace packages in dependency optimization
    include: ["@nevo/design-system", "@nevo/api-client", "@nevo/api-mocks"],
    // Force re-optimization on every restart (disable cache for workspace deps)
    force: process.env.FORCE_OPTIMIZE === "true",
  },
  // Disable caching for development to always get fresh workspace packages
  cacheDir: process.env.NODE_ENV === "development" ? ".vite-dev" : ".vite",
});
