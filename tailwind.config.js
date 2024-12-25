/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mob: "300px",
        // => @media (min-width: 640px) { ... }

        tab: "667px",
        // => @media (min-width: 768px) { ... }
        tablet :"768px",

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1500px",
        // => @media (min-width: 1536px) { ... }
      },
      container: {
        padding: {
          mob: "1rem",
          tab: "1rem",
          laptop: "1rem",
          desktop: "1rem",
        },
        center: true,
      },
      colors: {
        "main-color": "#6236FF",
        "main-color2": "#8494A8",
        "success-color": "#1DCC70",
        "danger-color": "#FF396F",
        "warning-color": "#FFB400",
        "info-color": "#05D0A4",

        "custom-text-color": "#27173E",
        "custom-text-color2": "rgb(149, 141, 158)",
        "custom-text-color3": "#A9ABAD",

        "custom-border": "#DCDCE9",

        "custom-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.09)",
      },
    },
  },
  plugins: [],
}

