import React from 'react';

import ErrorBoundary from 'Components/ErrorBoundary';

export default function Loading() {
  return <ErrorBoundary>
    <div className={'loading'}>
      <h1>Loading</h1>
    </div>
  </ErrorBoundary>
}
