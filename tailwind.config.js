/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgCustom: '#242623',
        whiteCustom: '#F2F2F2',
        whitePholder: '#c2c0c0'
      },
      fontFamily: {
        'all': ["Roboto Slab", 'serif'],
      },
      screens: {
        'se': '300px',
        'xr': '431px',
      },
    },
  },
  plugins: [],
}
