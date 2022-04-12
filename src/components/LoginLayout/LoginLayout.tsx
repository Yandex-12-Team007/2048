import React from 'react';
import DocumentMeta from 'react-document-meta';

import TITLE from 'Constants/title';

import './LoginLayout.pcss';
import Logo from 'Components/Logo';
import {LoginSize} from 'Components/Logo/Logo';

export default function LoginLayout({children, title = 'Авторизация'}) {
  const meta = {
    title: `${TITLE} - ${title}`,
  };

  return <DocumentMeta {...meta}>
    <div className='login-layout'>
      <Logo className='login-layout__logo' size={LoginSize.LARGE} />
      <div className='login-layout__form'>
        {children}
      </div>
    </div>
  </DocumentMeta>
}
