/**
 * Shared Tailwind configuration for nEvo Design System
 *
 * This preset contains:
 * - Theme color tokens (CSS variables)
 * - Intent-based colors
 * - Shadow utilities
 * - Custom border radius
 * - Safelist for dynamic helper classes
 *
 * Usage in consuming apps:
 * ```js
 * // tailwind.config.cjs
 * module.exports = {
 *   presets: [require('@nevo/design-system/tailwind.preset.cjs')],
 *   content: ['./src/** /*.{ts,tsx}'],
 * }
 * ```
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Surface elevation scale - from deepest to highest
        surface: {
          50: "var(--color-surface-50)",
          100: "var(--color-surface-100)",
          200: "var(--color-surface-200)",
          300: "var(--color-surface-300)",
          400: "var(--color-surface-400)",
          500: "var(--color-surface-500)",
          600: "var(--color-surface-600)",
          700: "var(--color-surface-700)",
          800: "var(--color-surface-800)",
          900: "var(--color-surface-900)",
        },

        // Legacy aliases (backward compatibility - will be deprecated)
        page: "var(--color-page)",
        card: "var(--color-card)",
        raised: "var(--color-raised)",

        // Text colors
        text: "var(--color-text)",
        muted: "var(--color-muted)",

        // Border colors
        border: "var(--color-border)",

        // Primary brand colors
        primary: {
          DEFAULT: "var(--color-primary-base)",
          hover: "var(--color-primary-hover)",
        },

        // Intent colors - background
        "intent-primary-bg": "var(--color-intent-primary-bg)",
        "intent-success-bg": "var(--color-intent-success-bg)",
        "intent-warning-bg": "var(--color-intent-warning-bg)",
        "intent-error-bg": "var(--color-intent-error-bg)",
        "intent-info-bg": "var(--color-intent-info-bg)",
        "intent-neutral-bg": "var(--color-intent-neutral-bg)",

        // Intent colors - border
        "intent-primary": "var(--color-intent-primary-border)",
        "intent-success": "var(--color-intent-success-border)",
        "intent-warning": "var(--color-intent-warning-border)",
        "intent-error": "var(--color-intent-error-border)",
        "intent-info": "var(--color-intent-info-border)",
        "intent-neutral": "var(--color-intent-neutral-border)",

        // Intent colors - text
        "intent-primary-text": "var(--color-intent-primary-text)",
        "intent-success-text": "var(--color-intent-success-text)",
        "intent-warning-text": "var(--color-intent-warning-text)",
        "intent-error-text": "var(--color-intent-error-text)",
        "intent-info-text": "var(--color-intent-info-text)",
        "intent-neutral-text": "var(--color-intent-neutral-text)",

        // State colors
        "state-success": "var(--color-state-success)",
        "state-warning": "var(--color-state-warning)",
        "state-error": "var(--color-state-error)",
        "state-info": "var(--color-state-info)",
        "state-disabled": "var(--color-state-disabled)",
        "state-loading": "var(--color-state-loading)",
      },
      borderRadius: {
        xl2: "1rem",
      },
      backgroundImage: {
        // Inset (recessed) - inputs, embedded elements
        // Dark: 100 → 50 (dark recessed look)
        // Light: 400 → 500 (darker top → lighter bottom)
        "gradient-inset":
          "linear-gradient(145deg, var(--color-surface-100) 0%, var(--color-surface-50) 100%)",

        // Card - default surface elevation
        // Dark: 400 → 300 (lighter top → darker bottom, raised)
        // Light: 500 → 400 (lighter top → darker bottom, raised)
        "gradient-card":
          "linear-gradient(180deg, var(--color-surface-400) 0%, var(--color-surface-300) 100%)",

        // Elevated - medium elevation
        // Dark: 600 → 500 (lighter top → darker bottom, more raised)
        // Light: 700 → 600 (lighter/whiter top → slightly darker)
        "gradient-elevated":
          "linear-gradient(180deg, var(--color-surface-600) 0%, var(--color-surface-500) 100%)",

        // Raised - highest elevation for headers, toolbars
        // Dark: 800 → 700 (lightest top → darker bottom, most raised)
        // Light: 900 → 800 (pure white top → slightly off)
        "gradient-raised":
          "linear-gradient(180deg, var(--color-surface-800) 0%, var(--color-surface-700) 100%)",
      },
      boxShadow: {
        // Note: Suffix -depth prevents collision with color names (raised, card)
        // Tailwind would otherwise treat shadow-raised as shadow with color 'raised'

        // Inset shadow - for recessed elements (inputs)
        // Uses --shadow-inset variable (dark: strong, light: subtle)
        "inset-depth":
          "inset 3px 3px 6px var(--shadow-inset), inset -1px -1px 2px var(--shadow-highlight)",

        // Card shadow - default elevation
        // Uses --shadow-card variable (dark: 0.6, light: 0.04)
        "card-depth":
          "0 2px 4px var(--shadow-card), 0 1px 2px var(--shadow-card), inset 0 1px 0 var(--shadow-highlight)",

        // Elevated shadow - medium elevation
        // Uses --shadow-elevated variable (dark: 0.7, light: 0.06)
        "elevated-depth":
          "0 4px 8px var(--shadow-elevated), 0 2px 4px var(--shadow-elevated), inset 0 1px 0 var(--shadow-highlight)",

        // Raised shadow - highest elevation
        // Uses --shadow-raised variable (dark: 0.8, light: 0.08)
        "raised-depth":
          "0 8px 16px var(--shadow-raised), 0 4px 8px var(--shadow-raised), inset 0 2px 0 var(--shadow-highlight)",

        // Focus shadow for input elements
        "inset-focus":
          "inset 3px 3px 6px rgba(59, 130, 246, 0.4), inset -1px -1px 2px var(--shadow-highlight)",
      },
    },
  },
  safelist: [
    // Gradient backgrounds
    "bg-gradient-inset",
    "bg-gradient-card",
    "bg-gradient-elevated",
    "bg-gradient-raised",
    // Shadow variants (with -depth suffix to avoid color name collision)
    "shadow-inset-depth",
    "shadow-card-depth",
    "shadow-elevated-depth",
    "shadow-raised-depth",
    "shadow-inset-focus",
    // Border classes used in elevation
    "border",
    "border-border",
    // Shadow classes from getShadowClasses() helper
    "shadow-[0_1px_3px_var(--shadow-color)]",
    "shadow-[0_2px_6px_var(--shadow-color)]",
    "shadow-[0_4px_8px_var(--shadow-color),0_2px_4px_var(--shadow-color)]",
    "shadow-[0_10px_30px_var(--shadow-color),0_6px_10px_var(--shadow-color)]",
    // Transition classes from getTransitionClasses() helper
    "transition-all",
    "duration-150",
    "duration-200",
    "duration-300",
    // Interactive classes from getInteractiveClasses() helper
    {
      pattern: /hover:scale-\[(1\.02|105)\]/,
    },
    // Touch target classes from getTouchTargetClasses() helper
    {
      pattern: /min-[hw]-\[(36|40|44|48)px\]/,
    },
    "touch-manipulation",
  ],
};
