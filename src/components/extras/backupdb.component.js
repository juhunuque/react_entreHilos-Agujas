import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
require('react-datagrid/index.css');

import {SERVER_URL} from './../../actions/user';

export default class VersionMain extends Component{
  constructor(props){
    super(props);

    this.backup = this.backup.bind(this);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _addNotification(message, level, title) {
    this._notificationSystem.addNotification({
      message: message,
      level: level,
      title: title
    });
  }

  backup(){

    axios.get(`${SERVER_URL}v1/security/backup`)
    .then((response)=>{
      document.location.assign(`${SERVER_URL}v1/security/backup`);
      this._addNotification('Backup creado!', 'success', 'Exitoso!');
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      console.log('Error interno => ',error);
    });
  }

  render(){
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />
          <div className="container z-depth-1">
            <div className="container containerLimits">
              <h3 className="center-align">Crear backup</h3>
              <div className="divider"></div>
            </div>
            <div style={{padding: "2%"}} className="center-align">
              <a className="waves-effect waves-light btn-large blue darken-2" onClick={this.backup}>
                <i className="material-icons right">cloud</i>Backup
              </a>
            </div>
          </div>
      </div>
    )
  }
}
