import React, {FunctionComponent} from 'react';
import {object, string, ref} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Button from 'Components/Button/Button';
import Input from 'Components/Input/Input';

import {userController} from 'Controllers/userController';

import './PasswordInfoEditing.pcss';
import {useDispatch} from 'react-redux';

interface IPasswordInfoEditingProps {
  onSave: () => void;
  back: () => void;
}

export const schema = object({
  oldPassword: string().required('Укажите значение'),
  newPassword: string().required('Укажите значение'),
  reNewPassword: string().required('Укажите значение')
      .oneOf([ref('newPassword'), null], 'Пароли должны совпадать'),
}).required();

const PasswordInfoEditing: FunctionComponent<IPasswordInfoEditingProps> = (
    {onSave, back}) => {
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
    },
  });

  const dispatch = useDispatch();

  const handleInfoSave = async (data) => {
    const res = await userController.changePassword(dispatch, data);

    if (res === 'OK') {
      onSave();
    }

    // TODO: Тут обработку ошибок
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
            id='profile-old-password'
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
            id='profile-password'
            className='profile-info-editing__input'
            type='password'
            errorMessage={errors.newPassword?.message}
            {...register('newPassword')}
          />
        </li>
        <li className='profile-info-editing__item'>
          <span className='profile-info-editing__item-caption'>
            Повторите новый пароль
          </span>
          <Input
            id='profile-double-password'
            className='profile-info-editing__input'
            type='password'
            errorMessage={errors.reNewPassword?.message}
            {...register('reNewPassword')}
          />
        </li>
      </ul>
      <div className='profile-info-editing__action-wrapper'>
        <Button
          className='profile-info-editing__submit-button'
          text='Сохранить'
          type='submit'
        />
        <Button
          className={'profile-info-editing__back-button'}
          text={'Назад'}
          type={'button'}
          onClick={back}
        />
      </div>
    </form>
  )
}

export default PasswordInfoEditing;
