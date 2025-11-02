import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@nevo/design-system";
import { router } from "./router";

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
