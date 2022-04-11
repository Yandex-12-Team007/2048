import React from 'react';
import {Link} from 'react-router-dom';
import Routes from 'Constants/Routes';
import './ProfileInfo.pcss';

const ProfileInfo = () => {
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
          <Link
            className='profile-info__button'
            to={Routes.PROFILE_EDITING}
          >
            Изменить данные
          </Link>
        </li>
        <li className='profile-info__button-item'>
          <Link
            className='profile-info__button'
            to={Routes.PROFILE_PASSWORD_EDITING}
          >
            Изменить пароль
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default ProfileInfo;
