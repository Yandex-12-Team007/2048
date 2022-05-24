import React, {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import classNames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

import Arrow, {ArrowDirection} from 'Components/Arrow';
import DropDown, {IDropDownItem, DropDownItemType} from 'Components/DropDown';

import {authController} from 'Controllers/authController';

import {resourseLink} from 'Utils/uploadHelper';

import {userAvatarSelector, userNameSelector} from 'Store/selectors';
import {logout} from 'Store/actionCreators/user';

import Routes from 'Constants/Routes';

import {IRootState} from 'Interface/IRootState';

import './ProfileWidget.pcss';

export default function ProfileWidget() {
  const blockRef = useRef(null);
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();

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
          dispatch(logout())
          history.push(Routes.LOGIN);
        })
      },
    },
  ];

  return <div className={'profile-widget'} ref={blockRef}>
    {
      userAvatar.length > 0 ?
      <img
        className={'profile-widget__image'}
        src={resourseLink(userAvatar)}
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
