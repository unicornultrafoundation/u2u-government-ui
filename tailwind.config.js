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
        cyan: "#DFF9F7",
        pale: "#E4F8F2",
        silver: "#ECECEC",
        black: {
          DEFAULT: "#000000",
          1: "#282828",
          2: "#212121",
          3: "#465873"
        },
        white: "#FFFFFF",
        light: {
          DEFAULT: "#EFEFEF",
          1: "#EEEEEE",
          2: "#F8F8F8"
        },
        lightGray: "#E0E0E0",
        gray: {
          DEFAULT: "#878787",
          1: "#E2E2E2",
          2: "#B6B6B6"
        },
        error: {
          DEFAULT: "#FF4747"
        }
      }
    },
  },
  plugins: [],
}

