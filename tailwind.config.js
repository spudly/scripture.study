// Defaults: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        96: '24rem',
        128: '32rem',
      },
      inset: (theme) => ({
        ...theme('spacing'),
        '-64': '-16rem',
        '-128': '-32rem',
      }),
      minWidth: (theme) => ({
        ...theme('width'),
      }),
      maxWidth: (theme) => ({
        ...theme('width'),
      }),
      minHeight: (theme) => ({
        ...theme('height'),
      }),
      maxHeight: (theme) => ({
        ...theme('height'),
      }),
      flex: {
        '2': '2 2 0%',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          'Palatino',
          '"Palatino Linotype"',
          '"Palatino LT STD"',
          '"Book Antiqua"',
          'Georgia',
          'serif',
        ],
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'odd', 'even'],
    scale: ['responsive', 'hover', 'focus', 'active'],
  },
};
