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
        silver: "#898a8b",
        bronze: {
          DEFAULT: "#F5C59F",
          100: "#fcd5ba",
          200: "#F5C59F",
          300: "#ad937c",
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
          DEFAULT: "#2ecc94",
          100: "#2ecc94",
          200: "#42B792",
          300: "#399E7E",
        },
        blue: "#0E8AD0",
        orange: "#ec8339",
        red: "#fc4544",
      },
      keyframes: {
        ping: {
          "75%, 100%": { transform: "scale(1.15, 1.5)", opacity: "0" },
          "0% 10%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        ping: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      screens: {
        md: "820px",
      },
      boxShadow: {
        glow: "0 0 12px 0 #2ecc94",
      },
      transitionTimingFunction: {
        "cubic-bezier": "cubic-bezier(.15, 1.15, 0.6, 1.00)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
}
