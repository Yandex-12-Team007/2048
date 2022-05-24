import React, {ComponentType, lazy, Suspense, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import queryString from 'query-string';

import {authController} from 'Controllers/authController';

import PrivateRoute from './PrivateRoute';
import ErrorBoundary from 'Components/ErrorBoundary';
import Loading from 'Components/Loading';

import Routes from 'Constants/Routes';
import Error from 'Pages/Error';

import './App.pcss';

import {getUser} from './store/actionCreators/user';
import {IRootState} from 'Interface/IRootState';
import {isUserStatusFailedSelector} from './store/selectors';

const DELAY_TIME = 300;
export const lazyLoading = <T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  minLoadTimeMs = DELAY_TIME
) => {
  return lazy(() =>
    Promise.all([
      factory(),
      new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))])
        .then(([moduleExports]) => moduleExports)
  );
}

const Login = lazyLoading(() => import('Pages/Login'));
const Registration = lazyLoading(() => import('Pages/Registration'));
const Game = lazyLoading(() => import('Pages/Game'));
const Home = lazyLoading(() => import('Pages/Home'));
const Forum = lazyLoading(() => import('Pages/Forum'));
const Profile = lazyLoading(() => import('Pages/Profile'));
const Rules = lazyLoading(() => import('Pages/Rules'));
const Leaderboard = lazyLoading(() => import('Pages/Leaderboard'));

function App() {
  const isUserStatusFailed = useSelector<IRootState>(isUserStatusFailedSelector)
  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();

  const parse = queryString.parse(window.location.search);
  if (parse.code) {
    // @ts-ignore
    authController.loginWithCode(parse.code);
    dispatch(getUser());
  }

  useEffect(() => {
    dispatch(getUser());
  }, []);

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
