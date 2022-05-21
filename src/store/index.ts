import {composeWithDevTools} from '@redux-devtools/extension';
import {IRootState} from 'Interface/IRootState';
import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

function getComposeEnhancers() {
  return process.env.NODE_ENV !== 'production' && !isServer ? composeWithDevTools : compose;
}

export function configureStore(initialState?: IRootState) {
  const composeEnhancers = getComposeEnhancers();
  console.log(composeEnhancers, isServer);
  const store = createStore(
      rootReducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk),
      ));

  return store;
}
