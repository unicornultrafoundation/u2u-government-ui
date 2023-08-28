/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        green: "#1EAA7F",
        pale: "#E4F8F2",
        black: {
          DEFAULT: "#000000",
          1: "#282828",
          2: "#212121"
        },
        white: "#FFFFFF",
        lightGray: "#E0E0E0",
        gray: "#878787"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

