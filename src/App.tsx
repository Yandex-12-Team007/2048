import React, {Suspense, lazy} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import PrivateRoute from './PrivateRoute';

import Routes from "./constants/Routes";

//import Loading from "./components/Loading";

const Login = lazy(() => import("./pages/Login"));
const Game = lazy(() => import("./pages/Game"));
const Profile = lazy(() => import("./pages/Profile"));
const Error = lazy(() => import("./pages/Error"));

import './App.css';

function App() {
    return <div className={'app'}>
        <div className={'test'}>
            <div className={'quest'}>lopata</div>
        </div>
        <Router>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Switch>
                    <Route exact path={Routes.LOGIN} component={Login}/>
                    <Route exact path={Routes.GAME} component={Game}/>
                    <PrivateRoute exact path={Routes.PROFILE} component={Profile}/>
                    <Route component={Error}/>
                </Switch>
            </Suspense>
        </Router>
    </div>
}

export default App;
