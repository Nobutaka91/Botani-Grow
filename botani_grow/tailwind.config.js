/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // backgroundColor: {
      //   'white-opacity-75': 'rgba(255, 255, 255, 0.7)',
      // },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    fontWeight: {
      light: 300,
      medium: 500,
      extrabold: 800,
    },
  },
  plugins: [],
};
