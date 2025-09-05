/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "max-xl": { max: "1200px" },
        "max-lg": { max: "992px" },
        "max-md": { max: "768px" },
        "max-sm": { max: "520px" },
      },
      colors: {
        primary: "#dc2626",
        primary_bg: "#0d0d0d",
      },
      backgroundImage: {
        overlay:
          "linear-gradient(to top, #0d0d0d, rgba(13,13,13,0.9),rgba(13,13,13,0.5),rgba(13,13,13,0.25))",
      },
    },
  },
  plugins: [],
};
