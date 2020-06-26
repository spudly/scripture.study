import React, {ReactNode} from 'react';
import ErrorAlert from './ErrorAlert';

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

    return error ? <ErrorAlert error={error} grow={grow} /> : children;
  }
}

export default ErrorBoundary;
