/** API React v 18 > */
import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import {loadableReady} from '@loadable/component';

import {configureStore} from './store';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Can\'t find root !');
}

const store = configureStore();

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
