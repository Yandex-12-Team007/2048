import React from 'react';
import Arrow, {ArrowDirection} from 'Components/Arrow';
import DropDown, {IDropDownItem, IDropDownItemType} from 'Components/DropDown';

import PROFILE from 'Constants/profileExample';
import Routes from 'Constants/Routes';

import './ProfileWidget.pcss';

export default function ProfileWidget() {
  const options : IDropDownItem[] = [
    {
      type: IDropDownItemType.BUTTON,
      title: 'Тест кнопки =)',
      action: () => console.log('test'),
    },
    {
      type: IDropDownItemType.LINK,
      title: 'Профиль',
      link: Routes.PROFILE,
    },
  ];

  return <div className={'profile-widget'}>
    <div className={'profile-widget__image-wrapper'}>
      <img
        className={'profile-widget__image'}
        src={PROFILE.avatar}
        alt={'аватар'}
      />
    </div>
    <div className={'profile-widget__display-name-wrapper'}>
      {PROFILE.display_name}
    </div>
    <div className={'profile-widget__options-wrapper'}>
      <DropDown options={options}>
        <Arrow direction={ArrowDirection.BOTTOM}/>
      </DropDown>
    </div>
  </div>
}
