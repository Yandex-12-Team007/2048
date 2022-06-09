import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import classNames from 'classnames';

import ErrorBoundary from 'Components/ErrorBoundary';

import NAV from 'Constants/Nav';
import Routes from 'Constants/Routes';

import fullSize from 'Static/img/resize/toBig.svg';
import smallSize from 'Static/img/resize/toSmall.svg';

import fullScreenSvg from 'Static/img/fullscreen/fullscreen.svg';

import './Nav.pcss';
import IRouteLink from 'Interface/IRouteLink';

export interface INavLink {
  isSmall: boolean,
  title: string,
  link: null | Routes,
  icon: string
  linkActive: boolean,
  action: null | any,
}

export default function Nav({isSmall = true, changeSize, contentRef}) {
  const location = useLocation();
  const navClass = classNames({
    'nav': true,
    'nav_full': !isSmall,
  });

  const resizeIcon = isSmall ? smallSize : fullSize;

  const nav: INavLink[] = Array.from(NAV).map((el: IRouteLink) => {
    const navLink : INavLink = {
      ...el,
      isSmall: isSmall,
      linkActive: location.pathname.match(el.link),
      action: null,
    }
    return navLink;
  });

  const resize = {
    isSmall: isSmall,
    title: 'Сжать',
    link: null,
    icon: resizeIcon,
    linkActive: false,
    action: () => changeSize(!isSmall),
  }

  const fullScreen = {
    isSmall: isSmall,
    title: 'Полный экран',
    link: null,
    icon: fullScreenSvg,
    linkActive: false,
    action: () => contentRef.current.requestFullscreen(),
  }

  nav.unshift(fullScreen, resize);

  return <div className={navClass}>
    <ErrorBoundary>
      {nav.map((el, id) => <NavLink
        {...el}
        key={id}
      />)}
    </ErrorBoundary>
  </div>
}

function NavLink({
  isSmall,
  icon,
  title,
  link = null,
  linkActive = false,
  action = null,
}: INavLink) {
  if (link !== null) {
    return <Link
      className={classNames({
        'nav__link': true,
        'nav__link_active': linkActive,
      })}
      to={link}
    >
      <div
        className={'nav__link-icon-wrapper'}
        dangerouslySetInnerHTML={{
          __html: `
          <svg class="nav__link-icon">
              ${icon}
          </svg>`,
        }}
      />
      {!isSmall ? <span className={'nav__link-title'}>{title}</span> : null}
    </Link>
  }

  if (action !== null) {
    return <div className={'nav__link'} onClick={action}>
      <div
        className={'nav__link-icon-wrapper'}
        dangerouslySetInnerHTML={{
          __html: `
              <svg class="nav__link-icon">
                  ${icon}
              </svg>`,
        }}
      />
      {!isSmall ? <span className={'nav__link-title'}>{title}</span> : null}
    </div>
  }

  return <></>;
}
