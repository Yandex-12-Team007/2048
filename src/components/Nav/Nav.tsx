import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

import NAV from 'Constants/Nav';

import './Nav.pcss';

export default function Nav({isSmall = true, changeSize}) {
  /* TODO : Либо будем делать проверку на текущий роут, либо храним состояние */
  const navClass = classNames({
    'nav': true,
    'nav_full': !isSmall,
  });

  return <div className={navClass}>
    <div className={'nav__link'} onClick={changeSize}>
      <div className={'nav__link-icon-wrapper'}>
        Ресайз
      </div>
    </div>
    {NAV.map((el, id) => <Link
      key={id}
      className={classNames({
        'nav__link': true,
        'nav__link_active': (id === 1),
      })}
      to={el.link}
    >
      <div
        className={'nav__link-icon-wrapper'}
        dangerouslySetInnerHTML={{__html: `
            <svg class="nav__link-icon">
                ${el.icon}
            </svg>`,
        }}
      />
      {!isSmall ? <span className={'nav__link-title'}>{el.title}</span> : ''}
    </Link>
    )}
  </div>
}
