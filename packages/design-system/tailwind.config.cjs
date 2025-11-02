/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6d6aff",
          2: "#8a5cff",
          accent: "#3cc2ff"
        },
        surface: {
          page: "#0b0f14",
          card: "#111726",
          raised: "#1a2030"
        }
      },
      borderRadius: {
        xl2: "1rem"
      }
    }
  },
  plugins: []
}
