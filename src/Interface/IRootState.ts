import IUser from './IUser';

export type LoadStatus = 'success' | 'pending' | 'failed';
type Nullable<T> = T | null;

export interface UserState {
  model: Nullable<IUser>;
  status: LoadStatus;
}

export interface IRootState {
  user: UserState,
}

export const getInitialState = (): IRootState => ({
  user: {
    model: null,
    status: 'pending',
  },
});
