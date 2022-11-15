/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/components/**/*.js',
    './pages/**/*.js'
  ],
  theme: {
    extend: {
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