const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    'font-mono' // Added this because it was being purged
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['"Brygada 1918"', ...defaultTheme.fontFamily.serif],
        mono: ['"Courier New"', ...defaultTheme.fontFamily.mono]
      }
    }
  },
  plugins: []
};
