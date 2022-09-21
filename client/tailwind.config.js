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
      '3xl': { max: '2000px' },
      '2xl': { max: '1535px' },
      // => @media (max-width: 1535px) { ... }

      xl: { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1023px' },
      // => @media (max-width: 1023px) { ... }

      mm: { max: '767px' },
<<<<<<< HEAD
      // => @media (max-width: 767px) { ... }

      sm: { max: '639px' },
      // => @media (max-width: 639px) { ... }
=======
      mm2: { max: '1170px' },
      tt: { min: '768px', max: '1023px' },
>>>>>>> dev
    },
  },
  plugins: [],
}
