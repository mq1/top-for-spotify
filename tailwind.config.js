module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-30deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
        'ping-alt': {
          '0, 100%': { transform: 'scale(1.25)' },
          '50%': { transform: 'scale(0.75)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-alt': 'ping-alt 1s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
