import React from 'react';

import loadingIcon from 'Static/img/loading/loading.gif';

import './Loading.pcss';

export default function Loading() {
  return <div className={'loading loading_active'}>
    <div className={'loading__wrapper'}>
      <img className={'loading__icon'} src={loadingIcon} alt={'loading...'}/>
    </div>
  </div>
}
