import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DataGrid from 'react-datagrid';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
require('react-datagrid/index.css');

import ControlBar from './projectControlBar.component';
import AddEditForm from './projectAddEditForm.component';
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
    this.renderData = this.renderData.bind(this);
    this.clean = this.clean.bind(this);
    this.activeAddEditForm = this.activeAddEditForm.bind(this);
    this.delete = this.delete.bind(this);
    this.addEdit = this.addEdit.bind(this);
    this.onClickDataGrid = this.onClickDataGrid.bind(this);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount(){
    this.fetchData();
  }

  _addNotification(message, level, title) {
    this._notificationSystem.addNotification({
      message: message,
      level: level,
      title: title
    });
  }

  clean(){
    this.fetchData();
    this.setState({selectedObject: {}},()=>{
      this.setState({optBarOpt: false});
      this.setState({addEditOpt: false});
    });
  }

  fetchData(){
    axios.get(`${SERVER_URL}v1/project/`)
    .then((response)=>{
      this.setState({objects: response.data});
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
    });
  }

  renderData(){
    return this.state.objects.map((object, index)=>{
      return {
        index: index + 1,
        _id: object._id,
        project: object.project,
        description: object.description,
        createdDt: object.createdDt,
        createdBy: object.createdBy,
        status: object.status
      };
    });
  }

  renderColumns(){
    return [
      { name: 'index', title: '#', width: 50},
      { name: 'project', title: 'Proyecto'},
      { name: 'description', title: 'Descripción'},
      { name: 'createdDt', title: 'Creado'},
      { name: 'createdBy', title: 'Autor'},
      { name: 'status', title: 'Status'}
    ]
  }

  activeAddEditForm(event, object){
    if(object._id){
      this.setState({selectedObject: object},()=>{
        this.setState({addEditOpt: true});
      });
    }else{
      this.setState({addEditOpt: true});
    }
  }

  delete(obj){
    axios.delete(`${SERVER_URL}v1/project/${obj._id}`)
    .then((response)=>{
      this._addNotification(`${obj.project} eliminado!`, 'success', 'Exitoso!');
      this.clean();
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      this.clean();
      console.log('Error interno => ',error);
    });
  }

  addEdit(id, object){
    axios.put(`${SERVER_URL}v1/project/${id}`, object)
    .then((response)=>{
      this._addNotification(`Proyecto actualizado!`, 'success', 'Exitoso!');
      this.clean();
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      this.clean();
      console.log('Error interno => ',error);
    });
  }

  onClickDataGrid(newId, data){
    this.setState({selectedObject: data},()=>{
      this.setState({optBarOpt: true});
    });
  }

  render(){
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />
          {this.state.addEditOpt ? <AddEditForm object={this.state.selectedObject}
          clean={this.clean} addEdit={this.addEdit}/> : null}

          <div className="container z-depth-1">
            <div className="container containerLimits">
              <h3 className="center-align">Mantenimiento Proyectos</h3>
              <div className="divider"></div>
            </div>
            <div style={{padding: "2%"}}>
              {this.state.optBarOpt ? <ControlBar object={this.state.selectedObject}
             delete={this.delete} clean={this.clean} edit={this.activeAddEditForm}/> : null}

              <DataGrid idProperty="index" dataSource={this.renderData()} columns={this.renderColumns()} pagination={true}
                selected={null} onSelectionChange={this.onClickDataGrid} />
            </div>
          </div>

      </div>
    )
  }


}

export default connect(null, null)(MainContainer);
