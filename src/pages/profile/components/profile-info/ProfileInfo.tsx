import React, {FunctionComponent} from 'react';
import Button, { ButtonAppearance } from 'Components/Button/Button';
import './ProfileInfo.pcss';

interface IProfileInfo {
  onInfoChange: () => void;
  onPasswordChange: () => void;
}

const ProfileInfo: FunctionComponent<IProfileInfo> = ({onInfoChange, onPasswordChange}) => {
  return (
    <div className='profile-info'>
      <ul className='profile-info__list'>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Почта</span>
          <span className='profile-info__item-value'>
            pochta@yandex.ru
          </span>
        </li>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Логин</span>
          <span className='profile-info__item-value'>
            login
          </span>
        </li>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Имя</span>
          <span className='profile-info__item-value'>
            Иван
          </span>
        </li>
        <li className='profile-info__item'>
          <span className='profile-info__item-caption'>Фамилия</span>
          <span className='profile-info__item-value'>
            Иванов
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
