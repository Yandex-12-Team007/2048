import React, {Component, ReactNode} from 'react';

import './ErrorBoundary.pcss';

interface IErrorProps {
  children: ReactNode;
}

interface IErrorState {
  hasError : boolean
}

class ErrorBoundary extends Component<IErrorProps, IErrorState> {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      return <div className={'error-boundary'}>
        <h1>Возникли ошибки.</h1>
      </div>;
    }
    return this.props.children;
  }
}


export default ErrorBoundary;
