const path = require('path')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      // https://colorpalette.org/nature-garden-plant-color-palette/

      // https://colorpalette.org/flower-rose-family-white-color-palette/
      colors: {
        'nature-green': {
          DEFAULT: '#6d8f39',
          100: '#9cb66c',
          200: '#6d8f39',
          300: '#56722e',
          400: '#35371d',
          500: '#161e0b',
        },
        'graygreen': {
          DEFAULT: '#beb494',
          100: '#beb494',
          200: '#918d74',
          300: '#726848',
        },
        'sand': {
          DEFAULT: '#c9bf37'
        },
        'grayblue': {
          100: '#999ea6',
          200: '#6c6d6e'
        },
        'nature-white': {
          DEFAULT: '#ebebeb'
        },
        // 
        'primary-page': {
          DEFAULT: '#dfd4a1'
        },
        'highlight-dark': {
          DEFAULT: '#A69A60',
          100: '#dfd4a1',
          200: '#baae72',
          300: '#a69a60',
          400: '#a2934a',
          500: '#988631',
        },
        'highlight-light': {
          DEFAULT: '#6d8f39',
          100: '#9cb66c',
          200: '#6d8f39',
          300: '#56722e',
          400: '#35371d',
          500: '#161e0b',
        },
        'head': {
          DEFAULT: '#BF7C41'
        },
        'font-light': {
          DEFAULT: '#ebebeb'
        },
        'font-dark': {
          DEFAULT: colors.gray['800'],
          100: colors.gray['400'],
          200: colors.gray['500'],
          300: colors.gray['600'],
          400: colors.gray['700']
        },
        'font-warn': {
          DEFAULT: colors.red['900']
        },
        'font-highlight': {
          DEFAULT: '#BF7C41'
        },
        'font-link': {
          DEFAULT: '#BF7C41',
          100: '#c4742e',
          200: '#c76b1b',
          300: '#c2620d',
          400: '#b95803',
        }
      },
      // backgroundImage: theme => ({
      //   'first-startpage-card': "url('/assets/erpnext_kleingartenverein/images/flower.png')",
      // })
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
  },
  plugins: [],
  purge: {
    content: [
      "./index.html",
      "./test.html",
      `../${path.basename(path.resolve('..'))}/**/*.html`,
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/frappe-ui/src/components/**/*.{vue,js,ts,jsx,tsx}",
    ],
    safelist: {

    }
  }
}
