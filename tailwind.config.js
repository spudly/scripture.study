// Defaults: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    minWidth: {
      '20': '5rem',
    },
    maxWidth: {
      '0': '0',
      '64': '16rem',
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
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
    scale: ['responsive', 'hover', 'focus', 'active'],
  },
};
