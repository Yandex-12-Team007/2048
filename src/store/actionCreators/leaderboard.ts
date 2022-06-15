import {Dispatch} from 'redux';
import {ILeaderboardData} from 'Interface/ILeaderboard';
import IUser, {Nullable} from 'Interface/IUser';
import {leaderboardApi} from 'Api/leaderboardApi';

/* TODO : Пока просто будем получать весь список, подумать о пагинации */
export enum LeaderboardActionTypes {
  SET_LEADERBOARD= 'SET_LEADERBOARD',
  SET_SCORE= 'SET_SCORE',
  UPDATE_SCORE= 'UPDATE_SCORE',
  GET_SCORE_BY_USER= 'GET_SCORE_BY_USER',
}

export const getLeaderboard = (offset = 0, limit = 100) =>
  (dispatch: Dispatch) => {
    return leaderboardApi.getTeamRecords(offset, limit)
        .then((data) => data.json())
        .then((data) => dispatch({
          type: LeaderboardActionTypes.SET_LEADERBOARD,
          payload: data.map((el) => {
            return el.data;
          }),
        }));
  };

export const setScore = (score : number) =>
  (dispatch: Dispatch) => {
    return dispatch({
      type: LeaderboardActionTypes.SET_SCORE,
      payload: score,
    })
  };

export const updateScore = (data : ILeaderboardData) =>
  (dispatch: Dispatch) => {
    return leaderboardApi.addRecord(data)
        .then((data) => data.ok)
        .then((res) => {
          if (res) {
            dispatch({
              type: LeaderboardActionTypes.UPDATE_SCORE,
              payload: data,
            })
          }
        })
  };

export const setScoreByUser = (user : Nullable<IUser>) =>
  (dispatch: Dispatch) => {
    return dispatch({
      type: LeaderboardActionTypes.GET_SCORE_BY_USER,
      payload: user,
    })
  };
