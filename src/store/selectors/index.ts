import {IRootState, LoadStatus} from 'Interface/IRootState';
import {createSelector} from 'reselect';

export const isUserStatusFailedSelector = createSelector(
    (state: IRootState) => state.user.status,
    (userStatus: LoadStatus) => {
      return userStatus === 'failed';
    },
);

export const userSelector = (state: IRootState) => {
  return state.user.model;
};

export const userNameSelector = (state: IRootState) => {
  return state.user.model?.login || '';
};

export const userAvatarSelector = (state: IRootState) => {
  return state.user.model?.avatar || '';
};

export const leaderboardSelector = (state: IRootState) => {
  return state?.leaderboard || '';
};

export const forumSelector = (state: IRootState) => {
  return state?.forum;
};
