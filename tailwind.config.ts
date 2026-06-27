import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        seven: {
          background: "#111111",
          card: "#1a1714",
          green: "#B7E14D",
          terracotta: "#C9714A",
          oak: "#A97A50",
          cream: "#F6ECDD",
          accent: "#C9714A",
          text: "#ffffff",
          muted: "#D5D5D5",
        },
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 18px 70px rgba(201, 113, 74, 0.24)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "seven-radial": "radial-gradient(circle at 24% 12%, rgba(201,113,74,0.22), transparent 36%), radial-gradient(circle at 78% 52%, rgba(183,225,77,0.16), transparent 34%), linear-gradient(135deg, #111111 0%, #1a1714 52%, #111111 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
