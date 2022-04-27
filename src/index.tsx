/** API React v 18 > */
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import {configureStore} from './store';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Can\'t find root !');
}

const store = configureStore();

const root = ReactDOMClient.createRoot(container);
root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
