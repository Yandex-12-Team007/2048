import React, {useState} from 'react';

import classNames from 'classnames';

import Layout from 'Components/Layout';
import ProfileInfo from './components/ProfileInfo';
import ProfileInfoEditing from './components/ProfileInfoEditing';
import PasswordInfoEditing from './components/PasswordInfoEditing';

import './Profile.pcss';

enum CurrentView {
  PROFILE_INFO,
  PROFILE_EDITING,
  PROFILE_PASSWORD_EDITING,
}

export default function Profile() {
  const [currentView, setCurrentView] = useState(CurrentView.PROFILE_INFO);

  return (
    <Layout title={'Профиль'}>
      <div className='profile-container'>
        <img
          className={
            classNames(
                'profile-container__avatar-container',
                {'profile-container__avatar-container--editing': currentView === CurrentView.PROFILE_INFO},
            )
          }
          src=""
          alt=""
        />
        {
          currentView === CurrentView.PROFILE_INFO &&
          <ProfileInfo
            onInfoChange={() => setCurrentView(CurrentView.PROFILE_EDITING)}
            onPasswordChange={
              () => setCurrentView(CurrentView.PROFILE_PASSWORD_EDITING)
            }
          />
        }
        {
          currentView === CurrentView.PROFILE_EDITING &&
          <ProfileInfoEditing
            onSave={() => setCurrentView(CurrentView.PROFILE_INFO)}
          />
        }
        {
          currentView === CurrentView.PROFILE_PASSWORD_EDITING &&
          <PasswordInfoEditing
            onSave={() => setCurrentView(CurrentView.PROFILE_INFO)}
          />
        }
      </div>
    </Layout>
  );
}
