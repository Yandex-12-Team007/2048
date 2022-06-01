import React from 'react';

import {authController} from 'Controllers/authController';

import YaIcon from 'Static/img/yandex.svg';

import './Oauth.pcss';

export default function Oauth() {
  return <div className={'Oauth'}>
    <div className={'Oauth__yandex'}>
      <div
        className={'Oauth__yandex-wrapper'}
        dangerouslySetInnerHTML={{
          __html: `
              <svg class="Oauth__yandex-icon">
                  ${YaIcon}
              </svg>`,
        }}
        onClick={authController.Oauth}
      />
    </div>
  </div>
}
