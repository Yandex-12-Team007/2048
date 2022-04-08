import React, {useState} from 'react';
import DocumentMeta from 'react-document-meta';

import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Sidebar from 'Components/Sidebar';

import TITLE from 'Constants/title';

import './Layout.pcss';

export default function Layout({children, title = 'шаблон'}) {
  /** TODO: Позже будем использовать хуки на размер окна и состояния из Redux */
  const [small, setSmall] = useState(true);

  function changeSize() {
    setSmall(!small)
  }

  const meta = {
    title: `${TITLE} - ${title}`,
    description: `Тут будет описание странички ${title}`,
  };

  return <DocumentMeta {...meta}>
    <div className={'container'}>
      <Header title={title} small={small} />
      <div className={'content-wrapper'}>
        <Sidebar small={small} changeSize={changeSize}/>
        <div className={'content'}>
          {children}
        </div>
        <Footer/>
      </div>
    </div>
  </DocumentMeta>
}
