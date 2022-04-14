import React, { useContext, } from 'react';
import Routes from '../../constants/Routes';
import { useHistory } from 'react-router-dom';
import { object, string } from 'yup';
import Input from 'Components/Input/Input';
import Button from 'Components/Button/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import './Registration.pcss';
import useAuth from '../../hooks/useAuth';
import { UserContext } from '../../hooks/userContext';

export default function Registration() {
  const { registerUser } = useAuth();
  const { user } = useContext(UserContext);

  if (user) {
    let history = useHistory();
    history.push(Routes.GAME);
  }

  const onFormSubmission = async (data) => {
    console.log(getValues())
    await registerUser(data);
  }

  const navToLogin = () => {
    let history = useHistory();
    history.push(Routes.LOGIN);
  }

  const schema = object({
    first_name: string().required('Укажите значение'),
    second_name: string().required('Укажите значение'),
    email: string().email('Укажите email').required('Укажите значение'),
    login: string().required('Укажите значение'),
    password: string().required('Укажите значение').matches(
      /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,40}$/,
      "Пароль от 8 до 40 симоволов, содержать число и одну большую букву"
    ),
    phone: string().required('Укажите значение').matches(
      /^\+?[\d]{10,15}$/,
      "Допустимый формат +79178383838"
    )
  }).required();

  const { handleSubmit, formState: { errors }, register, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      password: '',
      phone: ''
    },
  });

  return (
    <div className={'registrationPage'}>
      <h1 className="header2048">
        <span className='firstLetters'>20</span>
        <span className='restLetters'>48</span>
      </h1>
      <form className="registrationForm" onSubmit={handleSubmit(onFormSubmission)}>
        <div className="registrationForm__container">
          <p className="registrationForm__header">Регистрация</p>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="first_name">Имя</label>
            <Input type="text"
              className="registrationInputField"
              errorMessage={errors.first_name?.message}
              {...register('first_name')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="second_name">Фамилия</label>
            <Input type="text"
              className="registrationInputField"
              errorMessage={errors.second_name?.message}
              {...register('second_name')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="login">Логин</label>
            <Input type="text"
              className="registrationInputField"
              errorMessage={errors.login?.message}
              {...register('login')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="email">Почта</label>
            <Input type="text"
              className="registrationInputField"
              errorMessage={errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="password">Пароль</label>
            <Input type="password"
              className="registrationInputField"
              errorMessage={errors.password?.message}
              {...register('password')}
            />
          </div>
          <div className="registrationForm__inputContainer">
            <label className="registrationForm__label" htmlFor="phone">Телефон</label>
            <Input type="text"
              className="registrationInputField"
              errorMessage={errors.phone?.message}
              {...register('phone')}
            />
          </div>
          <div className="registrationForm_ButtonsContainer">
            <Button
              className='registrationForm__defaultButton-colored'
              text='Зарегистрироваться'
              type='submit'
              onClick={onFormSubmission}
            />
            <Button
              className='registrationForm__defaultButton-noColor'
              text='Войти'
              type='submit'
              onClick={navToLogin}
            />
          </div>
        </div>
      </form>
    </div>)
}