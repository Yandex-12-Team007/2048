import IUser, {Nullable} from 'Interface/IUser';

export interface ILeaderboardAdd {
  data : ILeaderboardData,
  ratingFieldName : string,
  teamName : string
}

export interface ILeaderboardData {
  score : number,
  user : Nullable<IUser>
}
