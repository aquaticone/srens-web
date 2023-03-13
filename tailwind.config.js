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
        white: "#F1EEE9",
        bronze: {
          DEFAULT: "#F5C59F",
          100: "#F5C59F",
          200: "#ad937c",
          300: "#353130",
        },
        comet: {
          DEFAULT: "#4F576D",
          50: "#AFB5C5",
          100: "#A3AABC",
          200: "#8C94AB",
          300: "#747E9A",
          400: "#616A85",
          500: "#4F576D",
          600: "#383D4D",
          700: "#20242C",
          800: "#09090C",
          900: "#0E1116",
        },
        green: {
          DEFAULT: "#75FFD3",
          100: "#75FFD3",
          200: "#01FFD4",
          300: "#2ecc94",
          400: "#42B792",
          500: "#7eb79b",
        },
        orange: "#ec8339",
        red: "#fc4544",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
}
