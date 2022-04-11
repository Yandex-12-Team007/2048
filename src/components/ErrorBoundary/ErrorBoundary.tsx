import React, {Component} from 'react';

import './ErrorBoundary.pcss';

interface IError {
  hasError : boolean
}

class ErrorBoundary extends Component<Record<any, any>, IError> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
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
