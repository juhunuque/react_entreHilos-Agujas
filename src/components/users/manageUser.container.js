import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DataGrid from 'react-datagrid';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
require('react-datagrid/index.css');

import {fetchUsers} from './../../actions/user';
import UserForm from './userForm.component';
import UserControlBar from './userControlBar.component';
import {SERVER_URL} from './../../actions/user';


class UsersContainer extends Component{
  _notificationSystem: null;
  constructor(props){
    super(props);

    this.state ={
      selectedRow: null,
      selectedUser: {},
      optBarOpt: false,
      addEditOpt: false,
      currentUsers: []
      };

    this.onClickDataGrid =this.onClickDataGrid.bind(this);
    this.cleanUser =this.cleanUser.bind(this);
    this.deleteUser =this.deleteUser.bind(this);
    this.addEditUser =this.addEditUser.bind(this);
    this._addNotification = this._addNotification.bind(this);
    this.activeAddEditForm = this.activeAddEditForm.bind(this);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount(){
    this.props.fetchUsers();
  }

  _addNotification(message, level, title) {
    this._notificationSystem.addNotification({
      message: message,
      level: level,
      title: title
    });
  }

  onClickDataGrid(newId, data){
    this.setState({selectedUser: data},()=>{
      this.setState({optBarOpt: true});
    });
  }

  activeAddEditForm(event, user){
    if(user._id){
      this.setState({selectedUser: user},()=>{
        this.setState({addEditOpt: true});
      });
    }else{
      this.setState({addEditOpt: true});
    }
  }

  addEditUser(id, user){
    if(!id){
      axios.post(`${SERVER_URL}v1/user/`, user)
      .then((response)=>{
        this._addNotification(`${user.username} creado!`, 'success', 'Exitoso!');
        this.cleanUser();
      })
      .catch((error)=>{
        this._addNotification('Error interno.', 'error', 'Error!');
        this.cleanUser();
        console.log('Error interno => ',error);
      });
    }else{
      axios.put(`${SERVER_URL}v1/user/${id}`, user)
      .then((response)=>{
        this._addNotification(`Usuario actualizado!`, 'success', 'Exitoso!');
        this.cleanUser();
      })
      .catch((error)=>{
        this._addNotification('Error interno.', 'error', 'Error!');
        this.cleanUser();
        console.log('Error interno => ',error);
      });
    }
  }

  deleteUser(user){
    axios.delete(`${SERVER_URL}v1/user/${user._id}`)
    .then((response)=>{
      this._addNotification(`${user.username} eliminado!`, 'success', 'Exitoso!');
      this.cleanUser();
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      this.cleanUser();
      console.log('Error interno => ',error);
    });
  }

  cleanUser(){
    this.props.fetchUsers();
    this.setState({selectedUser: {}},()=>{
      this.setState({optBarOpt: false});
      this.setState({addEditOpt: false});
    });
  }

  renderData(){
    return this.props.users.all.map((user, index)=>{
      return {
        index: index + 1,
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        activo: user.active ? 'Activo' : 'No Activo',
        active: user.active,
        createdDt: user.createdDt
      };
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

  render(){
    const currentUsers = this.renderData();
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />
        <div className="fixed-action-btn" style={{bottom:'55px',right:'24px'}}>
          <a className="btn-floating btn-large blue darken-2" onClick={this.activeAddEditForm}>
            <i className="large material-icons">add</i>
          </a>
        </div>
        {this.state.addEditOpt ? <UserForm user={this.state.selectedUser}
        clean={this.cleanUser} addEdit={this.addEditUser}/> : null}

        <div className="container z-depth-1">
          <div className="container containerLimits">
            <h3 className="center-align">Mantenimiento Usuarios</h3>
            <div className="divider"></div>
          </div>
          <div style={{padding: "2%"}}>
            {this.state.optBarOpt ? <UserControlBar user={this.state.selectedUser}
           delete={this.deleteUser} clean={this.cleanUser} edit={this.activeAddEditForm}/> : null}

            <DataGrid idProperty="index" dataSource={currentUsers} columns={this.renderColumns()} pagination={true}
              selected={null} onSelectionChange={this.onClickDataGrid} />
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({fetchUsers}, dispatch);
}

function mapStateToProps({users}){
  return{users};
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
