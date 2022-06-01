import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import loadable from '@loadable/component';

import PrivateRoute from './PrivateRoute';
import ErrorBoundary from 'Components/ErrorBoundary';
// import Loading from 'Components/Loading';

import Routes from 'Constants/Routes';

import './App.pcss';

import {getUser} from './store/actionCreators/user';
import {getLeaderboard} from './store/actionCreators/leaderboard';
import {IRootState} from 'Interface/IRootState';
import {isUserStatusFailedSelector} from './store/selectors';
// import ForumTheme from 'Pages/ForumTheme';

const Login = loadable(() => import('Pages/Login'));
const Registration = loadable(() => import('Pages/Registration'));
const Game = loadable(() => import('Pages/Game'));
const Home = loadable(() => import('Pages/Home'));
const Forum = loadable(() => import('Pages/Forum'));
const Profile = loadable(() => import('Pages/Profile'));
const Rules = loadable(() => import('Pages/Rules'));
const Leaderboard = loadable(() => import('Pages/Leaderboard'));
const Error = loadable(() => import('Pages/Error'));

function App() {
  const isUserStatusFailed = useSelector<IRootState>(isUserStatusFailedSelector)

  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getLeaderboard());
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
        <Route component={Error}/>
      </Switch>
    </div>
  </ErrorBoundary>
}

export default App;
