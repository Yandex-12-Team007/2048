import React, { useContext, } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Routes from '../../constants/Routes';
import { useHistory } from 'react-router-dom';

import * as Yup from "yup";

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

  const onFormSubmission = async (fields) => {
    await registerUser(fields);
  }

  return (
    <div className={'registrationPage'}>
      <h1>2048</h1>
      <Formik
        initialValues={{
          first_name: '',
          second_name: '',
          login: '',
          email: '',
          password: '',
          phone: ''
        }}
        validationSchema={Yup.object().shape({
          first_name: Yup.string()
            .required('Login is required'),
          second_name: Yup.string()
            .required('Name is required'),
          login: Yup.string()
            .required('Login is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .matches(
              /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,40}$/,
              "Please provide a password of length from 8 to 40 with at least 1 capital letter and 1 digit"
            )
            .required('Password is required'),
          phone: Yup.string()
            .required('Phone is required')
            .matches(
              /^\+?[\d]{10,15}$/,
              "Your phone should be in the format of +79178383838"
            )
        })}
        onSubmit={onFormSubmission}>
        <Form className="registrationForm">
          <div className="registrationForm__container">
            <p className="registrationForm__header">Registration</p>
            <div>
              <label htmlFor="first_name">First name</label>
              <Field type="text" className="registrationInputField" name="first_name" />
              <ErrorMessage name="first_name" component="div" className="invalid-feedback" />
            </div>
            <div>
              <label htmlFor="second_name">Second name</label>
              <Field type="text" name="second_name" />
              <ErrorMessage name="second_name" component="div" className="invalid-feedback" />
            </div>
            <div>
              <label htmlFor="login">Login</label>
              <Field type="text" name="login" />
              <ErrorMessage name="login" component="div" className="invalid-feedback" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            <div>
              <label htmlFor="phone">Phone</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" className="invalid-feedback" />
            </div>
            <div className="registrationForm_ButtonsContainer">
              <button type="submit" className="button_style_colored">Зарегистрироваться</button>
              <button type="reset" className="button_style_default">Войти</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>)
}