import React, {FC} from 'react';
import {MdErrorOutline} from 'react-icons/md';
import classnames from 'classnames';

type Props = {
  error: Error;
  grow?: boolean;
};

const ErrorAlert: FC<Props> = ({error, grow}) => (
  <div className="flex-1 flex flex-col items-center justify-center bg-red-200 border border-red-800 text-red-800 p-2">
    <MdErrorOutline
      height="auto"
      width="auto"
      className={classnames({
        'h-4 w-4': !grow,
        'flex-1 max-w-64': grow,
      })}
    />
    {process.env.NODE_ENV === 'development' && (
      <pre className="text-left">{error.stack ?? error.message}</pre>
    )}
  </div>
);

export default ErrorAlert;
