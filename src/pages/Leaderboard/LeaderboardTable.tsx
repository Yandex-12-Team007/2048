import React from 'react';

import './LeaderboardTable.pcss';

export default function LeaderboardTable({data}) {
  return <div className={'leaderboard-table'}>
    <table>
      <thead>
        <tr>
          <th className={'leaderboard-table__number_cell'}>№</th>
          <th className={'leaderboard-table__user_cell'}>Игрок</th>
          <th className={'leaderboard-table__score_cell'}>Счет</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el, id) => <tr>
          <td className={'leaderboard-table__number_cell'}>{id + 1}</td>
          <td className={'leaderboard-table__user_cell'}>{el.user.login}</td>
          <td className={'leaderboard-table__score_cell'}>{el.score}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
}
