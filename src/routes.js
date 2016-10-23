import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './components/app';
import Home from './components/extras/home.component';
import ManageUsers from './components/users/manageUser.container';
import KindMaterialContainer from './components/kindMaterial/kindMaterial.container';
import ChangePassword from './components/changePassword/main.container';
import MaterialContainer from './components/material/main.container';
import Version from './components/extras/version.component';
import BackupDb from './components/extras/backupdb.component';
import ProjectManagement from './components/project/projectManagement.container';
import CreateProject from './components/createProject/main.container';
import ControlProject from './components/controlProject/main.container';
import Roles from './components/userRoles/main.container';


export default(
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="manageUsers" component={ManageUsers} />
    <Route path="manageKindMaterial" component={KindMaterialContainer} />
    <Route path="changePassword" component={ChangePassword} />
    <Route path="manageMaterial" component={MaterialContainer} />
    <Route path="version" component={Version} />
    <Route path="settingProjects" component={ProjectManagement} />
    <Route path="createProject" component={CreateProject} />
    <Route path="statusProject" component={ControlProject} />
    <Route path="backUpDb" component={BackupDb} />
    <Route path="manageRoles" component={Roles} />
  </Route>
);
