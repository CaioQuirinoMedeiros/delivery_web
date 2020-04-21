import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import PrivateRoute from './private';
import Guest from './guest';

import App from '../pages/App';
import SignIn from '../pages/SignIn';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Guest exact path="/" component={SignIn} />
      <PrivateRoute path="/app" component={App} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
