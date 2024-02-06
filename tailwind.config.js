/** @type {import('tailwindcss').Config} */
const TwColor = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        tw_primary: "#203554",
        tw_secondary: "#A8CBFF",
        tw_text: "#F3F3F3",
        tw_accent: "#BBC6D7",
        tw_bg: "#121F34",
        error: TwColor.red[500],
        success: TwColor.green[500],
      },
    },
  },
  plugins: [],
};
