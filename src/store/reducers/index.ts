import {combineReducers} from 'redux';
import {userReducer} from './user';
import {leaderboardReducer} from './leaderboard';

export default combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
});
