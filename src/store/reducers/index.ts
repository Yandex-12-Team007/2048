import {combineReducers} from 'redux';
import {userReducer} from './user';
import {leaderboardReducer} from './leaderboard';
import {forumReducer} from './forum';
import {usersReducer} from './users';

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  leaderboard: leaderboardReducer,
  forum: forumReducer,
});
