import React from 'react';

import loadingIcon from 'Static/img/loading/loading.gif';

import './Loading.pcss';

export default function Loading() {
  return <div className={'loading'}>
    <img className={'loading-icon'} src={loadingIcon} alt={'loading...'}/>
  </div>
}
