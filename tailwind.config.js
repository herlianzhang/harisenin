/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#243FDB",
          200: "#192DB7",
          300: "#0F1E93",
          400: "#09147A",
          500: "#3254FF"
        },
        text: {
          dark: {
            primary: "rgba(58, 53, 65, 0.87)",
            secondary: "rgba(58, 53, 65, 0.87)",
            disabled: "rgba(58, 53, 65, 0.38)"
          },
          light: {
            primary: "#FFFFFF",
            secondary: "#C1C2C4",
            disabled: "#9D9EA1"
          }
        },
        background: {
          paper: "#22282A",
          body: "#2F3334",
          header: "#181A1C",
          extra: "#3D4142",
          input: "rgba(231, 227, 252, 0.04)",
          chip: "rgba(231, 227, 252, 0.08)",
          signin: "rgba(24, 26, 28, 0.84)"
        },
        border: {
          outline: "rgba(231, 227, 252, 0.23)",
          input: "rgba(231, 227, 252, 0.22)"
        }
      }
    },
  },
  plugins: [],
}

