import React from 'react';

import './ErrorBoundary.pcss';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Обновление состояния, чтобы при последующей отрисовке показать аварийный UI.
    console.log('getDerivedStateFromError');
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch');
    // Вы можете прологировать ошибку с помощью сервиса отчета об ошибках
    console.log(error, info);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // Вы можете отрисовать любой резервный UI
      return <div className={'error-boundary'}>
        <h1>Возникли ошибки.</h1>
      </div>;
    }
    return this.props.children;
  }
}


export default ErrorBoundary;
