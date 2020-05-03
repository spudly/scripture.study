import {MicroTheme, StateMicroTheme} from './types';

const themes = {
  yellow: {
    default: {
      bgColor: 'bg-yellow-200',
      textColor: 'text-yellow-900',
      borderColor: 'border-yellow-900',
    },
    hover: {
      bgColor: 'hover:bg-yellow-300',
      textColor: 'hover:text-yellow-900',
      borderColor: 'hover:border-yellow-900',
    },
    active: {
      bgColor: 'active:bg-yellow-400',
      textColor: 'active:text-yellow-900',
      borderColor: 'active:border-yellow-900',
    },
    activated: {
      bgColor: 'bg-yellow-400',
      textColor: 'text-yellow-900',
      borderColor: 'border-yellow-900',
    },
  } as MicroTheme,
  green: {
    default: {
      bgColor: 'bg-green-200',
      textColor: 'text-green-900',
      borderColor: 'border-green-900',
    },

    hover: {
      bgColor: 'hover:bg-green-300',
      textColor: 'hover:text-green-900',
      borderColor: 'hover:border-green-900',
    },
    active: {
      bgColor: 'active:bg-green-400',
      textColor: 'active:text-green-900',
      borderColor: 'active:border-green-900',
    },
    activated: {
      bgColor: 'bg-green-400',
      textColor: 'text-green-900',
      borderColor: 'border-green-900',
    },
  } as MicroTheme,
  blue: {
    default: {
      bgColor: 'bg-blue-200',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-900',
    },
    hover: {
      bgColor: 'hover:bg-blue-300',
      textColor: 'hover:text-blue-900',
      borderColor: 'hover:border-blue-900',
    },
    active: {
      bgColor: 'active:bg-blue-400',
      textColor: 'active:text-blue-900',
      borderColor: 'active:border-blue-900',
    },
    activated: {
      bgColor: 'bg-blue-400',
      textColor: 'text-blue-900',
      borderColor: 'border-blue-900',
    },
  } as MicroTheme,
  orange: {
    default: {
      bgColor: 'bg-orange-200',
      textColor: 'text-orange-900',
      borderColor: 'border-orange-900',
    },
    hover: {
      bgColor: 'hover:bg-orange-300',
      textColor: 'hover:text-orange-900',
      borderColor: 'hover:border-orange-900',
    },
    active: {
      bgColor: 'active:bg-orange-400',
      textColor: 'active:text-orange-900',
      borderColor: 'active:border-orange-900',
    },
    activated: {
      bgColor: 'bg-orange-400',
      textColor: 'text-orange-900',
      borderColor: 'border-orange-900',
    },
  } as MicroTheme,
  red: {
    default: {
      bgColor: 'bg-red-200',
      textColor: 'text-red-900',
      borderColor: 'border-red-900',
    },
    hover: {
      bgColor: 'hover:bg-red-300',
      textColor: 'hover:text-red-900',
      borderColor: 'hover:border-red-900',
    },
    active: {
      bgColor: 'active:bg-red-400',
      textColor: 'active:text-red-900',
      borderColor: 'active:border-red-900',
    },
    activated: {
      bgColor: 'bg-red-400',
      textColor: 'text-red-900',
      borderColor: 'border-red-900',
    },
  } as MicroTheme,
  purple: {
    default: {
      bgColor: 'bg-purple-200',
      textColor: 'text-purple-900',
      borderColor: 'border-purple-900',
    },
    hover: {
      bgColor: 'hover:bg-purple-300',
      textColor: 'hover:text-purple-900',
      borderColor: 'hover:border-purple-900',
    },
    active: {
      bgColor: 'active:bg-purple-400',
      textColor: 'active:text-purple-900',
      borderColor: 'active:border-purple-900',
    },
    activated: {
      bgColor: 'bg-purple-400',
      textColor: 'text-purple-900',
      borderColor: 'border-purple-900',
    },
  } as MicroTheme,
};

type Options = {
  states?: Array<keyof MicroTheme>;
  colors?: Array<keyof StateMicroTheme>;
};

export type ThemeName = keyof typeof themes;

export const themeNames = Object.keys(themes) as Array<ThemeName>;

export const theme = (
  themeId: number | ThemeName,
  {
    states = ['default', 'hover', 'active'],
    colors = ['bgColor', 'textColor', 'borderColor'],
  }: Options = {},
) => {
  const name =
    typeof themeId === 'string'
      ? themeId
      : themeNames[themeId % themeNames.length];
  return states.flatMap((state) =>
    colors.map((color) => themes[name][state][color]),
  );
};
