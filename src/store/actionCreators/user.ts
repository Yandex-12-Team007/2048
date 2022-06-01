import {authApi} from 'Api/auth-api';
import {userApi} from 'Api/userApi';
import {Dispatch} from 'redux';
import IUser from 'Interface/IUser';

export const userActionTypes = {
  SET_STATUS: 'SET_STATUS',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
};

export const logout = () => (dispatch: Dispatch) => {
  return dispatch({type: userActionTypes.LOGOUT, payload: {}});
}

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

export const updateAvatar = (formData : FormData) => (dispatch : Dispatch) => {
  return userApi.uploadProfileImg(formData).then((response) => {
    dispatch({type: userActionTypes.SET_USER, payload: response});
    dispatch({type: userActionTypes.SET_STATUS, payload: 'success'});
  }).catch(() => {
    dispatch({type: userActionTypes.SET_STATUS, payload: 'failed'});
  })
}
