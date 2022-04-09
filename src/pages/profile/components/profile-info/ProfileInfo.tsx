import React from 'react';
import Button, {EButtonAppearance} from 'Components/Button/Button';
import './ProfileInfo.pcss';

interface IProfileInfoProps {
  onInfoChange: () => void;
  onPasswordChange: () => void;
}

const ProfileInfo: React.FunctionComponent<IProfileInfoProps> = ({
  onInfoChange,
  onPasswordChange,
}) => {
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
      <ul className='profile__button-list'>
        <li>
          <Button
            appearance={EButtonAppearance.TEXT}
            className='profile-info__button'
            text='Изменить данные'
            onClick={onInfoChange}
          />
        </li>
        <li>
          <Button
            appearance={EButtonAppearance.TEXT}
            className='profile-info__button'
            text='Изменить пароль'
            onClick={onPasswordChange}
          />
        </li>
      </ul>
    </div>
  )
}

export default ProfileInfo;
