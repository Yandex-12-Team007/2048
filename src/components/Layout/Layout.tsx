import React from 'react';
import DocumentMeta from 'react-document-meta';

import Header from 'Components/Header';
import Footer from 'Components/Footer';
import ErrorBoundary from 'Components/ErrorBoundary';

import TITLE from 'Constants/title';

import './Layout.pcss';

export default function Layout({children, title = 'шаблон'}) {
  const meta = {
    title: `${TITLE} - ${title}`,
    description: `Тут будет описание странички ${title}`,
  };

  return <ErrorBoundary>
    <DocumentMeta {...meta}>
      <div className={'container'}>
        <Header />
        <div className={'content'}>
          {children}
        </div>
        <Footer/>
      </div>
    </DocumentMeta>
  </ErrorBoundary>
}
