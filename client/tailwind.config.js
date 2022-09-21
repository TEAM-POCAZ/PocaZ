/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      width: {
        480: '480px',
      },
    },
    screens: {
      mm: { max: '767px' },
      mm2: { max: '1170px' },
      tt: { min: '768px', max: '1023px' },
    },
  },
  plugins: [],
}
