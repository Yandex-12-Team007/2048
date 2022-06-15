/** API React v 18 > */
import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import {loadableReady} from '@loadable/component';

import {configureStore} from './store';
import {IRootState} from './Interface/IRootState';

declare global {
  interface Window {
      __INITIAL_STATE__?: IRootState;
  }
}

const container = document.getElementById('root');

if (!container) {
  throw new Error('Can\'t find root !');
}

const initialState = window.__INITIAL_STATE__;
delete window.__INITIAL_STATE__;

const store = configureStore(initialState);

loadableReady(() => {
  hydrateRoot(
      container,
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
  );
});

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
