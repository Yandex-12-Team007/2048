import apiModule from './index';
import {ILeaderboardAdd, ILeaderboardData} from 'Interface/ILeaderboard';

const LEADERBOARD_PATH = '/leaderboard/';

const TEAM_NAME = 'barcelona';
const RATING_FIELD_NAME = 'score';

enum LeaderboardSubpath {
  GET_RECORDS = 'all',
}

class LeaderboardApi {
  public addRecord(data : ILeaderboardData) {
    const pocket : ILeaderboardAdd = {
      data: data,
      ratingFieldName: RATING_FIELD_NAME,
      teamName: TEAM_NAME,
    };

    return apiModule.post(LEADERBOARD_PATH, pocket);
  }

  public getTeamRecords(cursor = 0, limit = 10) {
    const pocket = {
      ratingFieldName: RATING_FIELD_NAME,
      cursor: cursor,
      limit: limit,
    };

    return apiModule.post(LEADERBOARD_PATH + TEAM_NAME, pocket);
  }

  public getAllRecords(cursor = 0, limit = 10) {
    const pocket = {
      ratingFieldName: RATING_FIELD_NAME,
      cursor: cursor,
      limit: limit,
    };

    return apiModule.post(
        LEADERBOARD_PATH + LeaderboardSubpath.GET_RECORDS,
        pocket
    );
  }
}

export const leaderboardApi = new LeaderboardApi();
