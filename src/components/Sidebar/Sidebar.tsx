import React from 'react';

import Nav from 'Components/Nav';

import './Sidebar.pcss';

export default function Sidebar({small = true, changeSize}) {
  const SidebarClass = small ? 'sidebar' : 'sidebar sidebar-full'
  return <div className={SidebarClass}>
    <Nav small={small} changeSize={changeSize}/>
  </div>
}
