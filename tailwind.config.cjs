/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

const tailwindColors = require("./node_modules/tailwindcss/colors");
const colorSafeList = [];

// Skip these to avoid a load of deprecated warnings when tailwind starts up
const deprecated = [
    "lightBlue",
    "warmGray",
    "trueGray",
    "coolGray",
    "blueGray",
];

// Hack to dynamically set in components
for (const colorName in tailwindColors) {
    if (deprecated.includes(colorName)) {
        continue;
    }

    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

    const pallette = tailwindColors[colorName];

    if (typeof pallette === "object") {
        shades.forEach((shade) => {
            if (shade in pallette) {
                colorSafeList.push(`text-${colorName}-${shade}`);
                colorSafeList.push(`hover:text-${colorName}-${shade}`);
                colorSafeList.push(`bg-${colorName}-${shade}`);
                colorSafeList.push(`hover:bg-${colorName}-${shade}`);
            }
        });
    }
}

module.exports = {
    safelist: colorSafeList,
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
