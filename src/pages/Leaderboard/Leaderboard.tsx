import React from 'react';
import {useSelector} from 'react-redux';

import Layout from 'Components/Layout';
import LeaderboardTable from './LeaderboardTable';

import {leaderboardSelector} from 'Store/selectors';

import './Leaderboard.pcss';

export default function Leaderboard() {
  const leaderboard = useSelector(leaderboardSelector);

  const data = leaderboard.model !== null ? leaderboard.model : [];

  return <Layout title={'Таблица лидеров'}>
    <LeaderboardTable data={data} />
  </Layout>
}
