/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0A0B',
        'card-bg': '#111113',
        'accent-orange': '#FF5C29',
        'accent-purple': '#A442FF',
        'accent-pink': '#FF42A8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 20px rgba(255, 92, 41, 0.5)',
        'glow-purple': '0 0 20px rgba(164, 66, 255, 0.5)',
      },
      backdropBlur: {
        'glass': '20px',
      }
    },
  },
  plugins: [],
}; 