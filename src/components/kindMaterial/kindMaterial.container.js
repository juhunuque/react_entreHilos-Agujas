import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DataGrid from 'react-datagrid';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
require('react-datagrid/index.css');

import ControlBar from './controlBar.component';
import AddEditForm from './addEditForm.component';
import {SERVER_URL} from './../../actions/user';

class KindMaterialContainer extends Component{
  constructor(props){
    super(props);

    this.state ={
      selectedRow: null,
      selectedType: {},
      optBarOpt: false,
      addEditOpt: false,
      currentType: [],
      types:[]
      };

    this.activeAddEditForm = this.activeAddEditForm.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.onClickDataGrid = this.onClickDataGrid.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.addEdit = this.addEdit.bind(this);
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
    this.setState({selectedType: {}},()=>{
      this.setState({optBarOpt: false});
      this.setState({addEditOpt: false});
    });
  }

  onClickDataGrid(newId, data){
    this.setState({selectedType: data},()=>{
      this.setState({optBarOpt: true});
    });
  }

  activeAddEditForm(event, object){
    if(object._id){
      this.setState({selectedType: object},()=>{
        this.setState({addEditOpt: true});
      });
    }else{
      this.setState({addEditOpt: true});
    }
  }

  fetchData(){
    axios.get(`${SERVER_URL}v1/catalog/`)
    .then((response)=>{
      this.setState({types: response.data});
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
    });
  }

  delete(obj){
    axios.delete(`${SERVER_URL}v1/catalog/${obj._id}`)
    .then((response)=>{
      this._addNotification(`${obj.type} eliminado!`, 'success', 'Exitoso!');
      this.clean();
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      this.clean();
      console.log('Error interno => ',error);
    });
  }

  addEdit(id, object){
    if(!id){
      axios.post(`${SERVER_URL}v1/catalog/`, object)
      .then((response)=>{
        this._addNotification(`${object.type} creado!`, 'success', 'Exitoso!');
        this.clean();
      })
      .catch((error)=>{
        this._addNotification('Error interno.', 'error', 'Error!');
        this.clean();
        console.log('Error interno => ',error);
      });
    }else{
      axios.put(`${SERVER_URL}v1/catalog/${id}`, object)
      .then((response)=>{
        this._addNotification(`Tipo actualizado!`, 'success', 'Exitoso!');
        this.clean();
      })
      .catch((error)=>{
        this._addNotification('Error interno.', 'error', 'Error!');
        this.clean();
        console.log('Error interno => ',error);
      });
    }
  }

  renderColumns(){
    return [
      { name: 'index', title: '#', width: 50},
      { name: 'type', title: 'Tipo'},
      { name: 'description', title: 'Descripción'}
    ]
  }

  renderData(){
    return this.state.types.map((object, index)=>{
      return {
        index: index + 1,
        _id: object._id,
        type: object.type,
        description: object.description
      };
    });
  }


  render(){
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />
        <div className="fixed-action-btn" style={{bottom:'55px',right:'24px'}}>
          <a className="btn-floating btn-large blue darken-2" onClick={this.activeAddEditForm}>
            <i className="large material-icons">add</i>
          </a>
        </div>
        {this.state.addEditOpt ? <AddEditForm object={this.state.selectedType}
        clean={this.clean} addEdit={this.addEdit}/> : null}

        <div className="container z-depth-1">
          <div className="container containerLimits">
            <h3 className="center-align">Mantenimiento Tipo materiales</h3>
            <div className="divider"></div>
          </div>
          <div style={{padding: "2%"}}>
            {this.state.optBarOpt ? <ControlBar object={this.state.selectedType}
           delete={this.delete} clean={this.clean} edit={this.activeAddEditForm}/> : null}

            <DataGrid idProperty="index" dataSource={this.renderData()} columns={this.renderColumns()} pagination={true}
              selected={null} onSelectionChange={this.onClickDataGrid} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(KindMaterialContainer);
