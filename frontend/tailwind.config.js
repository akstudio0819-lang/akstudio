/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        studio: {
          black: '#08080a',
          dark: '#0f0f13',
          card: '#16161c',
          border: '#24242e',
          text: '#a1a1aa',
          white: '#f4f4f5',
        },
        accent: {
          indigo: '#4f46e5',
          cyan: '#06b6d4',
          glow: 'rgba(79, 70, 229, 0.15)',
        }
      },
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        sans: ['Geist', 'Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        editorial: ['Manrope', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
