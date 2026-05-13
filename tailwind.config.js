/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f97316',
        'primary-dark': '#ea580c',
        'primary-dull': '#fb923c',
      }
    },
  },
  plugins: [],
}