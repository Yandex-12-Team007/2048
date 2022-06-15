import React, {FunctionComponent} from 'react';
import Button, {ButtonAppearance} from 'Components/Button/Button';
import './ProfileInfo.pcss';
import IUser, {Nullable} from 'Interface/IUser';

interface IProfileInfo {
  user: Nullable<IUser>,
  onInfoChange: () => void;
  onPasswordChange: () => void;
}

const ProfileInfo: FunctionComponent<IProfileInfo> = ({
  user,
  onInfoChange,
  onPasswordChange,
}) => {
  return (
    <div className='profile-info'>
      <ul className='profile-info__list'>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Почта</span>
          <span className='profile-info__item-value'>
            {user?.email ?? ''}
          </span>
        </li>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Логин</span>
          <span className='profile-info__item-value'>
            {user?.login ?? ''}
          </span>
        </li>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Имя</span>
          <span className='profile-info__item-value'>
            {user?.first_name ?? ''}
          </span>
        </li>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Фамилия</span>
          <span className='profile-info__item-value'>
            {user?.second_name ?? ''}
          </span>
        </li>
      </ul>
      <ul className='profile-info__button-list'>
        <li className='profile-info__button-item'>
          <Button
            appearance={ButtonAppearance.TEXT}
            text='Изменить данные'
            onClick={onInfoChange}
          />
        </li>
        <li className='profile-info__button-item'>
          <Button
            appearance={ButtonAppearance.TEXT}
            text='Изменить пароль'
            onClick={onPasswordChange}
          />
        </li>
      </ul>
    </div>
  )
}

export default ProfileInfo;
