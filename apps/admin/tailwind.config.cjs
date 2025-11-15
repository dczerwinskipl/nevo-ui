/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@nevo/design-system/tailwind.preset.cjs")],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/design-system/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // App-specific theme extensions can go here
    },
  },
  plugins: [],
};
