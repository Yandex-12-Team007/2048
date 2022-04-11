import React from 'react';

import './Arrow.pcss';

export enum ArrowDirection {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'bottom',
  BOTTOM = 'top'
}

export default function Arrow({direction = 'left'}) {
  return <div className={'arrow arrow-'+direction}>
    <div className="arrow__top" />
    <div className="arrow__bottom" />
  </div>
}
