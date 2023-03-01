/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./public/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}", "./views/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}"],
  theme: {
    colors: {
      fiord: '#405a74',
      cinderella: '#fbdad0',
      submarine: '#b2c3c2',
      'tan-hide': '#f8a559',
      strikemaster: '#915a8d',
      bouquet: '#ad74a4',
      zinnwaldite: '#ecb4ab',
      tacao: '#e9b381',
      neptune: '#71bcb2',
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
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
