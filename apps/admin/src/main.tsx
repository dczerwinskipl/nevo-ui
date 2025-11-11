import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

async function enableMocking() {
  // Enable mocks in development or when explicitly enabled via env var
  const shouldEnableMocks =
    import.meta.env.DEV || import.meta.env.VITE_ENABLE_MOCKS === "true";

  if (shouldEnableMocks) {
    try {
      console.log("[MSW] Starting service worker...");
      const { setupMocks } = await import("@nevo/api-mocks/browser");
      const { handlers } = await import("./mocks");

      const mockService = setupMocks(handlers);
      await mockService.start();
      console.log("[MSW] Service worker started successfully");
    } catch (error) {
      console.error("[MSW] Failed to start service worker:", error);
      throw error;
    }
  } else {
    console.log("[MSW] Mocking disabled (production mode)");
  }
}

enableMocking()
  .then(() => {
    console.log("[App] Rendering application...");
    createRoot(document.getElementById("root")!).render(<App />);
  })
  .catch((error) => {
    console.error("[App] Failed to initialize:", error);
    // Show error in the DOM if MSW fails to start
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <div style="padding: 20px; font-family: sans-serif;">
          <h1>Application Error</h1>
          <p>Failed to initialize the application. Please check the console for details.</p>
          <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error}</pre>
        </div>
      `;
    }
  });
