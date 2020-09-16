import React, {FC} from 'react';
import classnames from 'classnames';
import {theme, ThemeName} from '../../utils/themes';

const CircleButton: FC<
  JSX.IntrinsicElements['button'] & {
    themeId: number | ThemeName;
  }
> = ({themeId, ...props}) => (
  <button
    {...props}
    className={classnames(
      'inline-flex flex-shrink-0 text-4xl min-w-20 h-20 rounded-full uppercase items-center justify-center focus:outline-none focus:shadow-outline shadow:lg hover:shadow-2xl m-2 cursor-pointer flex-no-wrap leading-none select-none transform hover:scale-125 duration-200 opacity-50 hover:opacity-100',
      theme(themeId),
    )}
  />
);

export default CircleButton;
