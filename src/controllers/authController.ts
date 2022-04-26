import {authApi} from '../api/auth-api';
import {ILoginUserModel, IRegistrationUserModel} from 'Interface/IUser';

export class AuthController {
  public signIn(model: ILoginUserModel) {
    return authApi.signIn(model);
  }

  public get() {
    return authApi.get();
  }

  public signUp(model: IRegistrationUserModel) {
    return authApi.signUp(model);
  }

  public logout() {
    return authApi.logout();
  }
}

export const authController = new AuthController();
