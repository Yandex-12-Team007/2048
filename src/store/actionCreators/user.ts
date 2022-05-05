import {authApi} from 'Api/auth-api';
import {userApi} from 'Api/userApi';
import {Dispatch} from 'redux';
import IUser, {IUserChangePassword} from 'Interface/IUser';

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

export const updateUser = (model : IUser) => (dispatch : Dispatch) => {
  return userApi.changeProfile(model).then((response) => {
    dispatch({type: userActionTypes.SET_USER, payload: response});
    dispatch({type: userActionTypes.SET_STATUS, payload: 'success'});
  }).catch(() => {
    dispatch({type: userActionTypes.SET_STATUS, payload: 'failed'});
  })
}

export const updatePassword = (model : IUserChangePassword) => (dispatch : Dispatch) => {
  return userApi.changePassword(model).then((response) => {
    dispatch({type: userActionTypes.SET_STATUS, payload: 'success'});
  }).catch(() => {
    dispatch({type: userActionTypes.SET_STATUS, payload: 'failed'});
  })
}
