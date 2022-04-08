import React, {useState} from 'react';
import Arrow, {ArrowDirection} from 'Components/Arrow';

import PROFILE from 'Constants/profileExample';

import './ProfileWidget.pcss';

export default function ProfileWidget() {
  const [showMenu, setShowMenu] = useState(false);

  /* TODO: Вместо константы будем общатся с хранилищем */
  return <div className={'profile-widget'}>
    <div className={'profile-widget-image-wrapper'}>
      <img src={PROFILE.avatar} alt={'аватар'}/>
    </div>
    <div className={'profile-widget-display-name-wrapper'}>
      {PROFILE.display_name}
    </div>
    <div
      className={'profile-widget-options-wrapper'}
      onClick={() => setShowMenu(!showMenu)}
    >
      <Arrow direction={ArrowDirection.BOTTOM}/>
    </div>
    {showMenu ? <div> Менюха =) </div> : ''}
  </div>
}
