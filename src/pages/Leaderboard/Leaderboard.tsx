import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {IRootState} from 'Interface/IRootState';
import {AnyAction} from 'redux';

import Layout from 'Components/Layout';
import LeaderboardTable from './LeaderboardTable';

import {leaderboardSelector} from 'Store/selectors';
import {getLeaderboard} from 'Store/actionCreators/leaderboard';

import './Leaderboard.pcss';

export default function Leaderboard() {
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  const leaderboard = useSelector(leaderboardSelector);

  useEffect(() => {
    if (leaderboard.model === null) {
      dispatch(getLeaderboard());
    }
  }, [])

  const data = leaderboard.model !== null ? leaderboard.model : [];

  return <Layout title={'Таблица лидеров'}>
    <LeaderboardTable data={data} />
  </Layout>
}
