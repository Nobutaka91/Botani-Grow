/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // colors: {
      //   green: '#86efac',
      //   gray: {
      //     100: '#ffffff2e',
      //   },
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
