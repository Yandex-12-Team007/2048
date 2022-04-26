import {authApi} from '../../api/auth-api';
import {Dispatch} from 'redux';

export const userActionTypes = {
  SET_STATUS: 'SET_STATUS',
  SET_USER: 'SET_USER',
};

export const getUser = () => (dispatch: Dispatch) => {
  return authApi.get().then((response) => {
    dispatch({type: userActionTypes.SET_USER, payload: response});
    dispatch({type: userActionTypes.SET_STATUS, payload: 'success'});
  }).catch(() => {
    dispatch({type: userActionTypes.SET_STATUS, payload: 'failed'});
  })
}
