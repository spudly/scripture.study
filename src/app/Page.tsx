import React, {FC} from 'react';
import Analytics from '../widgets/Analytics';
import Alert from '../widgets/Alert';

const PROD = process.env.NODE_ENV === 'production';

const Page: FC<{csrfToken: string; nonce: string}> = ({csrfToken, nonce}) => (
  <html lang="en">
    <head>
      {PROD && <Analytics id="G-40EV6Z82QM" nonce={nonce} />}
      <meta charSet="UTF-8" />
      <meta
        name="theme-color"
        // bg-yellow-200:
        content="#fefcbf"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="CSRF-Token" content={csrfToken} />
      <meta name="description" content="Collaborative Scripture Study" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/loco-192.png" />
      {PROD && <link rel="stylesheet" href="/css/index.css" />}
      <script nonce={nonce} src="/js/index.js" defer />
    </head>
    <body>
      <div id="root" />
      <noscript>
        <Alert>
          Sorry, but this website doesn't work properly without JavaScript
          enabled. Please enable JavaScript in your web browser and try again.
        </Alert>
      </noscript>
    </body>
  </html>
);

export default Page;
