import React from 'react';
import classNames from 'classnames';

import './Logo.pcss';

export enum LoginSize {
  SMALL,
  MEDIUM,
  LARGE,
}

export default function Logo(
    {size = LoginSize.SMALL, className}: {size: LoginSize, className?: string},
) {
  const logoClass = classNames({
    'logo': true,
    'logo--medium': size === LoginSize.MEDIUM,
    'logo--large': size === LoginSize.LARGE,
  });

  return <div className={classNames(logoClass, className)}>
    <span className={'logo-orange'}>20</span>
    <span className={'logo-light-orange'}>48</span>
  </div>
}
