import React, { createContext, useContext, useMemo, useState } from "react";

// Intent and variant types
export type ComponentIntent =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";
export type ComponentVariant = "solid" | "outline" | "ghost" | "subtle";
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

export type Tokens = {
  // 3-layer background system
  page: string; // deepest background
  card: string; // middle layer - cards, panels
  raised: string; // top layer - buttons, inputs, highlighted elements

  // Text colors
  text: string; // primary text
  muted: string; // secondary text
  border: string; // borders and dividers

  // Primary brand colors
  primary: {
    base: string; // #6d6aff
    gradient: string; // linear-gradient(135deg, #6d6aff 0%, #8a5cff 100%)
    hover: string; // #8a5cff
  };

  // Shadows for elevation
  shadow: {
    sm: string; // subtle shadow for cards
    md: string; // medium shadow for raised elements
    lg: string; // strong shadow for modals, dropdowns
    inner: string; // inner highlight for top edge
  };

  // Intent-based semantic colors
  intent: {
    primary: { bg: string; border: string; text: string };
    success: { bg: string; border: string; text: string };
    warning: { bg: string; border: string; text: string };
    error: { bg: string; border: string; text: string };
    info: { bg: string; border: string; text: string };
    neutral: { bg: string; border: string; text: string };
  };
  
  // Component-specific semantic tokens
  components: {
    badge: {
      primary: { bg: string; border: string; text: string };
      success: { bg: string; border: string; text: string };
      warning: { bg: string; border: string; text: string };
      error: { bg: string; border: string; text: string };
      info: { bg: string; border: string; text: string };
      neutral: { bg: string; border: string; text: string };
    };
    button: {
      primary: { bg: string; border: string; text: string; hover: string };
      success: { bg: string; border: string; text: string; hover: string };
      warning: { bg: string; border: string; text: string; hover: string };
      error: { bg: string; border: string; text: string; hover: string };
      info: { bg: string; border: string; text: string; hover: string };
      neutral: { bg: string; border: string; text: string; hover: string };
    };
    input: {
      default: { bg: string; border: string; text: string; placeholder: string };
      focus: { bg: string; border: string; text: string; ring: string };
      error: { bg: string; border: string; text: string; ring: string };
      success: { bg: string; border: string; text: string; ring: string };
      warning: { bg: string; border: string; text: string; ring: string };
      disabled: { bg: string; border: string; text: string };
    };
    table: {
      header: { bg: string; border: string; text: string };
      row: { bg: string; border: string; text: string; hover: string };
      cell: { bg: string; border: string; text: string };
    };
  };
  
  // Semantic state colors
  states: {
    success: string;
    warning: string;
    error: string;
    info: string;
    disabled: string;
    loading: string;
  };
};

