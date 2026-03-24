import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        card: "#18181b",
        border: "#27272a",
        accent: "#3b82f6",
        "accent-glow": "rgba(59,130,246,0.3)",
        muted: "#71717a",
        "muted-fg": "#a1a1aa",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      gridTemplateColumns: {
        "12": "repeat(12, minmax(0, 1fr))",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      boxShadow: {
        "accent-glow": "0 0 20px rgba(59,130,246,0.25)",
        "accent-glow-lg": "0 0 40px rgba(59,130,246,0.35)",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(39,39,42,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(39,39,42,0.4) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "32px 32px",
      },
    },
  },
  plugins: [],
};

export default config;
