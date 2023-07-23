/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './talocityui/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'talocity-blue-color': 'rgba(16, 204, 203, 1)',
        'talocity-blue-color-faded': 'rgba(16, 204, 203, 0.08)',
        'talocity-gray-color': '#323232',
        'base-color': 'rgba(0, 19, 37, 1)',
        'base-color-dark': 'rgba(255, 255, 255, 1)',
        'primary-color': 'rgba(0, 19, 37, 0.92)',
        'primary-color-dark': 'rgba(255, 255, 255, 1)',
        'secondary-color': 'rgba(0, 19, 37, 0.64)',
        'secondary-color-dark': 'rgba(255, 255, 255, 0.72)',
        'disabled-color': 'rgba(0, 19, 37, 0.36)',
        'disabled-color-dark': 'rgba(255, 255, 255, 0.44)',
        'hint-color': 'rgba(0, 19, 37, 0.36)',
        'hint-color-dark': 'rgba(255, 255, 255, 0.44)',
        'outline-color': 'rgba(0, 19, 37, 0.16)',
        'outline-color-dark': 'rgba(255, 255, 255, 0.16)',
        'divider-color': 'rgba(0, 19, 37, 0.16)',
        'divider-color-dark': 'rgba(255, 255, 255, 0.16)',
        'decorative-color': 'rgba(0, 19, 37, 0.08)',
        'decorative-color-dark': 'rgba(255, 255, 255, 0.08)'
      }
    },
    fontFamily: {
      Inter: ['Inter, sans-serif']
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
