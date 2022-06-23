import {authApi} from 'Api/auth-api';
import {OAUTH_REDIRECT_URI, OAuthApi} from 'Api/Oauth';
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

    const OauthUrl = AuthController.createOauthUrl(res.service_id, OAUTH_REDIRECT_URI);

    window.location.replace(OauthUrl);
  }

  public async loginWithCode(code : string) {
    return OAuthApi.singIn(code);
  }

  private static createOauthUrl(serviceId, redirectUrl) {
    // eslint-disable-next-line max-len
    return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`;
  }
}

export const authController = new AuthController();
