import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    watch: {
      // Watch workspace packages - Vite should detect changes in node_modules/@nevo
      ignored: ["!**/node_modules/@nevo/**"],
    },
  },

  resolve: {
    dedupe: ["react", "react-dom"],
  },

  optimizeDeps: {
    // Force Vite to include workspace packages in optimization
    // This ensures changes to these packages trigger HMR
    include: ["@nevo/design-system", "@nevo/api-client", "@nevo/api-mocks"],
  },
});
