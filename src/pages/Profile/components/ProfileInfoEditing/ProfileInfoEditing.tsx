import React, {FunctionComponent} from 'react';
import {object, string} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Button from 'Components/Button/Button';
import Input from 'Components/Input/Input';

import {userController} from 'Controllers/userController';

import './ProfileInfoEditing.pcss';

interface IProfileInfoEditingProps {
  onSave: () => void;
}

const schema = object({
  email: string().email('Укажите email').required('Укажите значение'),
  login: string()
      .min(3, 'Укажите значение от 3 до 20 символов')
      .max(20, 'Укажите значение от 3 до 20 символов'),
  first_name: string().required('Укажите значение'),
  second_name: string().required('Укажите значение'),
  display_name: string().required('Укажите значение'),
  phone: string().required('Укажите значение'),
}).required();

const ProfileInfoEditing:
  FunctionComponent<IProfileInfoEditingProps> = ({onSave}) => {
    const {handleSubmit, formState: {errors}, register} = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        email: 'pochta@yandex.ru',
        login: 'ivanivanov',
        first_name: 'Иван',
        second_name: 'Иванов',
        display_name: 'Ivanya',
        phone: '79099673030',
      },
    });


    const handleInfoSave = async (data) => {
      const res = await userController.changeProfile(data);
      if (!res) {
        throw new Error('Bad http request');
      }
      onSave();
    }

    return (
      <form
        className='profile-info-editing'
        onSubmit={handleSubmit(handleInfoSave)}
      >
        <ul className='profile-info-editing__list'>
          <li className='profile-info-editing__item'>
            <span className='profile-info-editing__item-caption'>Почта</span>
            <Input
              id='profile-email'
              className='profile-info-editing__input'
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </li>
          <li className='profile-info-editing__item'>
            <span className='profile-info-editing__item-caption'>Логин</span>
            <Input
              id='profile-login'
              className='profile-info-editing__input'
              errorMessage={errors.login?.message}
              {...register('login')}
            />
          </li>
          <li className='profile-info-editing__item'>
            <span className='profile-info-editing__item-caption'>Имя</span>
            <Input
              id='profile-first-name'
              className='profile-info-editing__input'
              errorMessage={errors.first_name?.message}
              {...register('first_name')}
            />
          </li>
          <li className='profile-info-editing__item'>
            <span className='profile-info-editing__item-caption'>
            Отображаемое имя
            </span>
            <Input
              id='profile-display-name'
              type={'text'}
              className='profile-info-editing__input'
              errorMessage={errors.second_name?.message}
              {...register('display_name')}
            />
          </li>
          <li className='profile-info-editing__item'>
            <span className='profile-info-editing__item-caption'>Телефон</span>
            <Input
              id='profile-second-name'
              type={'tel'}
              className='profile-info-editing__input'
              errorMessage={errors.second_name?.message}
              {...register('phone')}
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
