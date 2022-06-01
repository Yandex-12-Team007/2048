import React from 'react';

import './LeaderboardTable.pcss';

export default function LeaderboardTable({data}) {
  return <div className={'leaderboard-table'}>
    <table>
      <thead>
        <tr>
          <th>Игрок</th>
          <th>Счет</th>
        </tr>
      </thead>
      <tbody>
        {data.map((el, id) => <tr>
          <td>{`${id}. ${el.user.login}`}</td>
          <td>{el.score}</td>
        </tr>)}
      </tbody>
    </table>
  </div>
}
