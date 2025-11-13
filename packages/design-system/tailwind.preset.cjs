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
        // Base surface colors
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
    },
  },
  safelist: [
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
