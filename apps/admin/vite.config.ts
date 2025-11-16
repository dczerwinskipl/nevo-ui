import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Plugin to watch design-system dist folder and trigger full reload on changes
function watchDesignSystem(): Plugin {
  return {
    name: "watch-design-system",
    configureServer(server) {
      const designSystemDist = path.resolve(
        __dirname,
        "../../packages/design-system/dist"
      );

      server.watcher.add(path.join(designSystemDist, "**/*"));

      server.watcher.on("change", (file) => {
        if (file.includes("design-system/dist")) {
          console.log(`[HMR] Design system changed: ${path.basename(file)}`);
          server.ws.send({
            type: "full-reload",
            path: "*",
          });
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), watchDesignSystem()],

  server: {
    port: 5173,
  },

  resolve: {
    dedupe: ["react", "react-dom"],
    // Alias design-system to its dist folder to bypass pre-bundling
    alias: {
      "@nevo/design-system": path.resolve(
        __dirname,
        "../../packages/design-system/dist"
      ),
    },
  },

  optimizeDeps: {
    // Exclude design-system from pre-bundling
    exclude: ["@nevo/design-system"],
  },
});
