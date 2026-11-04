import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { ink: "#4b3a72", paper: "#ffffff", mute: "#d4cbe9", dim: "#d4cbe9", line: "rgba(255,255,255,.22)", panel: "#5b4888", accent: "#e8d8ff" },
    fontFamily: { sans: ["var(--font-sans)"], serif: ["var(--font-serif)"], mono: ["var(--font-sans)"] },
  } },
  plugins: [],
} satisfies Config;
