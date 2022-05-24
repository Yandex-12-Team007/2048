import apiModule from './index';
// import {IOauthRequest} from 'Interface/IOauth';
import * as queryString from 'querystring';

const OAUTH_PATH = '/oauth/yandex/';

enum OauthSubpath {
  SERVICE_ID = 'service-id',
}

class OauthApi {
  private redirect_uri = window.location.origin;

  public getServiceId() {
    const params = queryString.stringify({
      redirect_uri: this.redirect_uri,
    })
    return apiModule.get(OAUTH_PATH + OauthSubpath.SERVICE_ID + '?' + params)
        .then((response) => response.json())
  }

  public singIn(code : string) {
    const model = {
      code: code,
      redirect_uri: this.redirect_uri,
    }

    return apiModule.post(OAUTH_PATH, model)
        .then((response) => response.json())
  }
}

export const OAuthApi = new OauthApi();
