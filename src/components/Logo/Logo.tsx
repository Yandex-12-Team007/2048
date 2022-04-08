import React from 'react';

import './Logo.pcss';

export default function Logo({small = true}) {
  const logoClass = small ? 'logo' : 'logo logo-full'
  return <div className={logoClass}>
    <span className={'logo-orange'}>20</span>
    <span className={'logo-light-orange'}>48</span>
  </div>
}
