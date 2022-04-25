import React, {useState, useRef} from 'react';
import DocumentMeta from 'react-document-meta';

import Header from 'Components/Header';
import Footer from 'Components/Footer';
import ErrorBoundary from 'Components/ErrorBoundary';
import Sidebar from 'Components/Sidebar';

import './Layout.pcss';
import {getPageTitle} from 'Utils/getTitle';

export default function Layout({children, title = 'шаблон'}) {
  /** TODO: Позже будем использовать хуки на размер окна и состояния из Redux */
  const [isSmall, setSmall] = useState(true);
  const contentRef = useRef(null);

  function changeSize() {
    setSmall(!isSmall)
  }

  const meta = {
    title: getPageTitle(title),
    description: `Тут будет описание странички ${title}`,
  };

  return <ErrorBoundary>
    <DocumentMeta {...meta}>
      <div className={'container'}>
        <Header title={title} isSmall={isSmall} />
        <div className={'content-wrapper'}>
          <Sidebar isSmall={isSmall} contentRef={contentRef} changeSize={changeSize}/>
          <div className={'content'} ref={contentRef}>
            {children}
          </div>
          <Footer/>
        </div>
      </div>
    </DocumentMeta>
  </ErrorBoundary>
}
