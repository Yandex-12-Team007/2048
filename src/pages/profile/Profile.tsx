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

  const renderInfo = () => {
    if (currentView !== CurrentView.PROFILE_INFO) {
      return null;
    }

    return (
      <ProfileInfo
        onInfoChange={() => setCurrentView(CurrentView.PROFILE_EDITING)}
        onPasswordChange={() => setCurrentView(CurrentView.PROFILE_PASSWORD_EDITING)}
      />
    );
  }

  const renderInfoEditing = () => {
    if (currentView !== CurrentView.PROFILE_EDITING) {
      return null;
    }

    return (
      <ProfileInfoEditing
        onSave={() => setCurrentView(CurrentView.PROFILE_INFO)}
      />
    )
  }

  const renderPasswordEditing = () => {
    if (currentView !== CurrentView.PROFILE_PASSWORD_EDITING) {
      return null;
    }

    return (
      <PasswordInfoEditing
        onSave={() => setCurrentView(CurrentView.PROFILE_INFO)}
      />
    )
  }

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
        {renderInfo()}
        {renderInfoEditing()}
        {renderPasswordEditing()}
      </div>
    </Layout>
  );
}
