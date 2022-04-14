import React, {FunctionComponent} from 'react';
import {object, string, ref} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Button from 'Components/Button/Button';
import Input from 'Components/Input/Input';

import './PasswordInfoEditing.pcss';

interface IPasswordInfoEditingProps {
  onSave: () => void;
}

const schema = object({
  oldPassword: string().required('Укажите значение'),
  password: string().required('Укажите значение'),
  doublePassword: string().required('Укажите значение')
      .oneOf([ref('password'), null], 'Пароли должны совпадать'),
}).required();


const PasswordInfoEditing: FunctionComponent<IPasswordInfoEditingProps> = (
    {onSave}) => {
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: '',
      password: '',
      doublePassword: '',
    },
  });

  const handleInfoSave = (data) => {
    console.log('handleInfoSave', data);
    //  TODO: сохранение с помощью api
    onSave();
  }

  return (
    <form
      className='profile-info-editing'
      onSubmit={handleSubmit(handleInfoSave)}
    >
      <ul className='profile-info-editing__list'>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>
            Старый пароль
          </span>
          <Input
            className='profile-info-editing__input'
            type='password'
            errorMessage={errors.oldPassword?.message}
            {...register('oldPassword')}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>
            Новый пароль
          </span>
          <Input
            className='profile-info-editing__input'
            type='password'
            errorMessage={errors.password?.message}
            {...register('password')}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>
            Повторите новый пароль
          </span>
          <Input
            className='profile-info-editing__input'
            type='password'
            errorMessage={errors.doublePassword?.message}
            {...register('doublePassword')}
          />
        </li>
      </ul>
      <Button
        className='profile-info-editing__submit-button'
        text='Сохранить'
        type='submit'
      />
    </form>
  )
}

export default PasswordInfoEditing;
