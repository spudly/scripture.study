import {getParser} from 'bowser';
import React, {FC, useEffect, useState} from 'react';
import {browsers} from '../meta';
import Alert from './Alert';

const BrowserAlert: FC = () => {
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    const parser = getParser(navigator.userAgent);
    const isSatisfied = parser.satisfies(
      Object.keys(browsers).reduce(
        (opts, name) => ({
          ...opts,
          [name]: `>=${browsers[name as keyof typeof browsers]}`,
        }),
        {},
      ),
    );
    if (!isSatisfied) {
      setIsSupported(false);
    }
  }, []);

  return isSupported ? null : <Alert>oiutdated browser</Alert>;
};

export default BrowserAlert;
