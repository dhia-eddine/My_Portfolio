/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0f",
          800: "#0f0f16",
          700: "#14141d",
        },
        paper: "#ededf2",
        mute: "#8e8e9d",
        accent: {
          DEFAULT: "#8757ff",
          soft: "#b9a6ff",
        },
        line: "rgba(237,237,242,0.09)",
      },
      fontFamily: {
        display: ["'Clash Display'", "Inter", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(3.25rem, 10.5vw, 10rem)",
          { lineHeight: "0.92", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 6.5vw, 5.5rem)",
          { lineHeight: "1", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.75rem, 3.6vw, 3rem)",
          { lineHeight: "1.08", letterSpacing: "-0.01em" },
        ],
      },
      screens: {
        xs: "450px",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.625, 0.05, 0, 1)",
      },
    },
  },
  plugins: [],
};
