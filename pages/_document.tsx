import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="shortcut icon"
            href="/icons/favicon.ico"
            type="image/x-icon"
          />
          <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />{' '}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#bee3f8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" href="/icons/loco-192.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
