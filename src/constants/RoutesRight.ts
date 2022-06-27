import Routes from './Routes';

const RouterRight = [
  {match: Routes.OAUTH, private: false},
  {match: Routes.LOGIN, private: false},
  {match: Routes.REGISTRATION, private: false},
  {match: Routes.GAME, private: true},
  {match: Routes.LEADERBOARD, private: true},
  {match: Routes.FORUM, private: true},
  // Нет смысла дублировать правила для карточки форума с текущим match
  {match: Routes.PROFILE, private: true},
  {match: Routes.RULES, private: true},
  {match: Routes.ERROR_FOR_SERVER_AUTH, private: false},
  {match: Routes.HOME_FOR_SERVER_AUTH, private: true},
];

export default RouterRight
