module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      screens: {
        m28: "280px",
        m37: "375px",
        m41: "420px",
        m48: "480px",
        sm: "620px",
        md: "768px",
        lg: "1024px",
        l25: "1025px",
        l32: "1032px",
        x2: "1200px",
        xl: "1280px",
        xxl: "1536px"
      },
      colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
        opensans: ['"Open Sans"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        fontblue: "hsl(243, 87%, 12%)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")
],
}