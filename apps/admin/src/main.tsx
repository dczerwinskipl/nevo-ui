import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MOCKS === "true") {
    const { setupMocks } = await import("@nevo/api-mocks/browser");
    const { handlers } = await import("./mocks");

    const mockService = setupMocks();
    mockService.use(...handlers);
    return mockService.start();
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
