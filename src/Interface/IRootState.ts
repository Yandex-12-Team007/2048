import IUser from './IUser';
import {ILeaderboardData} from 'Interface/ILeaderboard';

export type LoadStatus = 'success' | 'pending' | 'failed';
type Nullable<T> = T | null;

export interface UserState {
  model: Nullable<IUser>;
  status: LoadStatus;
}

export interface LeaderboardState {
  model: Nullable<ILeaderboardData[]>
  score : number
}

export interface IRootState {
  user: UserState,
  leaderboard : LeaderboardState
}

export const getInitialState = (): IRootState => ({
  user: {
    model: null,
    status: 'pending',
  },
});
