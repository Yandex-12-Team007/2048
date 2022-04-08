import React from 'react';

import Logo from 'Components/Logo';
import ProfileWidget from 'Components/ProfileWidget';

import './Header.pcss';

export default function Header({title = '', small = false}) {
  return <div className={'header'}>
    <Logo small={small} />
    <div className={'header-title'}>
      {title}
    </div>
    <div className={'header-profile'}>
      <ProfileWidget />
    </div>
  </div>
}
