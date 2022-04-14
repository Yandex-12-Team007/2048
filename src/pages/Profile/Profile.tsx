import React, {useState} from 'react';

import Layout from 'Components/Layout';
import './Profile.pcss';
import ProfileInfo from './Components/profile-info/ProfileInfo';
import ProfileInfoEditing from './Components/profile-info-editing/ProfileInfoEditing';
import PasswordInfoEditing from './Components/password-info-editing/PasswordInfoEditing';
import classNames from 'classnames';

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
