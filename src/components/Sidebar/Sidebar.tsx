import React from 'react';
import classNames from 'classnames';

import Nav from 'Components/Nav';

import './Sidebar.pcss';

export default function Sidebar({isSmall = true, changeSize, contentRef}) {
  const SidebarClass = classNames({
    'sidebar': true,
    'sidebar_full': !isSmall,
  });

  return <div className={SidebarClass}>
    <Nav isSmall={isSmall} changeSize={changeSize} contentRef={contentRef}/>
  </div>
}
