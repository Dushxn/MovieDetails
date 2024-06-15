/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '2xs': '15rem', // Add a custom maximum width '2xs' with a value of 12rem (192px)
      }

    },
  },
  plugins: [],
}