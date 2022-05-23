import {LeaderboardState} from 'Interface/IRootState';
import {ILeaderboardData} from 'Interface/ILeaderboard';
import {Action} from 'redux';
import {LeaderboardActionTypes} from '../actionCreators/leaderboard';
import IUser from 'Interface/IUser';

const defaultState: LeaderboardState = {
  model: [],
  score: 0,
}

interface IActionType extends Action {
  payload: ILeaderboardData | ILeaderboardData[] | IUser
}

export function leaderboardReducer(
    state = defaultState,
    action : IActionType
) {
  switch (action.type) {
    case LeaderboardActionTypes.SET_LEADERBOARD:
      return {
        ...state,
        model: action.payload,
      }
    case LeaderboardActionTypes.SET_SCORE:
      return {
        ...state,
        score: action.payload,
      }
    case LeaderboardActionTypes.UPDATE_SCORE: {
      // @ts-ignore
      const {user, score} = action.payload;
      state.score = score;
      if (state.model !== null && state.model.length !== 0) {
        const find = state?.model.find((el) => el?.user?.id === user.id);
        if (find) {
          find.score = score;
        }
      }
      return state;
    }
    case LeaderboardActionTypes.GET_SCORE_BY_USER: {
      console.log('GET_SCORE_BY_USER')
      const user = action.payload;
      // Есть смысл только если существует хотя бы 1 рекорд
      if (state.model !== null && state.model.length !== 0) {
        // @ts-ignore
        const find = state.model.find((el) => el.user.id === user.id)
        // Если такая запись есть
        console.log('FIND')
        console.log(find)
        if (find) {
          return {
            ...state,
            score: find.score,
          }
        }
      }

      return state;
    }
    default:
      return state;
  }
}
