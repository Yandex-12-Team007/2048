import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import ErrorBoundary from 'Components/ErrorBoundary';

import Routes from 'Constants/Routes';

import Loading from './components/Loading';

const Login = lazy(() => import('Pages/Login'));
const Game = lazy(() => import('Pages/Game/Game'));
const Forum = lazy(() => import('Pages/Forum'));
const Profile = lazy(() => import('Pages/Profile'));
const Rules = lazy(() => import('Pages/Rules'));
const Leaderboard = lazy(() => import('Pages/Leaderboard'));

const Error = lazy(() => import('Pages/Error'));

import './App.pcss';

function App() {
  return <ErrorBoundary>
    <div className={'app'}>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path={Routes.HOME} component={Game}/>
            <Route exact path={Routes.LOGIN} component={Login}/>
            <Route exact path={Routes.GAME} component={Game}/>
            <Route exact path={Routes.FORUM} component={Forum}/>
            <Route exact path={Routes.RULES} component={Rules}/>
            <Route exact path={Routes.LEADERBOARD} component={Leaderboard}/>
            <PrivateRoute exact path={Routes.PROFILE} component={Profile}/>
            <Route component={Error}/>
          </Switch>
        </Suspense>
      </Router>
    </div>
  </ErrorBoundary>
}

export default App;
