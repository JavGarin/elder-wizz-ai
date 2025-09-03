/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gba-deep-brown': '#6b4b14',
        'gba-dark-brown': '#8a5e20',
        'gba-brown': '#a1762c',
        'gba-light-brown': '#c58b3b',
        'gba-dark-gold': '#d89d4a',
        'gba-gold': '#f1b355',
        'gba-light-gold': '#f5c47a',
        'gba-yellow': '#f9d79e',
        'gba-light-yellow': '#fce6b3',
      },
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'vt323': ['"VT323"', 'monospace'],
      }
    },
  },
  plugins: [],
}