import apiModule from './index';
// import {IOauthRequest} from 'Interface/IOauth';
import * as queryString from 'querystring';

const OAUTH_PATH = '/oauth/yandex/';

enum OauthSubpath {
  SERVICE_ID = 'service-id',
}

export const OAUTH_REDIRECT_URI = typeof window !== 'undefined' ?
  window.location.origin :
  null;

class OauthApi {
  private redirect_uri = OAUTH_REDIRECT_URI

  public getServiceId() {
    const params = queryString.stringify({
      redirect_uri: this.redirect_uri,
    })
    return apiModule.get(OAUTH_PATH + OauthSubpath.SERVICE_ID + '?' + params)
        .then((response) => response.json())
  }

  public singIn(code : string) {
    const params = {
      code: code,
      redirect_uri: this.redirect_uri,
    }

    return apiModule.post(OAUTH_PATH, params)
        .then((response) => {
          return response.ok;
        })
  }
}

export const OAuthApi = new OauthApi();
