// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          light: "#f6ecfd",
          normal: "#a241ee",
          dark: "#7a31b3",
          darker: "#391753",
        },
        orange: {
          light: "#fff4f1",
          normal: "#ff9574",
          dark: "#bf7057",
          darker: "#593429",
        },
        blue: {
          light: "#f3f9ff",
          normal: "#8bc0fe",
          dark: "#6890bf",
          darker: "#314359",
        },
        green: {
          light: "#f3fbfb",
          normal: "#86d8d3",
          dark: "#65a29e",
          darker: "#2f4c4a",
        },
        black: {
          light: "#b2bbc6",
          normal: "#546881",
          dark: "#1d242d",
          darker: "#090b0e",
        },
        white: {
          light: "#fcfdfd",
          normal: "#ffff",
          dark: "#f6f8f9",
        },
      },
      fontFamily: {
        axiformaBlack: ["Axiforma-Black", "sans-serif"],
        axiformaLight: ["Axiforma-Light", "sans-serif"],
        axiformaRegular: ["Axiforma-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
