/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': {
          100: '#D0DFFA',
          200: '#A1C0F5',
          300: '#729FEE',
          400: '#4680E7',
          500: '#1B61E0',
          600: '#154BB4',
          700: '#103587',
          800: '#0B215B',
          900: '#06122E',
        },
        'light-yellow': '#FFEB3B',
        'bright-green': '#00FF00',
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
}
