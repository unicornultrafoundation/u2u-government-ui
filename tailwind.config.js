/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-1': "linear-gradient(5.3deg, #33CC99 12.83%, #14523D 110.36%)"
      },
      colors: {
        primary: {
          DEFAULT: "#33CC99",
          light: "#D6F5EB",
          dark: "#29A37A",
          darker: "#14523D"
        },
        secondary: {
          DEFAULT: "#714CF9",
          light: "#D8CEFD",
          dark: "#3007C5",
          darker: "#180363"
        },
        background: {
          DEFAULT: "#FFFFFF",
          surface: {
            DEFAULT: "#f6f6f6",
            hover: "#e3e3e3",
            active: "#b4b4b4",
            disabled: "#D8D8D8"
          }
        },
        text: {
          DEFAULT: "#272727",
          secondary: "#838383",
          placeholder: "#c6c6c6",
          title: "#191B1E",
          disabled: "#8D8D8D",

        },
        border: {
          divider: "#d8d8d8",
          outline: "#e3e3e3",
          shadow: "#c6c6c6"
        },
        darkmode: {
          background: {
            DEFAULT: "#181818",
            surface: {
              DEFAULT: "#1F2225",
              hover: "#343434",
              active: "#363636"
            }
          },
          text: {
            DEFAULT: "#D8D8D8",
            secondary: "#b4b4b4",
            placeholder: "#363636",
            title: "#FFFFFF",
            disabled: "#8D8D8D",
          },
          border: {
            divider: "#272727",
            outline: "#363636",
            shadow: "#272727"
          }
        },
        success: {
          DEFAULT: "#0fa44d",
          light: "#e7f6ed",
          dark: "#0b7b3a",
          darker: "#05391b"
        },
        error: {
          DEFAULT: "#d21c1c",
          light: "#fbe8e8",
          dark: "#9e1515",
          darker: "#4a0a0a"
        },
        notice: {
          DEFAULT: "#df7b00",
          light: "#fcf2e6",
          dark: "#a75c00",
          darker: "#4e2b00"
        },
        positive: {
          DEFAULT: "#0fa4a4",
          light: "#e7f6f6",
          dark: "#0b7b7b",
          darker: "#053939"
        },
        informative: {
          DEFAULT: "#0172cb",
          light: "#e6f1fa",
          dark: "#015698",
          darker: "#002847"
        },
        white: "#FFFFFF",
        green: "#1EAA7F",

        // Remove later
        cyan: "#DFF9F7",
        pale: "#E4F8F2",
        silver: "#ECECEC",
        black: {
          DEFAULT: "#000000",
          1: "#282828",
          2: "#212121",
          3: "#465873"
        },
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
        }
      }
    },
  },
  plugins: [],
})

