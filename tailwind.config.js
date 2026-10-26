/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "mute-light": "var(--mute-light)",
        "mute-dark": "var(--mute-dark)",
        signal: "var(--signal)",
      },
      fontFamily: {
        display: ["'Syne'", "'Bricolage Grotesque'", "'Clash Display'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "'Bricolage Grotesque'", "'Cabinet Grotesk'", "sans-serif"],
        bricolage: ["'Bricolage Grotesque'", "sans-serif"],
        syne: ["'Syne'", "sans-serif"],
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"],
        space: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Space Grotesk'", "monospace"],
      },
      maxWidth: {
        content: "1440px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        wideMono: "0.12em",
      },
    },
  },
  plugins: [],
}
