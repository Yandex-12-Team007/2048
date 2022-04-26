import React from 'react';
import {useHistory} from 'react-router-dom';
import Arrow, {ArrowDirection} from 'Components/Arrow';
import DropDown, {IDropDownItem, DropDownItemType} from 'Components/DropDown';

import Routes from 'Constants/Routes';

import './ProfileWidget.pcss';
import {useSelector} from 'react-redux';
import {userAvatarSelector, userNameSelector} from 'Store/selectors';
import classNames from 'classnames';
import {authController} from '../../controllers/authController';

export default function ProfileWidget() {
  const userName = useSelector(userNameSelector);
  const userAvatar = useSelector(userAvatarSelector);

  const history = useHistory();

  const options : IDropDownItem[] = [
    {
      type: DropDownItemType.LINK,
      title: 'Профиль',
      link: Routes.PROFILE,
    },
    {
      type: DropDownItemType.BUTTON,
      title: 'Выйти',
      action: () => {
        authController.logout().then(() => {
          history.push(Routes.LOGIN);
        })
      },
    },
  ];

  return <div className={'profile-widget'}>
    {
      userAvatar.length > 0 ?
      <img
        className={'profile-widget__image'}
        src={userAvatar}
        alt={'аватар'}
      /> :
      <div
        className={
          classNames('profile-widget__image', 'profile-widget__image--empty')
        }
      />
    }
    <div className={'profile-widget__display-name-wrapper'}>
      {userName}
    </div>
    <div className={'profile-widget__options-wrapper'}>
      <DropDown options={options}>
        <Arrow direction={ArrowDirection.BOTTOM}/>
      </DropDown>
    </div>
  </div>
}
