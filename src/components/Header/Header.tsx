import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import ErrorBoundary from 'Components/ErrorBoundary';
import Logo from 'Components/Logo';
import ProfileWidget from 'Components/ProfileWidget';
import {LoginSize} from 'Components/Logo/Logo';

import Routes from 'Constants/Routes';

import './Header.pcss';

export interface IHeaderProps {
  title? : string
  isSmall? : boolean
}

export default function Header({title = '', isSmall = false} : IHeaderProps) {
  return <header className={'header'}>
    <ErrorBoundary>
      <Link
        to={Routes.HOME}
        className={
          classNames('logo-container', {'logo-container--wide': !isSmall})
        }
      >
        <Logo size={isSmall ? LoginSize.SMALL : LoginSize.MEDIUM} />
      </Link>
      <div className={'header-title__wrapper'}>
        <h1 className={'header-title'}>{title}</h1>
      </div>
      <div className={'header-profile'}>
        <ProfileWidget />
      </div>
    </ErrorBoundary>
  </header>
}
