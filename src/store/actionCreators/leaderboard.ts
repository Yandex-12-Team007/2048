import {Dispatch} from 'redux';
import {ILeaderboardData} from 'Interface/ILeaderboard';
import IUser from 'Interface/IUser';

/* TODO : Пока просто будем получать весь список, подумать о пагинации */
export enum LeaderboardActionTypes {
  SET_LEADERBOARD= 'SET_LEADERBOARD',
  SET_SCORE= 'SET_SCORE',
  UPDATE_SCORE= 'UPDATE_SCORE',
  GET_SCORE_BY_USER= 'GET_SCORE_BY_USER',
}

export const setLeaderboard = (leaderboardList : ILeaderboardData) =>
  (dispatch: Dispatch) => {
    return dispatch({
      type: LeaderboardActionTypes.SET_LEADERBOARD,
      payload: leaderboardList,
    })
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
    return dispatch({
      type: LeaderboardActionTypes.UPDATE_SCORE,
      payload: data,
    })
  };

export const setScoreByUser = (user : IUser) =>
  (dispatch: Dispatch) => {
    return dispatch({
      type: LeaderboardActionTypes.GET_SCORE_BY_USER,
      payload: user,
    })
  };
