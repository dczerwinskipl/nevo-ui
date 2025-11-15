import type { Tokens } from "./types";

export const tokens = {
  dark: {
    // Surface elevation scale - Progressive lightening for dark theme
    // Each step creates visible depth difference
    surface: {
      50: "#06080b", // Deepest - page background (darker)
      100: "#0a0d11", // Inset elements (recessed, dark)
      200: "#0e1218", // Low elevation
      300: "#12171f", // Medium-low
      400: "#151922", // Medium - default cards
      500: "#1a1f2a", // Medium-high
      600: "#1f2532", // High - elevated cards
      700: "#242b3a", // Very high - raised elements
      800: "#293042", // Headers, toolbars
      900: "#2e364a", // Peak elevation (lightest)
    },

    // Legacy aliases (backward compatibility)
    page: "#06080b", // = surface.50 (darker background)
    card: "#151922", // = surface.400 (default cards)
    raised: "#293042", // = surface.800 (raised elements)

    gradients: {
      // Card: subtle gradient (400 → 300)
      card: "linear-gradient(180deg, #151922 0%, #12171f 100%)",
      // Raised: more prominent (800 → 700)
      raised: "linear-gradient(180deg, #293042 0%, #242b3a 100%)",
      // Input: inset effect (100 → 50) - DARK recessed look
      input: "linear-gradient(145deg, #0a0d11 0%, #06080b 100%)",
    },
    text: "#e2e8f0", // primary text
    muted: "#94a3b8", // secondary text
    border: "#2a3441", // borders
    primary: {
      base: "#6d6aff",
      gradient: "linear-gradient(135deg, #6d6aff 0%, #8a5cff 100%)",
      hover: "#8a5cff",
    },
    shadow: {
      color: "rgba(0,0,0,0.4)", // main shadow color for dark theme (legacy)
      highlight: "rgba(255,255,255,0.08)", // inner highlight color
      // Dedicated shadow colors for different elevation levels (dark theme)
      inset: "rgba(0, 0, 0, 0.5)", // Strong dark for inset
      card: "rgba(0, 0, 0, 0.6)", // Dark shadow for cards
      elevated: "rgba(0, 0, 0, 0.7)", // Stronger for elevated
      raised: "rgba(0, 0, 0, 0.8)", // Strongest for highest elevation
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
    states: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
      disabled: "#64748b",
      loading: "#6d6aff",
    },
  } satisfies Tokens,

  light: {
    // Surface elevation scale - Progressive lightening for light theme
    // IMPORTANT: In light theme, higher elevation = LIGHTER (closer to viewer)
    // 50-200: Page/background (medium gray)
    // 300-500: Cards (lighter)
    // 600-900: Raised elements (nearly white - closest to viewer)
    surface: {
      50: "#e8ecf1", // Page background - medium gray
      100: "#ecf0f4", // Very subtle lift
      200: "#f0f3f7", // Default depth
      300: "#f3f6f9", // Card base - comfortable
      400: "#f6f8fb", // Medium elevation
      500: "#f8fafc", // Medium-high
      600: "#fafbfd", // High elevation - raised cards
      700: "#fcfcfe", // Headers, toolbars - very light
      800: "#fdfdfe", // Very high
      900: "#ffffff", // Peak elevation - pure white (closest to viewer)
    },

    // Legacy aliases (backward compatibility)
    page: "#e8ecf1", // = surface.50 (medium gray background)
    card: "#f8fafc", // = surface.500 (lighter - default cards)
    raised: "#fcfcfe", // = surface.700 (nearly white - elevated)

    gradients: {
      // Card: subtle gradient (500 → 400) lighter top
      card: "linear-gradient(180deg, #f8fafc 0%, #f6f8fb 100%)",
      // Raised: more prominent (700 → 600) nearly white
      raised: "linear-gradient(180deg, #fcfcfe 0%, #fafbfd 100%)",
      // Input: inset effect (400 → 500) - reversed for recessed look
      input: "linear-gradient(145deg, #f6f8fb 0%, #f8fafc 100%)",
    },
    text: "#0f172a", // dark text
    muted: "#64748b", // muted text
    border: "#e2e8f0", // light borders
    primary: {
      base: "#6d6aff",
      gradient: "linear-gradient(135deg, #6d6aff 0%, #8a5cff 100%)",
      hover: "#8a5cff",
    },
    shadow: {
      color: "rgba(0,0,0,0.1)", // Softer for light theme (legacy)
      highlight: "rgba(255,255,255,0.9)", // Inner highlight color
      // Dedicated shadow colors for different elevation levels (light theme)
      // Much softer and more subtle than dark theme
      inset: "rgba(0, 0, 0, 0.06)", // Very subtle inset
      card: "rgba(0, 0, 0, 0.04)", // Gentle shadow for cards
      elevated: "rgba(0, 0, 0, 0.06)", // Medium shadow
      raised: "rgba(0, 0, 0, 0.08)", // Slightly stronger for highest elevation
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
    states: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
      disabled: "#94a3b8",
      loading: "#6d6aff",
    },
  } satisfies Tokens,
};
