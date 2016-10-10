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

class MainContainer extends Component{
  constructor(props){
    super(props);

    this.state ={
      selectedRow: null,
      selectedObject: {},
      optBarOpt: false,
      addEditOpt: false,
      currentObject: [],
      objects:[],
      categories: []
      };

      this.fetchData = this.fetchData.bind(this);
      this.renderData = this.renderData.bind(this);
      this.clean = this.clean.bind(this);
      this.activeAddEditForm = this.activeAddEditForm.bind(this);
      this.delete = this.delete.bind(this);
      this.addEdit = this.addEdit.bind(this);
      this.onClickDataGrid = this.onClickDataGrid.bind(this);
      this.fetchCategory = this.fetchCategory.bind(this);
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillMount(){
    this.fetchData();
    this.fetchCategory();
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
      { name: 'name', title: 'Material'},
      { name: 'description', title: 'Descripcion'},
      { name: 'category', title: 'Categoria'},
      { name: 'quantity', title: 'Cantidad'},
      { name: 'measure', title: 'Medida'},
      { name: 'holdQty', title: 'En espera...'}
    ]
  }

  renderData(){
    return this.state.objects.map((object, index)=>{
      return {
        index: index + 1,
        _id: object._id,
        name: object.name,
        description: object.description,
        category: object.category,
        quantity: object.quantity,
        measure: object.measure,
        holdQty: object.holdQty
      };
    });
  }

  fetchData(){
    axios.get(`${SERVER_URL}v1/material/`)
    .then((response)=>{
      this.setState({objects: response.data});
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
    });
  }

  fetchCategory(){
    axios.get(`${SERVER_URL}v1/catalog/`)
    .then((response)=>{
      this.setState({categories: response.data});
    })
    .catch((error)=>{
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
    axios.delete(`${SERVER_URL}v1/material/${obj._id}`)
    .then((response)=>{
      this._addNotification(`${obj.name} eliminado!`, 'success', 'Exitoso!');
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
      axios.post(`${SERVER_URL}v1/material/`, object)
      .then((response)=>{
        this._addNotification(`${object.name} creado!`, 'success', 'Exitoso!');
        this.clean();
      })
      .catch((error)=>{
        this._addNotification('Error interno.', 'error', 'Error!');
        this.clean();
        console.log('Error interno => ',error);
      });
    }else{
      axios.put(`${SERVER_URL}v1/material/${id}`, object)
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

  onClickDataGrid(newId, data){
    this.setState({selectedObject: data},()=>{
      this.setState({optBarOpt: true});
    });
  }

  handleChange(event) {
    var value = event.target.value;
    console.log(value, " was selected");
    this.setState({value: event.target.value});
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
          {this.state.addEditOpt ? <AddEditForm object={this.state.selectedObject}
          clean={this.clean} addEdit={this.addEdit} categories={this.state.categories}/> : null}

          <div className="container z-depth-1">
            <div className="container containerLimits">
              <h3 className="center-align">Mantenimiento Materiales</h3>
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
