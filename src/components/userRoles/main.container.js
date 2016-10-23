import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DataGrid from 'react-datagrid';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
require('react-datagrid/index.css');

import {fetchUsers} from './../../actions/user';
import {SERVER_URL} from './../../actions/user';
import RolesComponent from './roles.component';

class MainContainer extends Component{
  constructor(props){
    super(props);

    this.state ={
      selectedRow: null,
      selectedUser: {},
      rolesOpt: false,
      currentUsers: []
      };

    this.onClickDataGrid =this.onClickDataGrid.bind(this);
    this.clean =this.clean.bind(this);
    this.save =this.save.bind(this);
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
      this.setState({rolesOpt: true});
    });
  }

  clean(){
    this.props.fetchUsers();
    this.setState({selectedUser: {}},()=>{
      this.setState({rolesOpt: false});
    });
  }

  save(id, user){
    axios.put(`${SERVER_URL}v1/user/${id}`, user)
    .then((response)=>{
      this._addNotification(`Roles actualizados!`, 'success', 'Exitoso!');
      this.clean();
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      this.clean();
      console.log('Error interno => ',error);
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
    return this.props.users.all.map((user, index)=>{
      return {
        index: index + 1,
        _id: user._id,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        activo: user.active ? 'Activo' : 'No Activo',
        active: user.active,
        createdDt: user.createdDt,
        roles: user.roles
      };
    });
  }

  render(){
    const currentUsers = this.renderData();
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />

        {this.state.rolesOpt ? <RolesComponent user={this.state.selectedUser}
        clean={this.clean} save={this.save}/> : null}
        <div className="container z-depth-1">
          <div className="container containerLimits">
            <h3 className="center-align">Asignacion Roles</h3>
            <div className="divider"></div>
          </div>

          <div style={{padding: "2%"}}>

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

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
