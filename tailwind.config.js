/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./public/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}", "./views/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7fc', // backgrounds
          100: '#c2e0f6', // backgrounds, borders
          200: '#94c9f0', // backgrounds, borders
          300: '#66b2ea', // backgrounds, borders
          400: '#388be3', // buttons, links, icons
          500: '#0076dd', // Primary color, buttons, links, icons
          600: '#0069c4', // buttons, links, icons
          700: '#005da3', // buttons, links, icons
          800: '#005083', // buttons, links, icons
          900: '#003e5d', // buttons, links, icons
        },
        secondary: {
          50: '#f5f8fa', // backgrounds
          100: '#d9e5eb', // backgrounds, borders
          200: '#bfd2dc', // backgrounds, borders
          300: '#a5becd', // backgrounds, borders
          400: '#8baabf', // buttons, links, icons
          500: '#7cb8e8', // Secondary color, buttons, links, icons
          600: '#6098b7', // buttons, links, icons
          700: '#4d7a94', // buttons, links, icons
          800: '#365c6f', // buttons, links, icons
          900: '#1f3d4c', // buttons, links, icons
        },
        text: {
          primary: '#2d3748', // Primary text
          secondary: '#718096', // Secondary text
          accent: '#0076dd', // Same as primary color
          inverse: '#ffffff', // Text on dark backgrounds
        },
      },
      borderColor: {
        primary: 'rgba(0, 118, 221, 0.5)', // Borders for primary color elements
        secondary: 'rgba(124, 184, 232, 0.5)', // Borders for secondary color elements
      },
      ringColor: {
        primary: 'rgba(0, 118, 221, 0.5)', // Rings for primary color elements
        secondary: 'rgba(124, 184, 232, 0.5)', // Rings for secondary color elements
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
