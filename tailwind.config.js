/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./public/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}", "./views/**/*.{js,jsx,ts,tsx,html,hbs,handlebars}"],
  theme: {
    extend: {},
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