const surface = {
  dark: {
    page: "#0a0d11", // darkest background
    card: "#151922", // card background with subtle gradient support
    raised: "#1f242d", // raised elements (buttons, inputs)
    text: "#e2e8f0", // primary text
    muted: "#94a3b8", // secondary text
    border: "#2a3441", // borders
    primary: {
      base: "#6d6aff",
      gradient: "linear-gradient(135deg, #6d6aff 0%, #8a5cff 100%)",
      hover: "#8a5cff",
    },
    shadow: {
      sm: "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
      md: "0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.25)",
      lg: "0 10px 30px rgba(0,0,0,0.5), 0 6px 10px rgba(0,0,0,0.35)",
      inner: "inset 0 1px 0 rgba(255,255,255,0.08)",
    },
    intent: {
      primary: {
        bg: "rgba(109,106,255,0.15)",
        border: "rgba(109,106,255,0.3)",
        text: "#a5b4fc",
      },
      success: {
        bg: "rgba(34,197,94,0.15)",
        border: "rgba(34,197,94,0.3)",
        text: "#86efac",
      },
      warning: {
        bg: "rgba(245,158,11,0.15)",
        border: "rgba(245,158,11,0.3)",
        text: "#fbbf24",
      },
      error: {
        bg: "rgba(239,68,68,0.15)",
        border: "rgba(239,68,68,0.3)",
        text: "#fca5a5",
      },
      info: {
        bg: "rgba(59,130,246,0.15)",
        border: "rgba(59,130,246,0.3)",
        text: "#93c5fd",
      },
      neutral: {
        bg: "rgba(148,163,184,0.15)", // muted color with opacity
        border: "rgba(148,163,184,0.3)",
        text: "#94a3b8", // same as muted
      },
    },
    
    components: {
      badge: {
        primary: { bg: "rgba(109,106,255,0.2)", border: "rgba(109,106,255,0.4)", text: "#a5b4fc" },
        success: { bg: "rgba(34,197,94,0.2)", border: "rgba(34,197,94,0.4)", text: "#86efac" },
        warning: { bg: "rgba(245,158,11,0.2)", border: "rgba(245,158,11,0.4)", text: "#fbbf24" },
        error: { bg: "rgba(239,68,68,0.2)", border: "rgba(239,68,68,0.4)", text: "#fca5a5" },
        info: { bg: "rgba(59,130,246,0.2)", border: "rgba(59,130,246,0.4)", text: "#93c5fd" },
        neutral: { bg: "rgba(148,163,184,0.2)", border: "rgba(148,163,184,0.4)", text: "#94a3b8" },
      },
      button: {
        primary: { bg: "#6d6aff", border: "#6d6aff", text: "#ffffff", hover: "#8a5cff" },
        success: { bg: "#22c55e", border: "#22c55e", text: "#ffffff", hover: "#16a34a" },
        warning: { bg: "#f59e0b", border: "#f59e0b", text: "#ffffff", hover: "#d97706" },
        error: { bg: "#ef4444", border: "#ef4444", text: "#ffffff", hover: "#dc2626" },
        info: { bg: "#3b82f6", border: "#3b82f6", text: "#ffffff", hover: "#2563eb" },
        neutral: { bg: "#1f242d", border: "#2a3441", text: "#e2e8f0", hover: "#2a3441" },
      },
      input: {
        default: { bg: "#151922", border: "#2a3441", text: "#e2e8f0", placeholder: "#94a3b8" },
        focus: { bg: "#151922", border: "#6d6aff", text: "#e2e8f0", ring: "rgba(109,106,255,0.3)" },
        error: { bg: "#151922", border: "#ef4444", text: "#e2e8f0", ring: "rgba(239,68,68,0.3)" },
        success: { bg: "#151922", border: "#22c55e", text: "#e2e8f0", ring: "rgba(34,197,94,0.3)" },
        warning: { bg: "#151922", border: "#f59e0b", text: "#e2e8f0", ring: "rgba(245,158,11,0.3)" },
        disabled: { bg: "#0a0d11", border: "#2a3441", text: "#64748b" },
      },
      table: {
        header: { bg: "#1f242d", border: "#2a3441", text: "#e2e8f0" },
        row: { bg: "#151922", border: "#2a3441", text: "#e2e8f0", hover: "#1f242d" },
        cell: { bg: "transparent", border: "#2a3441", text: "#e2e8f0" },
      },
    },
    
    states: {
      success: "#22c55e",
      warning: "#f59e0b", 
      error: "#ef4444",
      info: "#3b82f6",
      disabled: "#64748b",
      loading: "#6d6aff",
    },
  },
  light: {
    page: "#f8fafc", // lightest background
    card: "#ffffff", // pure white for cards
    raised: "#f1f5f9", // slightly darker for raised elements
    text: "#0f172a", // dark text
    muted: "#64748b", // muted text
    border: "#e2e8f0", // light borders
    primary: {
      base: "#6d6aff",
      gradient: "linear-gradient(135deg, #6d6aff 0%, #8a5cff 100%)",
      hover: "#8a5cff",
    },
    shadow: {
      sm: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
      md: "0 4px 8px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
      lg: "0 10px 30px rgba(0,0,0,0.12), 0 6px 10px rgba(0,0,0,0.08)",
      inner: "inset 0 1px 0 rgba(255,255,255,0.9)",
    },
    intent: {
      primary: {
        bg: "rgba(109,106,255,0.1)",
        border: "rgba(109,106,255,0.25)",
        text: "#4338ca",
      },
      success: {
        bg: "rgba(34,197,94,0.1)",
        border: "rgba(34,197,94,0.25)",
        text: "#166534",
      },
      warning: {
        bg: "rgba(245,158,11,0.1)",
        border: "rgba(245,158,11,0.25)",
        text: "#92400e",
      },
      error: {
        bg: "rgba(239,68,68,0.1)",
        border: "rgba(239,68,68,0.25)",
        text: "#dc2626",
      },
      info: {
        bg: "rgba(59,130,246,0.1)",
        border: "rgba(59,130,246,0.25)",
        text: "#1e40af",
      },
      neutral: {
        bg: "rgba(100,116,139,0.1)", // muted color with opacity
        border: "rgba(100,116,139,0.25)",
        text: "#64748b", // same as muted
      },
    },
    
    components: {
      badge: {
        primary: { bg: "rgba(109,106,255,0.15)", border: "rgba(109,106,255,0.3)", text: "#4338ca" },
        success: { bg: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)", text: "#166534" },
        warning: { bg: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", text: "#92400e" },
        error: { bg: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.3)", text: "#dc2626" },
        info: { bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.3)", text: "#1e40af" },
        neutral: { bg: "rgba(100,116,139,0.15)", border: "rgba(100,116,139,0.3)", text: "#64748b" },
      },
      button: {
        primary: { bg: "#6d6aff", border: "#6d6aff", text: "#ffffff", hover: "#5b58e8" },
        success: { bg: "#22c55e", border: "#22c55e", text: "#ffffff", hover: "#16a34a" },
        warning: { bg: "#f59e0b", border: "#f59e0b", text: "#ffffff", hover: "#d97706" },
        error: { bg: "#ef4444", border: "#ef4444", text: "#ffffff", hover: "#dc2626" },
        info: { bg: "#3b82f6", border: "#3b82f6", text: "#ffffff", hover: "#2563eb" },
        neutral: { bg: "#f1f5f9", border: "#e2e8f0", text: "#0f172a", hover: "#e2e8f0" },
      },
      input: {
        default: { bg: "#ffffff", border: "#e2e8f0", text: "#0f172a", placeholder: "#64748b" },
        focus: { bg: "#ffffff", border: "#6d6aff", text: "#0f172a", ring: "rgba(109,106,255,0.2)" },
        error: { bg: "#ffffff", border: "#ef4444", text: "#0f172a", ring: "rgba(239,68,68,0.2)" },
        success: { bg: "#ffffff", border: "#22c55e", text: "#0f172a", ring: "rgba(34,197,94,0.2)" },
        warning: { bg: "#ffffff", border: "#f59e0b", text: "#0f172a", ring: "rgba(245,158,11,0.2)" },
        disabled: { bg: "#f8fafc", border: "#e2e8f0", text: "#94a3b8" },
      },
      table: {
        header: { bg: "#f1f5f9", border: "#e2e8f0", text: "#0f172a" },
        row: { bg: "#ffffff", border: "#e2e8f0", text: "#0f172a", hover: "#f8fafc" },
        cell: { bg: "transparent", border: "#e2e8f0", text: "#0f172a" },
      },
    },
    
    states: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444", 
      info: "#3b82f6",
      disabled: "#94a3b8",
      loading: "#6d6aff",
    },
  },
};

