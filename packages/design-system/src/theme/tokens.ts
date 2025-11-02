import type { Tokens } from "./types";

export const tokens = {
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
      color: "rgba(0,0,0,0.4)", // main shadow color for dark theme
      highlight: "rgba(255,255,255,0.08)", // inner highlight color
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
      color: "rgba(0,0,0,0.1)", // main shadow color for light theme
      highlight: "rgba(255,255,255,0.9)", // inner highlight color
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
