/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "DM Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
          hover: "rgb(var(--primary-hover) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          foreground: "rgb(var(--success-foreground) / <alpha-value>)",
          muted: "rgb(var(--success-muted) / <alpha-value>)",
          border: "rgb(var(--success-border) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          foreground: "rgb(var(--warning-foreground) / <alpha-value>)",
          muted: "rgb(var(--warning-muted) / <alpha-value>)",
          border: "rgb(var(--warning-border) / <alpha-value>)",
        },
        danger: {
          DEFAULT: "rgb(var(--danger) / <alpha-value>)",
          foreground: "rgb(var(--danger-foreground) / <alpha-value>)",
          muted: "rgb(var(--danger-muted) / <alpha-value>)",
          border: "rgb(var(--danger-border) / <alpha-value>)",
        },
        review: {
          "correct-bg": "rgb(var(--review-correct-bg) / <alpha-value>)",
          "correct-border": "rgb(var(--review-correct-border) / <alpha-value>)",
          "correct-badge": "rgb(var(--review-correct-badge-bg) / <alpha-value>)",
          "correct-label": "rgb(var(--review-correct-badge-text) / <alpha-value>)",
          "wrong-bg": "rgb(var(--review-wrong-bg) / <alpha-value>)",
          "wrong-border": "rgb(var(--review-wrong-border) / <alpha-value>)",
          "wrong-badge": "rgb(var(--review-wrong-badge-bg) / <alpha-value>)",
          "wrong-label": "rgb(var(--review-wrong-badge-text) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          soft: "rgb(var(--primary-muted) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--foreground) / <alpha-value>)",
          muted: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          muted: "rgb(var(--muted) / <alpha-value>)",
        },
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        glow: "var(--shadow-glow)",
      },
    },
  },
  plugins: [],
};
