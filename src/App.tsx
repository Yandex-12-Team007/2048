import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Routes from 'Constants/Routes';

import Loading from './components/Loading';

const Login = lazy(() => import('Pages/Login'));
const Game = lazy(() => import('Pages/Game'));
const Forum = lazy(() => import('Pages/Forum'));
const Profile = lazy(() => import('Pages/Profile'));
const Rule = lazy(() => import('Pages/Rule'));
const Leaderboard = lazy(() => import('Pages/Leaderboard'));

const Error = lazy(() => import('Pages/Error'));

import './App.pcss';

function App() {
  return <div className={'app'}>
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={Routes.HOME} component={Game}/>
          <Route exact path={Routes.LOGIN} component={Login}/>
          <Route exact path={Routes.GAME} component={Game}/>
          <Route exact path={Routes.FORUM} component={Forum}/>
          <Route exact path={Routes.RULE} component={Rule}/>
          <Route exact path={Routes.LEADERBOARD} component={Leaderboard}/>
          <PrivateRoute exact path={Routes.PROFILE} component={Profile}/>
          <Route component={Error}/>
        </Switch>
      </Suspense>
    </Router>
  </div>
}

export default App;
