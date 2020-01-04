import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

import PrivateRoute from './private';
import Guest from './guest';

import { GitHubIcon } from '../styles/buttons'
import App from '../pages/App';
import SignIn from '../pages/SignIn';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Guest exact path="/" component={SignIn} />
      <PrivateRoute path="/app" component={App} />
    </Switch>
    <GitHubIcon href="https://github.com/CaioQuirinoMedeiros/delivery_web" target="_blank" />
  </BrowserRouter>
);

export default Routes;
