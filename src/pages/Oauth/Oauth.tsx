import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {AnyAction} from 'redux';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import queryString from 'query-string';

import {authController} from 'Controllers/authController';

import {getUser} from 'Store/actionCreators/user';
import {userStatusSelector} from 'Store/selectors';

import {IRootState} from 'Interface/IRootState';

import Routes from 'Constants/Routes';

export default function OauthPage() {
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  // Состояние для ридеректа при остутствии кода / ошибках при авторизации
  const [badAuth, setBadAuth] = useState(false);
  const userStatus = useSelector<IRootState>(userStatusSelector);

  useEffect(() => {
    const parse = queryString.parse(window.location.search)
    // Если пришел код - пытаемся по нему авторизоваться
    if (parse && parse.code &&
      typeof parse.code === 'string' &&
      userStatus !== 'success' // Если уже вошли - нет смысла от запроса
    ) {
      // Если получилось авторизоваться - нас перекинет на главную
      authController.loginWithCode(parse.code)
          .then((res) => {
            if (res) {
              dispatch(getUser());
            }
          })
          .catch((err) => {
            setBadAuth(true);
          });
    } else {
      setBadAuth(true);
    }
  }, []);
  // Точки выхода
  if (userStatus === 'success') {
    return <Redirect to={Routes.HOME} />
  }
  if (userStatus === 'failed') {
    return <Redirect to={Routes.LOGIN} />
  }

  // Редирект если возникли ошибки при авторизации по Oauth | не пришел code
  if (badAuth) {
    return <Redirect to={Routes.LOGIN} />
  }

  // TODO: Забацать красивую страницу с ожиданием
  return <div>Loading...</div>
}
