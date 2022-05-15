import {authApi} from '../api/auth-api';
import {OAuthApi} from '../api/Oauth';
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

  public async Oauth() {
    const res = await OAuthApi.getServiceId();

    if (!res) {
      throw new Error('Can\'t get service_id');
    }
    console.log(res);
    const singInRes = await OAuthApi.singIn(res.service_id);
    console.log(singInRes);
  }
}

export const authController = new AuthController();
