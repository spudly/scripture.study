import React, {ReactNode} from 'react';
import classnames from 'classnames';
import {MdErrorOutline} from 'react-icons/md';

type Props = {
  children: ReactNode;
  grow?: boolean;
};

type State = {
  error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {error: null};

  static getDerivedStateFromError(error: Error) {
    return {error};
  }

  render() {
    const {
      props: {children, grow},
      state: {error},
    } = this;

    return error ? (
      <button
        className="flex-1 flex flex-col items-center justify-center bg-red-200 border border-red-800 text-red-800 p-2"
        onClick={() => this.setState({error: null})}
      >
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
      </button>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
