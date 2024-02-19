const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        background: '#f3f0f6',
        white: '#fff',
        ...defaultTheme.colors,
      },
    },
    fontFamily: {
      primary: ['Noto Sans', 'sans-serif;'],
    },

    screens: {
      mobile: { min: '320px', max: '640px' },
      tablet: { min: '640px', max: '1024px' },
      desktop: { min: '1024px', max: '1440px' },
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
