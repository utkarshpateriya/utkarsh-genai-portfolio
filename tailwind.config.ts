import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "neural-black": "#0a0a0a",
        "neural-dark": "#111111",
        "cyber-cyan": "#00f5ff",
        "neon-violet": "#9d00ff",
        "dim-gray": "#888888",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
        display: ['"Orbitron"', "sans-serif"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        glitch: "glitch 2s infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", textShadow: "0 0 10px #00f5ff" },
          "50%": { opacity: "1", textShadow: "0 0 30px #00f5ff, 0 0 60px #00f5ff" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
