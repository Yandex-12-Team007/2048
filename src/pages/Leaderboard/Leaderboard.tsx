import React from 'react';
import {useSelector} from 'react-redux';

import Layout from 'Components/Layout';
import LeaderboardTable from './LeaderboardTable';

import {leaderboardSelector} from 'Store/selectors';

import './Leaderboard.pcss';

export default function Leaderboard() {
  const leaderboard = useSelector(leaderboardSelector);

  return <Layout title={'Таблица лидеров'}>
    <LeaderboardTable data={leaderboard.model} />
  </Layout>
}
