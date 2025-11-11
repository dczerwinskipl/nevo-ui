import React, { createContext, useContext, useMemo, useState } from "react";
import type { Tokens } from "./types";
import { tokens } from "./tokens";
import { generateCSSVariables } from "./cssVariables";

const ThemeCtx = createContext<{
  dark: boolean;
  setDark: (b: boolean) => void;
  tokens: Tokens;
} | null>(null);

// Export the context for use in Storybook
export { ThemeCtx };

export function ThemeProvider({
  children,
  initialDark = true,
}: {
  children: React.ReactNode;
  initialDark?: boolean;
}) {
  const [dark, setDark] = useState(initialDark);
  const themeTokens = useMemo(
    () => (dark ? tokens.dark : tokens.light),
    [dark]
  );

  // Apply page background to body and theme class
  React.useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = themeTokens.page;
    body.style.color = themeTokens.text;
    body.style.margin = "0";
    body.style.padding = "0";
    body.setAttribute("data-theme", dark ? "dark" : "light");

    // Also apply to html for complete coverage
    const html = document.documentElement;
    html.style.backgroundColor = themeTokens.page;
    html.style.color = themeTokens.text;

    return () => {
      // Cleanup if needed
      body.removeAttribute("data-theme");
    };
  }, [themeTokens, dark]);

  return (
    <ThemeCtx.Provider value={{ dark, setDark, tokens: themeTokens }}>
      {/* Inject CSS variables for theme-aware styling */}
      <style dangerouslySetInnerHTML={{ __html: generateCSSVariables(themeTokens) }} />
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
