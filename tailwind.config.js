/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 20px 80px -10px rgba(0,0,0,0.6)",
        "glow-violet": "0 0 30px rgba(145,94,255,0.3)",
      },
      screens: {
        xs: "450px",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
