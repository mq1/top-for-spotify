import { defineConfig } from 'vite-plugin-windicss'
import colors from 'windicss/colors'

export default defineConfig({
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: colors.green,
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-30deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
        zoomzoom: {
          '0, 100%': { transform: 'scale(1.25)' },
          '50%': { transform: 'scale(0.75)' },
        },
      },
      animation: {
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'zoomzoom': 'zoomzoom 1s infinite',
      },
    },
  },
  plugins: [
    require('windicss/plugin/forms'),
  ],
})
