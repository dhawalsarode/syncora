/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E2E8F0",

        primary: "#2563EB",
        success: "#22C55E",
        danger: "#EF4444",

        text: "#0F172A",
        secondary: "#64748B",
      },
    },
  },
  plugins: [],
};