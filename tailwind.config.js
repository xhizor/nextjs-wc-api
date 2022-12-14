/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/components/**/*.js',
    './pages/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'orange': '#fd7e35',
          'platinum-black': '#333',
          'bright-grey': '#b1b1b1',
          'gunsmoke-grey': '#8d8d8d',
          'royal-blue': '#3b82f6'
        }
      },
      spacing: {
        '9px': '9px'
      }
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss'),
    require('precss'),
    require('autoprefixer')
  ]
};