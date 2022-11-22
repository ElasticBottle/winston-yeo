/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    letterSpacing: {
      wider: ".1em",
      widest: ".25em",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-albert-sans)"],
      },
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
        content: "rgb(var(--color-text-primary) / <alpha-value>)",
        "content-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
        base: "rgb(var(--color-base-primary) / <alpha-value>)",
        "base-secondary": "rgb(var(--color-base-secondary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
