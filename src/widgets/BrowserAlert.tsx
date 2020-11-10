import {getParser} from 'bowser';
import React, {FC, useEffect, useState} from 'react';
import {Redirect} from 'react-router';
import {browsers} from '../meta';

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
        {
          // for running cypress tests:
          electron: '>= 85',
        },
      ),
    );
    if (!isSatisfied) {
      setIsSupported(false);
    }
  }, []);

  return isSupported ? null : <Redirect to="/support/browsers" />;
};

export default BrowserAlert;
