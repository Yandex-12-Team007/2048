import React, {useMemo} from 'react';

import Layout from 'Components/Layout';
import LeaderboardTable from './LeaderboardTable';

import IUser from 'Interface/IUser';

import './Leaderboard.pcss';

export interface ILeaderboardItem {
  user : IUser,
  value : number
}

export default function Leaderboard() {
  const LEADERBOARD_EXAMPLE : ILeaderboardItem[] = useMemo(() => [
    {
      user : {
        id : 167805,
        avatar : undefined,
        email : 'xobaboba@yandex.ru',
        login : 'xoba',
        first_name : 'boba',
        display_name : 'boba hoba',
        second_name : 'boba hoba',
        phone : '+79000000001'
      },
      value : 10
    },
    {
      user : {
        id : 167856,
        avatar : undefined,
        email : 'bobahoba@yandex.ru',
        login : 'boba',
        first_name : 'hoba',
        display_name : 'hoba boba',
        second_name : 'Ilich',
        phone : '+79000000002'
      },
      value : 5
    },
    {
      user : {
        id : 167856,
        avatar : undefined,
        email : 'bobahoba@yandex.ru',
        login : 'boba',
        first_name : 'hoba',
        display_name : 'hoba boba',
        second_name : 'Ilich',
        phone : '+79000000002'
      },
      value : 3
    },
    {
      user : {
        id : 167856,
        avatar : undefined,
        email : 'bobahoba@yandex.ru',
        login : 'boba',
        first_name : 'hoba',
        display_name : 'hoba boba',
        second_name : 'Ilich',
        phone : '+79000000002'
      },
      value : 1
    },
  ], []);

  return <Layout title={'Таблица лидеров'}>
    <LeaderboardTable data={LEADERBOARD_EXAMPLE} />
  </Layout>
}
