import apiModule from '../api';
import {ILoginUserModel, IRegistrationUserModel} from 'Interface/IUser';

class AuthApi {
  public signIn(model: ILoginUserModel) {
    return apiModule.post('/auth/signin', model);
  }

  public get() {
    return apiModule.get('/auth/user');
  }

  public signUp(model: IRegistrationUserModel) {
    return apiModule.post('/auth/signup', model);
  }
}

export const authApi = new AuthApi();
