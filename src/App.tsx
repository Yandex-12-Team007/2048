import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import queryString from 'query-string';

import {authController} from 'Controllers/authController';

import loadable from '@loadable/component';

import PrivateRoute from './PrivateRoute';
import ErrorBoundary from 'Components/ErrorBoundary';
// import Loading from 'Components/Loading';

import Routes from 'Constants/Routes';

import './App.pcss';

import {getUser} from './store/actionCreators/user';
import {IRootState} from 'Interface/IRootState';
import {isUserStatusFailedSelector} from './store/selectors';


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
  const isUserStatusFailed = useSelector<IRootState>(isUserStatusFailedSelector)
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();

  if (typeof window !== 'undefined') {
    const parse = queryString.parse(window.location.search);
    if (parse.code) {
      // @ts-ignore
      authController.loginWithCode(parse.code)
          .then((res) => {
            if (res) {
              dispatch(getUser());
            }
          })
    }
  }

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return <ErrorBoundary>
    <div className={'app'}>
      <Switch>
        <Route exact path={Routes.LOGIN} component={Login}/>
        <Route exact path={Routes.REGISTRATION} component={Registration}/>
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
