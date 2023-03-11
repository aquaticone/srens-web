/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", ...fontFamily.sans],
      },
      colors: {
        bronze: {
          DEFAULT: "#F5C59F",
          100: "#F5C59F",
          200: "#ad937c",
          300: "#353130",
        },
        dark: {
          DEFAULT: "#0E251D",
          100: "#0E251D",
          200: "#10141A",
        },
        blue: {
          DEFAULT: "#627EA2",
          50: "#D5DDE6",
          100: "#C9D2DF",
          200: "#AFBDD0",
          300: "#95A8C0",
          400: "#7C93B1",
          500: "#627EA2",
          600: "#4C6380",
          700: "#37485D",
          800: "#222D3A",
          900: "#0D1116",
        },
        green: {
          DEFAULT: "#75FFD3",
          100: "#75FFD3",
          200: "#01FFD4",
          300: "#2ecc94",
          400: "#42B792",
          500: "#7eb79b",
        },
        grey: {
          DEFAULT: "#20242C",
          100: "#b7b7b7",
          200: "#979BA2",
          300: "#4d5466",
          400: "#282D3A",
          500: "#20242C",
          600: "#10151B",
          700: "#0E1116",
        },
        silver: "#F1EEE9",
        orange: "#ec8339",
        red: "#fc4544",
      },
    },
  },
  plugins: [],
}
