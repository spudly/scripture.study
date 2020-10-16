import React, {FC} from 'react';
import classnames from 'classnames';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

const Heading: FC<{level?: Level; center?: boolean; as?: Level}> = ({
  level = 1,
  as = level,
  center,
  children,
}) => {
  const props = {
    className: classnames('font-serif uppercase', {
      'text-6xl': as === 1,
      'text-4xl': as === 2,
      'text-2xl': as === 3,
      'text-xl': as === 4,
      'text-base': as === 5 || as === 6,
      'text-center': center,
    }),
  };
  switch (level) {
    case 1:
      return <h1 {...props}>{children}</h1>;
    case 2:
      return <h2 {...props}>{children}</h2>;
    case 3:
      return <h3 {...props}>{children}</h3>;
    case 4:
      return <h4 {...props}>{children}</h4>;
    case 5:
      return <h5 {...props}>{children}</h5>;
    case 6:
      return <h6 {...props}>{children}</h6>;
  }
};

export default Heading;
