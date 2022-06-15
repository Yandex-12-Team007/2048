import React from 'react';

import ErrorBoundary from 'Components/ErrorBoundary';

import './Footer.pcss';

export default function Footer() {
  return <ErrorBoundary>
    <footer className={'footer'} />
  </ErrorBoundary>
}
