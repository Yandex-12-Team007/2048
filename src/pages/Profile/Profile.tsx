import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import classNames from 'classnames';

import Layout from 'Components/Layout';
import ProfileInfo from './components/ProfileInfo';
import ProfileInfoEditing from './components/ProfileInfoEditing';
import PasswordInfoEditing from './components/PasswordInfoEditing';
import ProfileModal from './components/ProfileModal';

import {userSelector, userAvatarSelector} from 'Store/selectors';

import {resourceLink} from 'Utils/uploadHelper';

import defaultAvatar from 'Static/img/defaultAvatar.png';

import './Profile.pcss';

enum CurrentView {
  PROFILE_INFO,
  PROFILE_EDITING,
  PROFILE_PASSWORD_EDITING,
}

export default function Profile() {
  const user = useSelector(userSelector);
  const userAvatar = useSelector(userAvatarSelector);

  const [currentView, setCurrentView] = useState(CurrentView.PROFILE_INFO);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function back() {
    setCurrentView(CurrentView.PROFILE_INFO);
  }

  const avatarContainerClass = classNames({
    'profile-container__avatar-container': true,
    'profile-container__avatar-container--editing':
      currentView === CurrentView.PROFILE_INFO,
  })

  return (
    <Layout title={'Профиль'}>
      <div className='profile-container'>
        <div className={'profile-container__avatar'}>
          <img
            className={avatarContainerClass}
            src={userAvatar.length > 0 ? resourceLink(userAvatar) : defaultAvatar}
            alt="аватар"
          />
          <div
            className={'profile-container__avatar-change'}
            onClick={() => setModalIsOpen(!modalIsOpen)}
          >
            Поменять аватар
          </div>
        </div>
        {
          currentView === CurrentView.PROFILE_INFO &&
          <ProfileInfo
            user={user}
            onInfoChange={() => setCurrentView(CurrentView.PROFILE_EDITING)}
            onPasswordChange={
              () => setCurrentView(CurrentView.PROFILE_PASSWORD_EDITING)
            }
          />
        }
        {
          currentView === CurrentView.PROFILE_EDITING &&
          <ProfileInfoEditing
            user={user}
            onSave={() => setCurrentView(CurrentView.PROFILE_INFO)}
            back={back}
          />
        }
        {
          currentView === CurrentView.PROFILE_PASSWORD_EDITING &&
          <PasswordInfoEditing
            user={user}
            onSave={() => setCurrentView(CurrentView.PROFILE_INFO)}
            back={back}
          />
        }
      </div>
      <ProfileModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}/>
    </Layout>
  );
}
