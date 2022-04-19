import apiModule from '../api';
import {ILoginUserModel} from 'Interface/IUser';

class AuthApi {
  public signIn(model: ILoginUserModel) {
    return apiModule.post('/auth/signin', model);
  }

  public get() {
    return apiModule.get('/auth/user');
  }
}

export const authApi = new AuthApi();
