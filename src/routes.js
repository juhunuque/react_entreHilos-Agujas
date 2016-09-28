import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './components/app';
import ManageUsers from './components/users/manageUser.container';
import KindMaterialContainer from './components/kindMaterial/kindMaterial.container';
import ChangePassword from './components/changePassword/main.container';
import MaterialContainer from './components/material/main.container';
import Version from './components/extras/version.component';
import BackupDb from './components/extras/backupdb.component';
import ProjectManagement from './components/project/projectManagement.container';


export default(
  <Route path="/" component={App} >
    <IndexRoute component={App} />
    <Route path="manageUsers" component={ManageUsers} />
    <Route path="manageKindMaterial" component={KindMaterialContainer} />
    <Route path="changePassword" component={ChangePassword} />
    <Route path="manageMaterial" component={MaterialContainer} />
    <Route path="version" component={Version} />
    <Route path="settingProjects" component={ProjectManagement} />
    <Route path="backUpDb" component={BackupDb} />
  </Route>
);
