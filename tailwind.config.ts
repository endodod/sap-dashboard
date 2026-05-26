import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0F",
        surface: "#12121A",
        acid: "#A259FF",
        amber: "#FFB347",
        muted: "#4A4A5A",
        text: "#E8E8F0",
        "text-dim": "#8888A0",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
        ui: ["var(--font-geist)", "sans-serif"],
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-delay-1": "float 4s ease-in-out 0.5s infinite",
        "float-delay-2": "float 4s ease-in-out 1s infinite",
        "float-delay-3": "float 4s ease-in-out 1.5s infinite",
        "float-delay-4": "float 4s ease-in-out 2s infinite",
        "chevron-bounce": "chevronBounce 1.5s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        chevronBounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
