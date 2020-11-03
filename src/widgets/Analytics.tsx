import React, {FC} from 'react';

const Analytics: FC<{id: string; nonce: string}> = ({id, nonce}) => (
  <>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
    <script
      nonce={nonce}
      // eslint-disable-next-line react/no-danger -- not so dangerous in this instance
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          
          gtag('config', '${id}');
        `
          .split('\n')
          .map((s) => s.trim())
          .join(''),
      }}
    />
  </>
);

export default Analytics;
