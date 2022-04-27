import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {object, string} from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {authController} from '../../controllers/authController';
import Routes from 'Constants/Routes';
import Input from 'Components/Input/Input';
import LoginLayout from 'Components/LoginLayout/LoginLayout';
import Button from 'Components/Button/Button';
import './Login.pcss';

const schema = object({
  login: string().matches(
      /^[\w-]{3,20}[a-zA-Zа-яА-Я]+[0-9]*$/,
      'Введите логин латиницей от 3 до 20 символов',
  ),
  password: string().matches(
      /^(?=.*\d)(?=.*[A-Z]).{8,40}$/,
      'Пароль должен содержать от 8 до 40 символов, хотя бы одну заглавную букву и цифру',
  ),
}).required();

export default function Login() {
  const {handleSubmit, formState: {errors}, register} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const history = useHistory();

  const handleSignIn = (
      {login, password}: { login: string, password: string }
  ) => {
    authController.signIn({login, password}).then(() => {
      history.push(Routes.GAME);
    });
  }

  return (
    <LoginLayout title='Вход'>
      <form
        className='login-form'
        onSubmit={handleSubmit(handleSignIn)}
      >
        <div>
          <Input
            id='login'
            label='Логин'
            className='login-form__login'
            errorMessage={errors.login?.message}
            {...register('login')}
          />
          <Input
            id='password'
            label='Пароль'
            type='password'
            className='login-form__password'
            errorMessage={errors.password?.message}
            errorClassName='login-form__password-error-message'
            {...register('password')}
          />
        </div>
        <div>
          <Button
            className='login-form__submit-button'
            text='Авторизоваться'
            type='submit'
          />
          <Link
            className='login-form__signup-link'
            to={Routes.REGISTRATION}
          >
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </LoginLayout>
  )
}
