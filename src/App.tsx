import React, {useEffect, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import loadable from '@loadable/component';
import classNames from 'classnames';

import ThemeSwitcher from 'Components/ThemeSwitcher';
import PrivateRoute from './PrivateRoute';
import ErrorBoundary from 'Components/ErrorBoundary';
import Oauth from 'Pages/Oauth';

import {isUserStatusFailedSelector} from 'Store/selectors';

import {IRootState} from 'Interface/IRootState';

import Routes from 'Constants/Routes';

import './App.pcss';

const Login = loadable(() => import('Pages/Login'));
const Registration = loadable(() => import('Pages/Registration'));
const Game = loadable(() => import('Pages/Game'));
const Home = loadable(() => import('Pages/Home'));
const Forum = loadable(() => import('Pages/Forum'));
const Profile = loadable(() => import('Pages/Profile'));
const Rules = loadable(() => import('Pages/Rules'));
const Leaderboard = loadable(() => import('Pages/Leaderboard'));
const ForumTheme = loadable(() => import('Pages/ForumTheme'));
const Error = loadable(() => import('Pages/Error'));

function App() {
  const [darkThemeState, setDarkThemeState] =
    useState<'on' | 'off'>('off');

  const isUserStatusFailed = useSelector<IRootState>(isUserStatusFailedSelector)

  useEffect(() => {
    const savedDarkThemeState =
      localStorage.getItem('darkThemeState') as 'on' | 'off' | null;

    setDarkThemeState(savedDarkThemeState ?? 'off');
  }, []);

  const handleThemeSwitch = (state: 'on' | 'off') => {
    setDarkThemeState(state);
    localStorage.setItem('darkThemeState', state);
  }

  return <ErrorBoundary>
    <div className={
      classNames(
          'app',
          {'app--dark-theme': darkThemeState === 'on'}
      )}
    >
      <ThemeSwitcher
        className='app__theme-switcher'
        state={darkThemeState}
        onChange={handleThemeSwitch}
      />
      <Switch>
        <Route exact path={Routes.LOGIN} component={Login}/>
        <Route exact path={Routes.REGISTRATION} component={Registration}/>
        <Route exact path={Routes.OAUTH} component={Oauth}/>
        <PrivateRoute
          exact
          path={Routes.GAME}
          component={Game}
          loggedIn={!isUserStatusFailed}
        />
        <PrivateRoute
          exact
          path={Routes.FORUM}
          component={Forum}
          loggedIn={!isUserStatusFailed}
        />
        <Route exact path={Routes.RULES} component={Rules}/>
        <PrivateRoute
          exact
          path={Routes.LEADERBOARD}
          component={Leaderboard}
          loggedIn={!isUserStatusFailed}
        />
        <PrivateRoute
          exact
          path={Routes.PROFILE}
          component={Profile}
          loggedIn={!isUserStatusFailed}
        />
        <PrivateRoute
          exact
          path={Routes.HOME}
          component={Home}
          loggedIn={!isUserStatusFailed}
        />
        <PrivateRoute
          exact
          path={Routes.FORUM_THEME}
          component={ForumTheme}
          loggedIn={!isUserStatusFailed}
        />
        <Route component={Error}/>
      </Switch>
    </div>
  </ErrorBoundary>
}

export default App;
