/** @type {import('tailwindcss').Config} */
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import postcssJs from 'postcss-js'

module.exports = {
  content: ['./components/**/*.{vue,js}', './layouts/**/*.vue', './pages/**/*.vue'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'navy-1': '#162238',
        'navy-2': '#182841',
        'navy-3': '#1d2e4a',
        'navy-4': '#203354',
        'navy-5': '#23395e',
        'blue-1': '#b0e7fd',
        'blue-2': '#3aa3c9',
        // 'navy-1': '#0e1f33',
        // 'navy-2': '#122948',
        // 'navy-3': '#193153',
        // 'navy-4': '#506680',
        'secondary': '#cea434',
        'secondary-2': '#ffb886',
        'white': '#f1f1f3',
        'charcoal': '#353C51',
        'second-1': '#7289da',
        'second-2': '#4698eb',
      },
      zIndex: {
        belowNav: '100',
        nav: '150',
        aboveNav: '200',
        aboveAll: '9999',
      },
    },
  },
  plugins: [
    ({ addBase, addComponents, addUtilities }) => {
      const css = readFileSync('./assets/css/tailwind.css', 'utf8')
      const root = postcss.parse(css)
      const jss = postcssJs.objectify(root)

      if ('@layer base' in jss) {
        addBase(jss['@layer base'])
      }
      if ('@layer components' in jss) {
        addComponents(jss['@layer components'])
      }
      if ('@layer utilities' in jss) {
        addUtilities(jss['@layer utilities'])
      }
    },
  ],
}
