/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        prata: ["var(--font-prata)", "serif"],
        spartan: ["var(--font-spartan)", "sans-serif"],
      },
    },
  },
  plugins: [],
  safelist: [
    "font-poppins",
    "font-prata",
    "font-spartan",
    "animate-scroll"
  ],
};
