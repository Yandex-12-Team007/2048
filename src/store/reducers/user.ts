import {LoadStatus, UserState} from 'Interface/IRootState';
import IUser from 'Interface/IUser';
import {Action} from 'redux';
import {userActionTypes} from '../actionCreators/user';

const defaultState: UserState = {
  status: 'pending',
  model: null,
};

interface IActionType extends Action {
  payload: LoadStatus | IUser;
}

export function userReducer(state = defaultState, action: IActionType): UserState {
  switch (action.type) {
    case userActionTypes.SET_STATUS:
      return {
        ...state,
        status: action.payload as LoadStatus,
      };
    case userActionTypes.SET_USER:
      return {
        ...state,
        model: action.payload as IUser,
      };
    default:
      return state;
  }
}
