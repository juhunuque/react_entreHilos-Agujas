import React, {Component, PropTypes} from 'react';
import axios from 'axios';
import NotificationSystem from 'react-notification-system';
import FileInput from 'react-file-input';

require('react-datagrid/index.css');

import {SERVER_URL} from './../../actions/user';

export default class VersionMain extends Component{
  constructor(props){
    super(props);
    this.state ={
      file: '',
      dataFile:''
    }
    this.backup = this.backup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.restore = this.restore.bind(this);
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

  handleChange(e){
    this.setState({file: e.target.files[0]});
    var data = new FormData();
    // data.append('foo', 'bar');
    data.append('file', e.target.files[0]);
    this.setState({dataFile: data});
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

  restore(){
    var options = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    var data = new FormData();
    data.append('file', this.state.file);
    axios.post(`${SERVER_URL}v1/security/restore/db`,this.state.dataFile,options)
    .then((response)=>{
      // document.location.assign(`${SERVER_URL}v1/security/backup`);
      this._addNotification('Restore Exitoso!', 'success', 'Exitoso!');
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      console.log('Error interno => ',error);
      this.setState({file:''});
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
            <div className="row">
              <div className={this.state.file == '' ? 'col s12 m12 l12 center-align' : 'col s6 m6 l6 center-align'}>
                <form encType="multipart/form-data">
                  <FileInput name="restoreFile"
                             placeholder="Restore file"
                             className="waves-effect waves-light btn-large blue darken-2"
                             onChange={this.handleChange} />
                </form>
              </div>

              {this.state.file != '' &&
                  <div className="col s6 m6 l6 center-align">
                    <a className="waves-effect waves-light btn-large blue darken-2" onClick={this.restore}>
                      <i className="material-icons right">cloud</i>Restore
                    </a>
                  </div>
              }

              <div style={{padding: "2%"}} className="center-align">

              </div>
            </div>
            <div className="row">
              <div style={{padding: "2%"}} className="center-align">
                <a className="waves-effect waves-light btn-large blue darken-2" onClick={this.backup}>
                  <i className="material-icons right">cloud</i>Backup
                </a>
              </div>
            </div>

          </div>
      </div>
    )
  }
}
