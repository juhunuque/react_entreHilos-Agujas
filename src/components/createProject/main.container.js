import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
require('react-datagrid/index.css');

import MaterialForm from './material.component';
import {SERVER_URL} from './../../actions/user';

class MainContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      projectName: '',
      description: '',
      quantity:'',
      objects: [],
      materials: [],
      isMaterialsActive: false
    };
    this.closeMaterialForm = this.closeMaterialForm.bind(this);
    this.addMaterial = this.addMaterial.bind(this);
    this.removeMaterial = this.removeMaterial.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.displayError = this.displayError.bind(this);
    this.cancel = this.cancel.bind(this);
    this.save = this.save.bind(this);
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

  closeMaterialForm(){
    this.setState({isMaterialsActive: false});
  }

  displayError(message){
    this._addNotification(message, 'error', 'Error!');
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

  addMaterial(material){
    let materials = this.state.materials;
    materials.push(material);
    this.setState({materials: materials});

  }

  removeMaterial(index){
    let materials = this.state.materials;
    if(index != -1) {
    	materials.splice(index, 1);
    }
    this.setState({materials: materials});
  }

  cancel(){
    this.setState({
      projectName: '',
      description: '',
      quantity:'',
      materials: [],
      isMaterialsActive: false
    });
  }

  save(){
    const object ={
      project:this.state.projectName,
      description: this.state.description,
      // material: JSON.stringify(this.state.materials),
      material: this.state.materials,
      createdBy:'JULIOCHANGE',
      quantity:this.state.quantity
    };
    axios.post(`${SERVER_URL}v1/project/`, object)
    .then((response)=>{
      this._addNotification(`${object.project} creado!`, 'success', 'Exitoso!');
      this.cancel();
    })
    .catch((error)=>{
      this._addNotification('Error interno.', 'error', 'Error!');
      this.cancel();
      console.log('Error interno => ',error);
    });
  }

  render(){
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />

          <div className="container">
            <div className="row">
              <div className={this.state.isMaterialsActive ? 'col s4 m4 l4 z-depth-1' :
              'offset-l4 offset-m2 col s4 m4 l4 z-depth-1'}>
                <div className="container containerLimits">
                  <h5 className="center-align">Nuevo Proyecto</h5>
                  <div className="divider"></div>
                </div>

                <div className="row">
                  <div className="input-field col s6 m6 l6">
                      <input id="projectName" type="text" className="validate" value={this.state.projectName}
                        onChange={(event)=>this.setState({projectName: event.target.value})} required/>
                      <label className={this.state.projectName ? 'active':''} htmlFor="projectName">Proyecto</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s6 m6 l6">
                      <textarea id="description" className="materialize-textarea validate"
                         value={this.state.description}
                        onChange={(event)=>this.setState({description: event.target.value})} required></textarea>
                      <label className={this.state.description ? 'active':''} htmlFor="description">Descripcion</label>
                  </div>
                </div>


                <div className="row">
                  <div className="input-field col s6 m6 l6">
                      <input id="quantity" type="number" className="validate" value={this.state.quantity}
                        onChange={(event)=>this.setState({quantity: event.target.value})} required/>
                      <label className={this.state.quantity ? 'active':''} htmlFor="quantity">Cantidad</label>
                  </div>
                </div>

                <div className="row">
                  <span style={{marginLeft:'2%',marginRight:'4%'}}>Materiales </span>
                  <a className={this.state.isMaterialsActive ? 'btn-floating waves-effect waves-light red darken-2':'btn-floating waves-effect waves-light blue darken-2'}
                    onClick={()=>this.setState({isMaterialsActive: this.state.isMaterialsActive ? false : true})}>
                    <i className="material-icons">{this.state.isMaterialsActive ? 'clear' : 'add'}</i>
                  </a>
                </div>

                <div className="divider"></div>
                <div className="row center-align">
                  <a style={{marginLeft:'2%', marginTop: '2%'}} className="waves-effect waves-light btn blue darken-2"
                    onClick={this.save} >Guardar</a>
                  <a style={{marginLeft:'2%', marginTop: '2%'}} className="waves-effect waves-light btn red darken-2"
                    onClick={this.cancel} >Cancelar</a>
                </div>
              </div>
              {this.state.isMaterialsActive ? <MaterialForm close={this.closeMaterialForm} objects={this.state.objects}
              add={this.addMaterial} remove={this.removeMaterial} error={this.displayError} selected={this.state.materials} /> : null}
            </div>
          </div>
      </div>
    )
  }
}

export default connect(null, null)(MainContainer);
