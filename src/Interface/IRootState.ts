import IUser from './IUser';
import {ILeaderboardData} from 'Interface/ILeaderboard';
import {IComment} from 'Interface/IComment';
import {ITopic} from 'Interface/ITopic';

export type LoadStatus = 'success' | 'pending' | 'failed';
type Nullable<T> = T | null;

export interface UserState {
  model: Nullable<IUser>;
  status: LoadStatus;
}

export interface IUsersStore {
  [id: number] : IUser
}

export interface LeaderboardState {
  model: Nullable<ILeaderboardData[]>
  score : number
}

export interface IForumState {
  topic: ITopic[],
  comment: Record<number, IComment>
  topicComment: Record<number, IComment[]>
}

export interface IRootState {
  user: UserState,
  users: IUsersStore,
  leaderboard : LeaderboardState,
  forum : IForumState
}

export const getInitialState = (): IRootState => ({
  user: {
    model: null,
    status: 'pending',
  },
  users: {},
  leaderboard: {
    model: null,
    score: 0,
  },
  forum: {
    topic: [],
    comment: {},
    topicComment: {},
  },
});
