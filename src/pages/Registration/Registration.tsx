/* eslint-disable camelcase */
import React from 'react';
import {Redirect, Link, useHistory} from 'react-router-dom';
import {object, string} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {authController} from 'Controllers/authController';
import Routes from 'Constants/Routes';
import Input from 'Components/Input/Input';
import LoginLayout from 'Components/LoginLayout/LoginLayout';
import Button from 'Components/Button/Button';
import './Registration.pcss';
import {IRegistrationUserModel} from 'Interface/IUser';
import {phoneRegExp} from './constants';
import {useSelector} from 'react-redux';
import {IRootState} from 'Interface/IRootState';
import {userSelector} from 'Store/selectors';

const schema = object({
  login: string().matches(
      /^[\w-]{3,20}[a-zA-Zа-яА-Я]+[0-9]*$/,
      'Введите логин латиницей от 3 до 20 символов',
  ),
  first_name: string().required('Укажите значение'),
  second_name: string().required('Укажите значение'),
  email: string().email('Укажите email').required('Укажите значение'),
  password: string().matches(
      /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
      'Пароль должен содержать от 8 до 40 символов, ' +
    'хотя бы одну заглавную букву и цифру',
  ),
  phone: string().matches(phoneRegExp, 'Укажите значение'),
}).required();

export default function Registration() {
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      first_name: '',
      second_name: '',
      email: '',
      password: '',
      phone: '',
    },
  });

  const history = useHistory();

  const user = useSelector<IRootState>(userSelector);

  if (user !== null) {
    return <Redirect to={Routes.HOME} />
  }

  const handleSignUp = ({
    login,
    password,
    first_name,
    second_name,
    email,
    phone,
  }: IRegistrationUserModel) => {
    authController.signUp({
      login,
      password,
      first_name,
      second_name,
      email,
      phone,
    }).then(() => {
      history.push(Routes.GAME);
    });
  }

  return (
    <LoginLayout title='Регистрация'>
      <form
        className='registration'
        onSubmit={handleSubmit(handleSignUp)}
      >
        <div>
          <Input
            id='login'
            label='Логин'
            className='registration__form-item'
            errorMessage={errors.login?.message}
            {...register('login')}
          />
          <Input
            id='first_name'
            label='Имя'
            className='registration__form-item'
            errorMessage={errors.first_name?.message}
            {...register('first_name')}
          />
          <Input
            id='second_name'
            label='Фамилия'
            className='registration__form-item'
            errorMessage={errors.second_name?.message}
            {...register('second_name')}
          />
          <Input
            id='phone'
            label='Телефон'
            className='registration__form-item'
            errorMessage={errors.phone?.message}
            {...register('phone')}
          />
          <Input
            id='email'
            label='Email'
            className='registration__form-item'
            errorMessage={errors.email?.message}
            {...register('email')}
          />
          <Input
            id='password'
            label='Пароль'
            type='password'
            className='registration__form-item'
            errorMessage={errors.password?.message}
            errorClassName='registration__password-error-message'
            {...register('password')}
          />
        </div>
        <div>
          <Button
            className='registration__submit-button'
            text='Зарегистрироваться'
            type='submit'
          />
          <Link
            className='registration__login-link'
            to={Routes.LOGIN}
          >
            Войти
          </Link>
        </div>
      </form>
    </LoginLayout>
  )
}
