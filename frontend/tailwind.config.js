/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      base: '1.5rem',
      xl: '3rem'
    },
    colors: {
      'dark-blue': 'var(--dark-blue)',
      'blue': 'var(--blue)',
      'light-blue': 'var(--light-blue)',
      'orange': 'var(--orange)',
      'dark-orange': 'var(--dark-orange)',
    },
    extend: {},
  },
  plugins: [],
}
