import React from 'react';

import Logo from 'Components/Logo';
import ProfileWidget from 'Components/ProfileWidget';

import './Header.pcss';

export default function Header({title = '', isSmall = false}) {
  return <div className={'header'}>
    <Logo isSmall={isSmall} />
    <div className={'header-title'}>
      {title}
    </div>
    <div className={'header-profile'}>
      <ProfileWidget />
    </div>
  </div>
}
