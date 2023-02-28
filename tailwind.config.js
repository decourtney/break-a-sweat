/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./public/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}", "./views/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FBE0D9',
          100: '#F6C1B7',
          200: '#F09F94',
          300: '#EB7D72',
          400: '#E55B50',
          500: '#E03A2E', // Primary color
          600: '#B03024',
          700: '#80201A',
          800: '#501011',
          900: '#200007',
        },
        secondary: {
          50: '#FEF8F8',
          100: '#FCE0E1',
          200: '#F9C1C6',
          300: '#F6A2AC',
          400: '#F38391',
          500: '#F06476', // Secondary color
          600: '#C04B5C',
          700: '#813143',
          800: '#40202A',
          900: '#100005',
        },
        text: {
          primary: '#405a74', // Text color
          secondary: '#b2c3c2',
          accent: '#E03A2E', // Same as primary color
          inverse: '#FFFFFF',
        },
      },
      borderColor: {
        primary: 'rgba(224, 58, 46, 0.5)',
        secondary: 'rgba(240, 100, 118, 0.5)',
      },
      ringColor: {
        primary: 'rgba(224, 58, 46, 0.5)',
        secondary: 'rgba(240, 100, 118, 0.5)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities })
    {
      addUtilities({
        '.content-auto': {
          'content-visibility': 'auto',
        },
        '.content-hidden': {
          'content-visibility': 'hidden',
        },
        '.content-visible': {
          'content-visibility': 'visible',
        },
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        },
        /* Hide scrollbar for IE, Edge and Firefox */
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',  /* IE and Edge */
          'scrollbar-width': 'none',  /* Firefox */
        }
      })
    })
  ]
}
