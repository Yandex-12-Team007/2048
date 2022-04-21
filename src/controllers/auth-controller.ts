import {authApi} from '../api/auth-api';
import {ILoginUserModel, IRegistrationUserModel} from 'Interface/IUser';

export class AuthController {
  public signIn(model: ILoginUserModel) {
    return authApi.signIn(model);
  }

  public signUp(model: IRegistrationUserModel) {
    return authApi.signUp(model);
  }
}

export const authController = new AuthController();
