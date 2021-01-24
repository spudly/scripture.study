import React, {FC} from 'react';
import classnames from 'classnames';
import {ThemeName, theme} from '../utils/themes';

const CircleButton: FC<
  JSX.IntrinsicElements['button'] & {
    themeId: number | ThemeName;
  }
> = ({themeId, ...props}) => (
  <button
    {...props}
    type="button"
    className={classnames(
      'inline-flex flex-shrink-0 text-4xl min-w-20 h-20 rounded-full uppercase items-center justify-center focus:outline-none focus:ring shadow:lg hover:shadow-2xl cursor-pointer flex-nowrap leading-none select-none transform hover:scale-125 duration-200 opacity-50 hover:opacity-100',
      theme(themeId),
    )}
  />
);

export default CircleButton;
