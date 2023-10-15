/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            white: "hsl(var(--color-white) / 1)",
            darkBlue: "hsl(var(--dark-blue) / 1)",
            greyishBlue: "hsl(var(--greyish-blue) / 1)",
            semiDarkBlue: "hsl(var(--semi-dark-blue) / 1)",
            red: "hsl(var(--color-red) / 1)",
        },
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),       
    ],
};
