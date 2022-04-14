import Routes from './Routes';

import IRouteLink from 'Interface/IRouteLink';

import gameIcon from 'Static/img/figmaIcons/2048.svg';
import leaderIcon from 'Static/img/figmaIcons/leader.svg';
import forumIcon from 'Static/img/figmaIcons/forum.svg';
import ruleIcon from 'Static/img/figmaIcons/rule.svg';


const NAV: IRouteLink[] = [
  {title: 'Игра', link: Routes.GAME, icon: gameIcon},
  {title: 'Лидеры', link: Routes.LEADERBOARD, icon: leaderIcon},
  {title: 'Форум', link: Routes.FORUM, icon: forumIcon},
  {title: 'Правила', link: Routes.RULES, icon: ruleIcon},
];

export default NAV;