const ThemeCtx = createContext<{
  dark: boolean;
  setDark: (b: boolean) => void;
  tokens: Tokens;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(true);
  const tokens = useMemo(() => (dark ? surface.dark : surface.light), [dark]);

  // Apply page background to body and theme class
  React.useEffect(() => {
    const body = document.body;
    body.style.backgroundColor = tokens.page;
    body.style.color = tokens.text;
    body.style.margin = "0";
    body.style.padding = "0";
    body.setAttribute("data-theme", dark ? "dark" : "light");

    // Also apply to html for complete coverage
    const html = document.documentElement;
    html.style.backgroundColor = tokens.page;
    html.style.color = tokens.text;

    return () => {
      // Cleanup if needed
      body.removeAttribute("data-theme");
    };
  }, [tokens, dark]);

  return (
    <ThemeCtx.Provider value={{ dark, setDark, tokens }}>
      {children}
    </ThemeCtx.Provider>
  );
}
export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

// Helper functions for creating elevation styles
export function cardStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(180deg, ${lighten(tokens.card, 0.02)} 0%, ${
      tokens.card
    } 100%)`,
    boxShadow: `${tokens.shadow.sm}, ${tokens.shadow.inner}`,
    border: `1px solid ${tokens.border}`,
  };
}

export function raisedStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(180deg, ${lighten(tokens.raised, 0.03)} 0%, ${
      tokens.raised
    } 100%)`,
    boxShadow: `${tokens.shadow.md}, ${tokens.shadow.inner}`,
    border: `1px solid ${tokens.border}`,
  };
}

export function elevatedStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(180deg, ${lighten(tokens.raised, 0.05)} 0%, ${
      tokens.raised
    } 100%)`,
    boxShadow: `${tokens.shadow.lg}, ${tokens.shadow.inner}`,
    border: `1px solid ${tokens.border}`,
  };
}

export function concaveStyle(tokens: Tokens) {
  return {
    background: `linear-gradient(145deg, ${tokens.page} 0%, ${tokens.card} 100%)`,
    border: `1px solid ${tokens.border}`,
    boxShadow: `inset 2px 2px 4px ${
      tokens.shadow.sm.split(",")[0]
    }, inset -1px -1px 2px rgba(255,255,255,0.05)`,
  };
}

// Intent variant helpers - transform bg/border/text into different variants
export function getIntentStyle(
  tokens: Tokens,
  intent: ComponentIntent,
  variant: ComponentVariant = "subtle"
) {
  const intentColors = tokens.intent[intent];

  switch (variant) {
    case "solid":
      return {
        background: intentColors.text, // Use text color as solid background
        color: tokens.page, // Contrasting text (page background)
        border: `1px solid ${intentColors.text}`,
      };
    case "outline":
      return {
        background: "transparent",
        color: intentColors.text,
        border: `1px solid ${intentColors.border}`,
      };
    case "ghost":
      return {
        background: "transparent",
        color: intentColors.text,
        border: "1px solid transparent",
      };
    case "subtle":
    default:
      return {
        background: intentColors.bg,
        color: intentColors.text,
        border: `1px solid ${intentColors.border}`,
      };
  }
}

// Color utilities
function lighten(color: string, amount: number) {
  const { r, g, b } = hexToRgb(color);
  const factor = 1 + amount;
  const newR = Math.min(255, Math.round(r + (255 - r) * amount));
  const newG = Math.min(255, Math.round(g + (255 - g) * amount));
  const newB = Math.min(255, Math.round(b + (255 - b) * amount));
  return `rgb(${newR}, ${newG}, ${newB})`;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}
