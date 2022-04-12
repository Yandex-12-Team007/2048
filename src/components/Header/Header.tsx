import React from 'react';

import Logo from 'Components/Logo';
import ProfileWidget from 'Components/ProfileWidget';

import './Header.pcss';
import classNames from 'classnames';
import {LoginSize} from 'Components/Logo/Logo';

export interface IHeaderProps {
  title? : string
  isSmall? : boolean
}

export default function Header({title = '', isSmall = false} : IHeaderProps) {
  return <div className={'header'}>
    <div
      className={
        classNames('logo-container', {'logo-container--wide': !isSmall})
      }
    >
      <Logo size={isSmall ? LoginSize.SMALL : LoginSize.MEDIUM} />
    </div>
    <div className={'header-title'}>
      {title}
    </div>
    <div className={'header-profile'}>
      <ProfileWidget />
    </div>
  </div>
}
