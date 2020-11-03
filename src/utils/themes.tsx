import {MicroTheme, StateMicroTheme} from '../types';

const themes = {
  blue: {
    activated: {
      bgColor: 'bg-blue-400',
      borderColor: 'border-blue-900',
      textColor: 'text-blue-900',
    },
    active: {
      bgColor: 'active:bg-blue-400',
      borderColor: 'active:border-blue-900',
      textColor: 'active:text-blue-900',
    },
    default: {
      bgColor: 'bg-blue-200',
      borderColor: 'border-blue-900',
      textColor: 'text-blue-900',
    },
    hover: {
      bgColor: 'hover:bg-blue-300',
      borderColor: 'hover:border-blue-900',
      textColor: 'hover:text-blue-900',
    },
  } as MicroTheme,
  green: {
    activated: {
      bgColor: 'bg-green-400',
      borderColor: 'border-green-900',
      textColor: 'text-green-900',
    },
    active: {
      bgColor: 'active:bg-green-400',
      borderColor: 'active:border-green-900',
      textColor: 'active:text-green-900',
    },
    default: {
      bgColor: 'bg-green-200',
      borderColor: 'border-green-900',
      textColor: 'text-green-900',
    },
    hover: {
      bgColor: 'hover:bg-green-300',
      borderColor: 'hover:border-green-900',
      textColor: 'hover:text-green-900',
    },
  } as MicroTheme,
  orange: {
    activated: {
      bgColor: 'bg-orange-400',
      borderColor: 'border-orange-900',
      textColor: 'text-orange-900',
    },
    active: {
      bgColor: 'active:bg-orange-400',
      borderColor: 'active:border-orange-900',
      textColor: 'active:text-orange-900',
    },
    default: {
      bgColor: 'bg-orange-200',
      borderColor: 'border-orange-900',
      textColor: 'text-orange-900',
    },
    hover: {
      bgColor: 'hover:bg-orange-300',
      borderColor: 'hover:border-orange-900',
      textColor: 'hover:text-orange-900',
    },
  } as MicroTheme,
  purple: {
    activated: {
      bgColor: 'bg-purple-400',
      borderColor: 'border-purple-900',
      textColor: 'text-purple-900',
    },
    active: {
      bgColor: 'active:bg-purple-400',
      borderColor: 'active:border-purple-900',
      textColor: 'active:text-purple-900',
    },
    default: {
      bgColor: 'bg-purple-200',
      borderColor: 'border-purple-900',
      textColor: 'text-purple-900',
    },
    hover: {
      bgColor: 'hover:bg-purple-300',
      borderColor: 'hover:border-purple-900',
      textColor: 'hover:text-purple-900',
    },
  } as MicroTheme,
  red: {
    activated: {
      bgColor: 'bg-red-400',
      borderColor: 'border-red-900',
      textColor: 'text-red-900',
    },
    active: {
      bgColor: 'active:bg-red-400',
      borderColor: 'active:border-red-900',
      textColor: 'active:text-red-900',
    },
    default: {
      bgColor: 'bg-red-200',
      borderColor: 'border-red-900',
      textColor: 'text-red-900',
    },
    hover: {
      bgColor: 'hover:bg-red-300',
      borderColor: 'hover:border-red-900',
      textColor: 'hover:text-red-900',
    },
  } as MicroTheme,
  yellow: {
    activated: {
      bgColor: 'bg-yellow-400',
      borderColor: 'border-yellow-900',
      textColor: 'text-yellow-900',
    },
    active: {
      bgColor: 'active:bg-yellow-400',
      borderColor: 'active:border-yellow-900',
      textColor: 'active:text-yellow-900',
    },
    default: {
      bgColor: 'bg-yellow-200',
      borderColor: 'border-yellow-900',
      textColor: 'text-yellow-900',
    },
    hover: {
      bgColor: 'hover:bg-yellow-300',
      borderColor: 'hover:border-yellow-900',
      textColor: 'hover:text-yellow-900',
    },
  } as MicroTheme,
};

type Options = {
  states?: Array<keyof MicroTheme>;
  colors?: Array<keyof StateMicroTheme>;
};

export type Themes = typeof themes;

export type ThemeName = keyof Themes;

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
