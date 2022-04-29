import React, {Suspense, lazy, useEffect} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

import PrivateRoute from './PrivateRoute';
import ErrorBoundary from 'Components/ErrorBoundary';
import Loading from './components/Loading';

import Routes from 'Constants/Routes';

import './App.pcss';

import {getUser} from './store/actionCreators/user';
import {IRootState} from 'Interface/IRootState';
import {isUserStatusFailedSelector} from './store/selectors';

const Login = lazy(() => import('Pages/Login'));
const Registration = lazy(() => import('Pages/Registration'));
const Game = lazy(() => import('Pages/Game'));
const Forum = lazy(() => import('pages/Forum/Forum'));
const Profile = lazy(() => import('Pages/Profile'));
const Rules = lazy(() => import('Pages/Rules'));
const Leaderboard = lazy(() => import('Pages/Leaderboard'));
const Error = lazy(() => import('Pages/Error'));

function App() {
  const isUserStatusFailed = useSelector<IRootState>(isUserStatusFailedSelector)

  const dispatch: ThunkDispatch<IRootState, unknown, AnyAction> = useDispatch();
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
            <Route exact path='/'>
              <Redirect to={Routes.GAME} />
            </Route>
            <Route component={Error}/>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  </ErrorBoundary>
}

export default App;
