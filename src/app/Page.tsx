import React, {FC} from 'react';
import Alert from '../widgets/Alert';
import GoogleAnalytics from '../widgets/GoogleAnalytics';

const Page: FC<{csrfToken: string}> = ({csrfToken}) => (
  <html lang="en">
    <head>
      <GoogleAnalytics id="G-40EV6Z82QM" />
      <meta charSet="UTF-8" />
      {/* bg-yellow-200: */}
      <meta name="theme-color" content="#fefcbf" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="CSRF-Token" content={csrfToken} />
      <meta name="description" content="Collaborative Scripture Study" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/loco-192.png" />
      {process.env.NODE_ENV === 'production' && (
        <link rel="stylesheet" href="/css/index.css" />
      )}
      <script src="/js/index.js" defer />
    </head>
    <body>
      <div id="root" />
      <noscript>
        <Alert>
          I'm sorry, but Scripture Study doesn't work properly without
          JavaScript enabled. Please enable JavaScript in your web browser and
          try again."
        </Alert>
      </noscript>
    </body>
  </html>
);

export default Page;
