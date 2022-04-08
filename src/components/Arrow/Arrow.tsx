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
    <div className="arrow-top" />
    <div className="arrow-bottom" />
  </div>
}
