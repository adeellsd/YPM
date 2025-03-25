/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#292F6A',
        'primary': '#F6F3D0',
        'secondary': '#E2E2E2',
      },
      fontFamily: {
        'clash': ['"Clash Display"', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '0.5em',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 6px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}