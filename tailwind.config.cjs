/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {center: true},
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
      serif: ['Noto Sans', 'serif'],
    },   
  },
  plugins: [],
}