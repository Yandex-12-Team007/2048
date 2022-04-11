import React from 'react';
import {object, string} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Button from 'Components/Button/Button';
import Input from 'Components/Input/Input';

import './ProfileInfoEditing.pcss';

const schema = object({
  email: string().email('Укажите email').required('Укажите значение'),
  login: string().min(3, 'Укажите значение от 3 до 20 символов').max(20, 'Укажите значение от 3 до 20 символов'),
  firstName: string().required('Укажите значение'),
  secondName: string().required('Укажите значение'),
}).required();

const ProfileInfoEditing = () => {
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'pochta@yandex.ru',
      login: 'ivanivanov',
      firstName: 'Иван',
      secondName: 'Иванов',
    },
  });

  const handleInfoSave = () => {
    //  TODO: сохранение с помощью api
  }

  return (
    <form className='profile-info-editing' onSubmit={handleSubmit(handleInfoSave)}>
      <ul className='profile-info-editing__list'>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Почта</span>
          <Input
            className='profile-info-editing__input'
            errorMessage={errors.email?.message}
            {...register('email')}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Логин</span>
          <Input
            className='profile-info-editing__input'
            errorMessage={errors.login?.message}
            {...register('login')}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Имя</span>
          <Input
            className='profile-info-editing__input'
            errorMessage={errors.firstName?.message}
            {...register('firstName')}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>Фамилия</span>
          <Input
            className='profile-info-editing__input'
            errorMessage={errors.secondName?.message}
            {...register('secondName')}
          />
        </li>
      </ul>
      <Button
        className='profile-info-editing__submit-button'
        text='Сохранить'
        type='submit'
        onClick={handleInfoSave}
      />
    </form>
  )
}

export default ProfileInfoEditing;
