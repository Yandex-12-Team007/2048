import apiModule from './index';
import IUser, {IUserChangePassword} from 'Interface/IUser';

const USER_PATH = '/user/';

enum UserSubpath {
  CHANGE_PROFILE = 'profile',
  CHANGE_PASSWORD = 'password',
}

class UserApi {
  public changeProfile(model : IUser) {
    return apiModule.put(USER_PATH + UserSubpath.CHANGE_PROFILE, model);
  }

  public changePassword(model : IUserChangePassword) {
    return apiModule.put(USER_PATH + UserSubpath.CHANGE_PASSWORD, model);
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
    });
  }
}

export const userApi = new UserApi();
