import {Dispatch} from 'redux';

import {userApi} from 'Api/userApi';

import IUser from 'Interface/IUser';

export const usersActionTypes = {
  SET_USER: 'SET_USERS',
  SET_USERS: 'SET_USERS_DATA',
};

export const getUser = (userId : number) => (dispatch: Dispatch) => {
  return userApi.getUserById(userId)
      .then((res) => res.json())
      .then((res) => {
        dispatch({type: usersActionTypes.SET_USER, payload: res});
      })
}

export const setUsersFromData = (users : IUser[]) => (dispatch: Dispatch) => {
  if (users.length !== 0) {
    dispatch({type: usersActionTypes.SET_USERS, payload: users});
  }
}
