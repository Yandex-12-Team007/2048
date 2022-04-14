import React from 'react';
import DocumentMeta from 'react-document-meta';

import './LoginLayout.pcss';
import Logo from 'Components/Logo';
import {LoginSize} from 'Components/Logo/Logo';
import {getPageTitle} from 'Utils/getTitle';

export default function LoginLayout({children, title = 'Авторизация'}) {
  const meta = {
    title: getPageTitle(title),
  };

  return <DocumentMeta {...meta}>
    <div className='login-layout'>
      <Logo className='login-layout__logo' size={LoginSize.LARGE} />
      <div className='login-layout__form'>
        <h1 className='login-layout__title'>{title}</h1>
        <div className='login-layout__content'>
          {children}
        </div>
      </div>
    </div>
  </DocumentMeta>
}
