import {Action} from 'redux';

import {usersActionTypes} from 'Store/actionCreators/users';

import IUser from 'Interface/IUser';
import {IUsersStore} from 'Interface/IRootState';

const defaultState : IUsersStore = {};

interface IActionType extends Action {
  payload : IUser | IUsers[];
}

export function usersReducer(state = defaultState, action: IActionType) {
  switch (action.type) {
    case (usersActionTypes.SET_USER): {
      const user = action.payload;
      // Если пользователь не изменился - нет смысла обновлять state
      // TODO: сделать глубокую проверку
      if (state[user.id] === user) {
        return state;
      }

      const newState = {...state};
      // Если нет, записываем, если существует - обновляем !
      newState[user.id] = user;
      return newState;
    }
    case (usersActionTypes.SET_USERS): {
      const users = action.payload

      const newState = {...state};
      users.forEach((user) => {
        newState[user.id] = user;
      });
      return {...newState};
    }
    default:
      return state
  }
}
