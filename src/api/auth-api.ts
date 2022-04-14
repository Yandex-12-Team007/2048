import apiModule from '../api';
import {ILoginUserModel} from 'Interface/IUser';

class AuthApi {
  public signIn(model: ILoginUserModel) {
    return apiModule.post('/auth/signin', model);
  }
}

export const authApi = new AuthApi();
