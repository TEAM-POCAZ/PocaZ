/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            width: {
                480: "480px",
                50: "50px",
            },
            height: {
                50: "50px",
            },
            translate: {
                50: "-50%",
            },
            minWidth: {
                40: "40px",
            },
            minHeight: {
                300: "300px",
            },
            flex: {
                50: "0 1 48%",
            },
            minWidth: {
                50: "50px",
            },
        },
        screens: {
            "3xl": { max: "2000px" },
            "2xl": { max: "1535px" },
            // => @media (max-width: 1535px) { ... }

            xl: { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            mm: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
