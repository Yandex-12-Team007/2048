/*
import {leaderboardApi} from 'Api/leaderboardApi';
import {ILeaderboardData} from 'Interface/ILeaderboard';
import {
  setScore,
  updateScore,
  setScoreByUser,
} from 'Store/actionCreators/leaderboard'
import IUser, {Nullable} from 'Interface/IUser';
*/

class LeaderboardController {
  /*
  public async addRecord(dispatch, score : number, user : Nullable<IUser>) {
    const model : ILeaderboardData = {
      score: score,
      user: user,
    }

    const res = await leaderboardApi.addRecord(model)
        .then((data) => data.ok);

    if (res) {
      dispatch(updateScore(model));
    }

    return res;
  }

  public async getRecords(dispatch, offset = 0, limit = 100) {
    const res = await leaderboardApi.getTeamRecords(offset, limit)
        .then((data) => data.json())
        .then((data) => data.map((el) => {
          return el.data;
        }))
    // Преобразовывае ответ на запрос в формат ILeaderboardData[]
    dispatch(setLeaderboard(res));

    return res;
  }

  // Проверяем существует ли рекорд для данного пользователя
  public async getScoreFromUser(dispatch, user : Nullable<IUser>) {
    if (user !== null) {
      dispatch(setScoreByUser(user))
    }
  }
   */
}

export const leaderboardController = new LeaderboardController();
