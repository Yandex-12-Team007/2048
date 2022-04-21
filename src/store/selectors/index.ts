import {IRootState, LoadStatus} from 'Interface/IRootState';
import {createSelector} from 'reselect';

export const isUserStatusFailedSelector = createSelector(
    (state: IRootState) => state.user.status,
    (userStatus: LoadStatus) => {
      return userStatus === 'failed';
    },
);
