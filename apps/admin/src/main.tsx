import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

async function enableMocking() {
  console.log("MSW: Checking if mocks should be enabled...", {
    VITE_ENABLE_MOCKS: import.meta.env.VITE_ENABLE_MOCKS,
    MODE: import.meta.env.MODE,
    DEV: import.meta.env.DEV,
    location: window.location.href,
  });

  if (import.meta.env.VITE_ENABLE_MOCKS === "true") {
    console.log("MSW: Initializing mocks...");
    try {
      // Check if service worker file is accessible
      const response = await fetch("/mockServiceWorker.js", { method: "HEAD" });
      console.log("MSW: Service worker file check:", {
        status: response.status,
        contentType: response.headers.get("content-type"),
        ok: response.ok,
      });

      if (!response.ok) {
        throw new Error(`Service worker file not found: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (
        contentType &&
        !contentType.includes("javascript") &&
        !contentType.includes("text/plain")
      ) {
        console.warn(
          "MSW: Service worker has unexpected MIME type:",
          contentType
        );
      }

      const { setupMocks } = await import("@nevo/api-mocks/browser");
      const { handlers } = await import("./mocks");

      console.log("MSW: Setting up worker with handlers:", handlers.length);
      const mockService = setupMocks();
      mockService.use(...handlers);

      const result = await mockService.start();
      console.log("MSW: Successfully started service worker");
      return result;
    } catch (error) {
      console.error("MSW: Failed to initialize:", error);
      console.warn(
        "MSW: Continuing without mocks - real API calls will be made"
      );
      // Don't throw to prevent app crash
    }
  } else {
    console.log("MSW: Mocks disabled via environment variable");
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
