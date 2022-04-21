import React from 'react';
import {Route, Redirect, RouteComponentProps} from 'react-router-dom';

import Routes from './constants/Routes';

interface IPrivateRouteProps {
  loggedIn: boolean;
}

function PrivateRoute(
    {
      component: Component,
      loggedIn,
      ...props
    }: RouteComponentProps<IPrivateRouteProps>
) {
  return (
    <Route {...props}>
      {loggedIn ? <Component {...props} /> : <Redirect to={Routes.LOGIN} />}
    </Route>
  )
}

export default PrivateRoute;
