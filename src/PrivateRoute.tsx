import React, { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';

import Routes from './constants/Routes';
import { UserContext } from './hooks/userContext';

function PrivateRoute({component: Component, ...rest}) {
  const { user } = useContext(UserContext);

  return <Route
    {...rest}
    render={(props) => user ?
            <Component {...props} /> :
            <Redirect to={Routes.REGISTRATION}/>
    }
  />
}

export default PrivateRoute;
