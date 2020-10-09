import React, {FC} from 'react';

const Page: FC<{csrfToken: string}> = ({csrfToken}) => (
  <html lang="en">
    <head>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <meta name="theme-color" content="#bee3f8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="CSRF-Token" content={csrfToken} />
      <link rel="apple-touch-icon" href="/icons/loco-192.png" />
      <script src="/index.client.js" defer />
    </head>
    <body>
      <div id="root" />
    </body>
  </html>
);

export default Page;
