/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
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
  plugins: [],
};
