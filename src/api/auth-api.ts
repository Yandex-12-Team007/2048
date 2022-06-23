import apiModule from '../api';
import fetch from 'node-fetch';
import {ILoginUserModel, IRegistrationUserModel} from 'Interface/IUser';

class AuthApi {
  public signIn(model: ILoginUserModel) {
    return apiModule.post('/auth/signin', model);
  }

  public get() {
    return apiModule.get('/auth/user').then((response) => response.json());
  }

  // TODO : Сделать утилиту преобразования обьекта в cookie
  public serverGet(cookie) {
    return fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'cookie': `authCookie=${cookie.authCookie}; uuid=${cookie.uuid}`,
        'Content-Type': 'application/json',
      },
    })
  }

  public signUp(model: IRegistrationUserModel) {
    return apiModule.post('/auth/signup', model);
  }

  public logout() {
    return apiModule.post('/auth/logout', {});
  }
}

export const authApi = new AuthApi();
