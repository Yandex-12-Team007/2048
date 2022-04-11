import React from 'react';

import Layout from 'Components/Layout';
import './index.pcss';
import ProfileInfo from './Components/profile-info/ProfileInfo';
import ProfileInfoEditing from './Components/profile-info-editing/ProfileInfoEditing';
import PasswordInfoEditing from './Components/password-info-editing/PasswordInfoEditing';
import Routes from 'Constants/Routes';

export default function Profile(props) {
  const renderInfo = () => {
    if (props.location.pathname !== Routes.PROFILE) {
      return null;
    }

    return (
      <ProfileInfo />
    );
  }

  const renderInfoEditing = () => {
    if (props.location.pathname !== Routes.PROFILE_EDITING) {
      return null;
    }

    return (
      <ProfileInfoEditing />
    )
  }

  const renderPasswordEditing = () => {
    if (props.location.pathname !== Routes.PROFILE_PASSWORD_EDITING) {
      return null;
    }

    return (
      <PasswordInfoEditing />
    )
  }

  return (
    <Layout title={'Профиль'}>
      <div className='profile-container'>
        <div className='profile-container__avatar-container'></div>
        {renderInfo()}
        {renderInfoEditing()}
        {renderPasswordEditing()}
      </div>
    </Layout>
  );
}
