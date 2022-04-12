import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './hooks/userContext';

import PrivateRoute from './PrivateRoute';

import Routes from 'Constants/Routes';

// import Loading from './components/Loading';

const Login = lazy(() => import('Pages/Login'));
const Game = lazy(() => import('Pages/game/Game'));
const Forum = lazy(() => import('Pages/Forum'));
const Profile = lazy(() => import('Pages/Profile'));
// const Rules = lazy(() => import('Pages/Rules'));
const Error = lazy(() => import('Pages/Error'));
const Leaderboard = lazy(() => import('Pages/Leaderboard'));
const Registration = lazy(() => import('Pages/Registration'));

import './App.pcss';
import useFindUser from './hooks/useFindUser';

function App() {

  const { user, setUser } = useFindUser();

  return <div className={'app'}>
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Switch>
            <Route exact path={Routes.LOGIN} component={Login} />
            <Route exact path={Routes.REGISTRATION} component={Registration} />
            <Route exact path={Routes.HOME} component={Registration} />
            <PrivateRoute exact path={Routes.GAME} component={Game} />
            <PrivateRoute exact path={Routes.FORUM} component={Forum} />
            <PrivateRoute exact path={Routes.LEADERBOARD} component={Leaderboard} />
            <PrivateRoute exact path={Routes.PROFILE} component={Profile} />
            <Route component={Error} />
          </Switch>
        </Suspense>
      </UserContext.Provider>
    </Router>
  </div>
}

export default App;
