import React from 'react';
import classNames from 'classnames';

import './Logo.pcss';

export default function Logo({isSmall = true}) {
  const logoClass = classNames({
    'logo': true,
    'logo_full': !isSmall,
  });

  return <div className={logoClass}>
    <span className={'logo-orange'}>20</span>
    <span className={'logo-light-orange'}>48</span>
  </div>
}
