/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#214c70",
        secondary: "#EFEFEF",
        dash: "#ede9f5",
      },
      colors: {
        primary: "#214c70",
      },
    },
  },
  plugins: [],
};
