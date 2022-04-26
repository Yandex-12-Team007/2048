import apiModule from '../api';
import {ILoginUserModel, IRegistrationUserModel} from 'Interface/IUser';

class AuthApi {
  public signIn(model: ILoginUserModel) {
    return apiModule.post('/auth/signin', model);
  }

  public get() {
    return apiModule.get('/auth/user').then((response) => response.json());
  }

  public signUp(model: IRegistrationUserModel) {
    return apiModule.post('/auth/signup', model);
  }

  public logout() {
    return apiModule.post('/auth/logout', {});
  }
}

export const authApi = new AuthApi();
