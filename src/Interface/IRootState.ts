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

export interface LeaderboardState {
  model: Nullable<ILeaderboardData[]>
  score : number
}

export interface IForumState {
  topic: ITopic[],
  comment: Record<number, IComment>
  topicComment: Record<number, IComment>
}

export interface IRootState {
  user: UserState,
  leaderboard : LeaderboardState,
  forum : IForumState
}

export const getInitialState = (): IRootState => ({
  user: {
    model: null,
    status: 'pending',
  },
  leaderboard: {
    model: null,
    score: 0,
  },
  forum: {
    topic: [],
    comment: [],
    topicComment: [],
  },
});
