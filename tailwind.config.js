/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans:    ["'DM Sans'", "sans-serif"],
        display: ["'Syne'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f7ff", 100: "#e0efff", 200: "#baddff",
          300: "#7dc0ff", 400: "#389bff", 500: "#0d7eff",
          600: "#0062f5", 700: "#004de0", 800: "#0040b5", 900: "#003a8e", 950: "#00245c",
        },
        accent: { green: "#10b981", purple: "#8b5cf6", orange: "#f59e0b", red: "#ef4444" },
      },
      animation: {
        "fade-up":     "fadeUp 0.5s ease forwards",
        "fade-in":     "fadeIn 0.4s ease forwards",
        "slide-right": "slideRight 0.4s ease forwards",
      },
      keyframes: {
        fadeUp:     { "0%": { opacity: 0, transform: "translateY(20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn:     { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideRight: { "0%": { opacity: 0, transform: "translateX(-20px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};