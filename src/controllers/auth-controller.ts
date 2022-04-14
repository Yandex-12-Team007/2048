import {authApi} from '../api/auth-api';
import {ILoginUserModel} from 'Interface/IUser';

export class AuthController {
  public signIn(model: ILoginUserModel) {
    return authApi.signIn(model);
  }
}

export const authController = new AuthController();
