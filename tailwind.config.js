/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0d12",
        panel: "#10141b",
        line: "#1f2732",
        paper: "#e9e7e0",
        muted: "#8b93a1",
        copper: "#c97d4b",
        copperLight: "#e0a273",
        slate: "#5b8291",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      letterSpacing: {
        tightest2: "-0.04em",
      },
    },
  },
  plugins: [],
};
