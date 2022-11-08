/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Ubuntu", ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [],
    tailwindConfig: "./styles/tailwind.config.js",
};
