import React, {useState} from 'react';

import Layout from 'Components/Layout';
import './Profile.pcss';
import ProfileInfo from './components/profile-info/ProfileInfo';
import ProfileInfoEditing from './Components/profile-info-editing/ProfileInfoEditing';
import PasswordInfoEditing from './Components/password-info-editing/PasswordInfoEditing';

export default function Profile() {
  const [isInfoEditing, setIsInfoEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);

  const toggleInfoEditingView = () => {
    setIsInfoEditing(!isInfoEditing);
  }

  const togglePasswordEditingView = () => {
    setIsPasswordEditing(!isPasswordEditing);
  }

  const renderInfo = () => {
    if (isInfoEditing || isPasswordEditing) {
      return null;
    }

    if (!isInfoEditing && !isPasswordEditing) {
      return (
        <ProfileInfo
          onInfoChange={toggleInfoEditingView}
          onPasswordChange={togglePasswordEditingView}
        />
      );
    }
  }

  const renderInfoEditing = () => {
    if (!isInfoEditing) {
      return null;
    }

    return (
      <ProfileInfoEditing onSave={toggleInfoEditingView} />
    )
  }

  const renderPasswordEditing = () => {
    if (!isPasswordEditing) {
      return null;
    }

    return (
      <PasswordInfoEditing onSave={togglePasswordEditingView} />
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
