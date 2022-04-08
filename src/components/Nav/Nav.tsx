import React from 'react';
import {Link} from 'react-router-dom';

import NAV from 'Constants/Nav';

import './Nav.pcss';

export default function Nav({small = true, changeSize}) {
  /* TODO : Либо будем делать проверку на текущий роут, либо храним состояние */
  const navClass = small ? 'nav' : 'nav nav-full'

  return <div className={navClass}>
    <div className={'nav-link'} onClick={changeSize}>
      <div className={'nav-link-icon-wrapper'}>
        Ресайз
      </div>
    </div>
    {NAV.map((el, id) => <Link
      key={id}
      className={'nav-link ' + (id === 1 ? 'nav-link--active' : '')}
      to={el.link}
    >
      <div
        className={'nav-link-icon-wrapper'}
        dangerouslySetInnerHTML={{__html: `
            <svg class="nav-link-icon">
                ${el.icon}
            </svg>`,
        }}
      />
      {!small ? <span className={'nav-link-title'}>{el.title}</span> : ''}
    </Link>
    )}
  </div>
}
