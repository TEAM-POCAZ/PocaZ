/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        '480': '480px',
      }
    },
    screens: {
      'mm': {'max': '767px'},
    }
  },
  plugins: [],
}
