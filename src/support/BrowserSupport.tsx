import React, {cloneElement, FC, ReactElement} from 'react';
import {
  LgChrome,
  LgFirefox,
  LgMicrosoftEdge,
  LgSafari,
} from '@meronex/icons/lg';
import {IconBaseProps} from '@meronex/icons/lib';
import Heading from '../widgets/Heading';
import {browsers} from '../meta';
import AnchorLink from '../widgets/AnchorLink';

type BrowserName = keyof typeof browsers;

const browserDetails: {
  [KEY in keyof typeof browsers]: {
    displayName: string;
    downloadHref: string;
    logo: ReactElement<IconBaseProps>;
  };
} = {
  chrome: {
    displayName: 'Google Chrome',
    downloadHref: 'https://www.google.com/chrome/',
    logo: <LgChrome />,
  },
  edge: {
    displayName: 'Microsoft Edge',
    downloadHref: 'https://www.microsoft.com/en-us/edge',
    logo: <LgMicrosoftEdge />,
  },
  firefox: {
    displayName: 'Mozilla Firefox',
    downloadHref: 'https://www.mozilla.org/en-US/firefox/new/',
    logo: <LgFirefox />,
  },
  safari: {
    displayName: 'Apple Safari',
    downloadHref: 'https://support.apple.com/downloads/safari',
    logo: <LgSafari />,
  },
};

const BrowserSupport: FC<{}> = () => {
  return (
    <div className="space-y-4 flex-1">
      <Heading level={2}>Browser Support</Heading>
      <p>
        This web site works best with JavaScript enabled on the latest versions
        of the following web browsers:
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {Object.keys(browsers).map(name => {
          const version = browsers[name as BrowserName];
          const {displayName, logo, downloadHref} = browserDetails[
            name as BrowserName
          ];
          return (
            <div
              key={name}
              className="flex flex-grow flex-col items-center space-y-2 text-center"
            >
              <a
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-110 duration-75"
              >
                {cloneElement(logo, {size: '100%'})}
              </a>
              <AnchorLink
                href={downloadHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-bold">Download {displayName}</span>
              </AnchorLink>
              <div>Version {version}+</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowserSupport;
