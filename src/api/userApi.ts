import apiModule from './index';
import fetch from 'node-fetch';
// import {isServer} from 'Store';
import IUser, {IUserChangePassword} from 'Interface/IUser';

const USER_PATH = '/user/';

enum UserSubpath {
  CHANGE_PROFILE = 'profile',
  CHANGE_PASSWORD = 'password',
}

class UserApi {
  public getUserById(userId : number) {
    return apiModule.get(USER_PATH + userId)
  }

  public changeProfile(model : IUser) {
    return apiModule.put(USER_PATH + UserSubpath.CHANGE_PROFILE, model)
        .then((response) => response.json())
  }

  public changePassword(model : IUserChangePassword) {
    return apiModule.put(USER_PATH + UserSubpath.CHANGE_PASSWORD, model)
        .then((response) => response.text())
        .catch((err) => err)
  }

  public uploadProfileImg(formData : FormData) {
    return fetch('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        contentType: 'multipart/form-data',
      },
      method: 'put',
      body: formData,
    })
        .then((res) => res.json());
  }
}

export const userApi = new UserApi();
