import {IRootState, LoadStatus} from 'Interface/IRootState';
import {createSelector} from 'reselect';

export const isUserStatusFailedSelector = createSelector(
    (state: IRootState) => state.user.status,
    (userStatus: LoadStatus) => {
      return userStatus === 'failed';
    },
);

export const userNameSelector = (state: IRootState) => {
  return state.user.model?.login || '';
};

export const userAvatarSelector = (state: IRootState) => {
  return state.user.model?.avatar || '';
};
