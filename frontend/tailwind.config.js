/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#271a47",
        secondary: "#674ea7",
        "dark-subtle": "rgba(255, 255, 255, 0.8)",
        "light-subtle": "rgba(39, 39, 39)",
        "highlight-dark": "#ffc200",
        highlight: "#e3b21a",
      },
    },
  },
  plugins: [],
};
