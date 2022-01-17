module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      scale: {
        '300': '3'
      },
      fontSize: {
        '2xs': '.5rem'
      },
      lineHeight: {
        '2': '.5rem'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
