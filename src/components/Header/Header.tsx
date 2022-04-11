import React from 'react';

import Nav from 'Components/Nav';
import ErrorBoundary from 'Components/ErrorBoundary';

import './Header.pcss';

export default function Header() {
  return <div className={'header'}>
      <ErrorBoundary>
        <Nav />
      </ErrorBoundary>
    </div>

}
