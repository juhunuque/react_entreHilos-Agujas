import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './components/app';
import ManageUsers from './components/users/manageUser.container';

export default(
  <Route path="/" component={App} >
    <IndexRoute component={App} />
    <Route path="manageUsers" component={ManageUsers} />
  </Route>
);
