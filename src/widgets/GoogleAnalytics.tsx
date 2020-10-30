import React, {FC} from 'react';

const GoogleAnalytics: FC<{id: string}> = ({id}) => {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}');`,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
