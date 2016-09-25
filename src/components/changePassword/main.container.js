import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DataGrid from 'react-datagrid';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
require('react-datagrid/index.css');

import ControlBar from './controlBar.component';
import {SERVER_URL} from './../../actions/user';

class MainContainer extends Component{
  constructor(props){
    super(props);

    this.state ={
      selectedRow: null,
      selectedObject: {},
      optBarOpt: false,
      addEditOpt: false,
      currentObject: [],
      objects:[]
      };

      this.fetchData = this.fetchData.bind(this);
      this.renderColumns = this.renderColumns.bind(this);
      this.renderData = this.renderData.bind(this);
      this.onClickDataGrid = this.onClickDataGrid.bind(this);
      this.resetPwd = this.resetPwd.bind(this);
      this.clean = this.clean.bind(this);
  }

  componentWillMount(){
    this.fetchData();
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

  renderColumns(){
    return [
      { name: 'index', title: '#', width: 50},
      { name: 'name', title: 'Nombre'},
      { name: 'lastname', title: 'Apellido'},
      { name: 'username', title: 'Usuario'},
      { name: 'activo', title: 'Activo'}
    ]
  }

  renderData(){
    return this.state.objects.map((object, index)=>{
      return {
        index: index + 1,
        _id: object._id,
        name: object.name,
        lastname: object.lastname,
        username: object.username,
        activo: object.active ? 'Activo' : 'No Activo',
        active: object.active,
        createdDt: object.createdDt
      };
    });
  }

  fetchData(){
    axios.get(`${SERVER_URL}v1/user/`)
    .then((response)=>{
      this.setState({objects: response.data});
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
    });
  }

  onClickDataGrid(newId, data){
    this.setState({selectedObject: data},()=>{
      this.setState({optBarOpt: true});
    });
  }

  resetPwd(obj){
    axios.get(`${SERVER_URL}v1/security/${obj._id}`)
    .then((response)=>{
      this._addNotification(`${obj.username}: Password reiniciado!`, 'success', 'Exitoso!');
      this.clean();
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      this.clean();
      console.log('Error interno => ',error);
    });
  }

  clean(){
    this.fetchData();
    this.setState({selectedObject: {}},()=>{
      this.setState({optBarOpt: false});
      this.setState({addEditOpt: false});
    });
  }

  render(){
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />

          <div className="container z-depth-1">
            <div className="container containerLimits">
              <h3 className="center-align">Cambiar contraseña</h3>
              <div className="divider"></div>
            </div>
            <div style={{padding: "2%"}}>
              {this.state.optBarOpt ? <ControlBar object={this.state.selectedObject}
             reset={this.resetPwd} clean={this.clean}/> : null}

              <DataGrid idProperty="index" dataSource={this.renderData()} columns={this.renderColumns()} pagination={true}
                selected={null} onSelectionChange={this.onClickDataGrid} />
            </div>
          </div>
      </div>
    )
  }
}

export default connect(null, null)(MainContainer);
