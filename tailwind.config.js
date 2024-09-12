/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        pathway: ['Pathway Gothic One', 'sans-serif'],
      },
      colors: {
        base: "#FBF6E3",
        brown: "#60534F",
        pink: "#EFB4B4",
        yellow: "#FDF5B8",
        gray: "#C6C6C0",
        blue: "#9092A8",
      },
    },
  },
  plugins: [],
};
