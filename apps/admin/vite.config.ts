import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // Include workspace packages in dependency optimization
    include: ["@nevo/design-system", "@nevo/api-client", "@nevo/api-mocks"],
  },
});
