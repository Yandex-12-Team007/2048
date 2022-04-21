import {composeWithDevTools} from '@redux-devtools/extension';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers';

export function configureStore() {
  const store = createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(thunk),
      ));
  return store;
}
