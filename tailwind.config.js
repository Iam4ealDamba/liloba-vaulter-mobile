/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tw_primary: "#203554",
        tw_secondary: "#A8CBFF",
        tw_text: "#E4EFFF",
        tw_accent: "#BBC6D7",
        tw_bg: "#121F34",
      },
    },
  },
  plugins: [],
};
