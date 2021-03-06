import React, {useState, useRef, FunctionComponent, ReactNode} from 'react';
import DocumentMeta from 'react-document-meta';
import classNames from 'classnames';

import Header from 'Components/Header';
import Footer from 'Components/Footer';
import ErrorBoundary from 'Components/ErrorBoundary';
import Sidebar from 'Components/Sidebar';

import {getPageTitle} from 'Utils/getTitle';

import './Layout.pcss';

interface ILayoutProps {
  title: string;
  contentClassName?: string;
  children?: ReactNode;
}

const Layout: FunctionComponent<ILayoutProps> = ({
  contentClassName,
  children,
  title,
}) => {
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
    <DocumentMeta meta={meta}/>
    <div className={'container'}>
      <Header title={title} isSmall={isSmall} />
      <main className={'content-wrapper'}>
        <Sidebar
          isSmall={isSmall}
          contentRef={contentRef}
          changeSize={changeSize}
        />
        <div
          className={classNames('content', contentClassName)}
          ref={contentRef}
        >
          {children}
        </div>
        <Footer/>
      </main>
    </div>
  </ErrorBoundary>
}

export default Layout;
