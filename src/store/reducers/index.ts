import {combineReducers} from 'redux';
import {userReducer} from './user';
import {leaderboardReducer} from './leaderboard';
import {forumReducer} from './forum';

export default combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
  forum: forumReducer,
});
