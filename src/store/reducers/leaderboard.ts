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
      // @ts-ignore - Проблема с 3-й типом входных данных
      const {user, score} = action.payload;
      const nextState = {...state}
      // Защита от перезаписи рекорда на более маленький
      let newScore = score;
      if (nextState.model !== null && nextState.model.length !== 0) {
        const find = nextState?.model.find((el) => el?.user?.id === user.id);
        if (find) {
          newScore = find.score < score ? score : find.score;
          find.score = newScore;
        }
      }
      return {
        ...nextState,
        score: newScore,
      };
    }
    case LeaderboardActionTypes.GET_SCORE_BY_USER: {
      // @ts-ignore - Проблема с 3-й типом входных данных
      const user : IUser = action.payload;
      // Есть смысл только если существует хотя бы 1 рекорд
      if (state.model !== null && state.model.length !== 0) {
        const find = state.model.find(
            (el) => el.user !== null && el.user.id === user.id
        );
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
