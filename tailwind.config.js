// Defaults: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    extend: {
      spacing: {
        96: '24rem',
        128: '32rem',
        'rel-1': '0.25em',
        'rel-2': '0.5em',
        'rel-3': '0.75em',
        'rel-4': '1em',
        'rel-5': '1.25em',
        'rel-6': '1.5em',
        'rel-8': '2em',
        'rel-10': '2.5em',
        'rel-12': '3em',
        'rel-16': '4em',
        'rel-20': '5em',
        'rel-24': '6em',
        'rel-32': '8em',
        'rel-40': '10em',
        'rel-48': '12em',
        'rel-56': '14em',
        'rel-64': '16em',
        'rel-96': '24em',
        'rel-128': '32em',
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
      fontSize: {
        'rel-4xs': '0.25em',
        'rel-3xs': '0.33em',
        'rel-2xs': '0.5em',
        'rel-xs': '0.75em',
        'rel-sm': '0.875em',
        'rel-lg': '1.125em',
        'rel-xl': '1.25em',
        'rel-2xl': '1.5em',
        'rel-3xl': '1.875em',
        'rel-4xl': '2.25em',
        'rel-5xl': '3em',
        'rel-6xl': '4em',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active', 'odd', 'even'],
    scale: ['responsive', 'hover', 'focus', 'active'],
    visibility: ['responsive', 'group-hover'],
  },
};
