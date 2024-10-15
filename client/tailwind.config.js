/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-calendar/dist/Calendar.css",
  ],
  theme: {
    extend: {},
    colors: {
      white: "#FFFFFF",
      base: "#FBF6E3",
      brown: "#60534F",
      darkbrown: "#382F2D",
      pink: "#EFB4B4",
      yellow: "#FDF5B8",
      gray: "#C6C6C0",
      "placeholder-gray": "#a9a9a9",
      black: "#1E1E1E",
      blue: "#6E6F84",
      lightblue: "#D9D9D9",
    },
  },
  plugins: [],
};
