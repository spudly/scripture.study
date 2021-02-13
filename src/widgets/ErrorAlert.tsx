import React, {FC} from 'react';
import {MdErrorOutline} from '@meronex/icons/md';

type Props = {
  error: unknown;
  grow?: boolean;
};

const ErrorAlert: FC<Props> = ({error, grow}) => (
  <div className="flex-1 flex flex-col items-center justify-center bg-red-200 border border-red-800 text-red-800 p-2">
    <MdErrorOutline
      size="auto"
      className={grow ? 'flex-1 max-w-64' : 'h-4 w-4'}
    />
    {!IS_PROD && (
      <pre className="text-left text-base w-full overflow-x-auto">
        {typeof error === 'string'
          ? error
          : error instanceof Error
          ? error.stack ?? error.message
          : JSON.stringify(error)}
      </pre>
    )}
  </div>
);

export default ErrorAlert;
