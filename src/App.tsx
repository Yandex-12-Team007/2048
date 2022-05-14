import React, {lazy, Suspense, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

import {leaderboardController} from 'Controllers/leaderboardController';

import PrivateRoute from './PrivateRoute';
import ErrorBoundary from 'Components/ErrorBoundary';
import Loading from 'Components/Loading';

import Routes from 'Constants/Routes';

import './App.pcss';

import {getUser} from './store/actionCreators/user';
import {IRootState} from 'Interface/IRootState';
import {
  isUserStatusFailedSelector, leaderboardSelector,
  userSelector,
} from './store/selectors';

const DELAY_TIME = 300;

const Login = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Login')), DELAY_TIME);
  });
});
const Registration = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Registration')), DELAY_TIME);
  });
});
const Game = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Game')), DELAY_TIME);
  });
});
const Home = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Home')), DELAY_TIME);
  });
});
const Forum = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Forum')), DELAY_TIME);
  });
});
const Profile = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Profile')), DELAY_TIME);
  });
});
const Rules = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Rules')), DELAY_TIME);
  });
});
const Leaderboard = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Leaderboard')), DELAY_TIME);
  });
});
const Error = lazy(() => {
  return new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('Pages/Error')), DELAY_TIME);
  });
});

function App() {
  const isUserStatusFailed = useSelector<IRootState>(isUserStatusFailedSelector)
  const user = useSelector(userSelector);
  const leaderboard = useSelector(leaderboardSelector);

  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    leaderboardController.getRecords(dispatch)
  }, []);

  useEffect(() => {
    console.log('user effect');
    if (user && leaderboard.score === 0 && !isUserStatusFailed) {
      leaderboardController.getScoreFromUser(dispatch, user);
    }
  }, [user, isUserStatusFailed])

  return <ErrorBoundary>
    <div className={'app'}>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
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
        </Suspense>
      </BrowserRouter>
    </div>
  </ErrorBoundary>
}

export default App;
