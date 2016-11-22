import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';
import axios from 'axios';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import moment from 'moment';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import {SERVER_URL} from './../../actions/user';
import Project from './project.component';

class MainContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      objects: [],
      detailsIsOpen: false,
      object:[],
      options:[
        {value:'CREADO', label:'CREADO'},
        {value:'EN PROCESO', label: 'EN PROCESO'},
        {value: 'EN PAUSA', label: 'EN PAUSA'},
        {value: 'FINALIZADO', label: 'FINALIZADO'}
      ],
      option: [],
      user: null,
      roles: new Set()
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderProjects = this.renderProjects.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.renderModal = this.renderModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.generateReport = this.generateReport.bind(this);
  }

  componentWillMount(){
    this.fetchData();
    this.setState({user: JSON.parse(sessionStorage.getItem('authUser'))},()=>{
      if(this.state.user != null){
        this.setState({roles: new Set(JSON.parse(sessionStorage.getItem('authUser')).roles)});
      }
    })
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
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

  _addNotification(message, level, title) {
    this._notificationSystem.addNotification({
      message: message,
      level: level,
      title: title
    });
  }

  handleChange(val) {
    if(val == null){
      val = [];
    }else{
      axios.put(`${SERVER_URL}v1/project/status/${this.state.object._id}`, {status: val.value})
      .then((response)=>{
        let object = this.state.object;
        object.status = val.value;
        this.setState({object:object});
        this._addNotification(`${object.project}: Estado actualizado!`, 'success', 'Exitoso!');
      })
      .catch((error)=>{
        this._addNotification('Error interno.', 'error', 'Error!');
        console.log('Error interno => ',error);
      });
    }
    this.setState({option:val});
  }

  showDetails(object){
    this.setState({object:object, option:{value:object.status, label:object.status}},()=>{
      this.setState({detailsIsOpen:true});
    });

  }

  renderProjects(){
    return this.state.objects.map((object, index)=>{
      return (
        <Project key={index} object={object} showDetails={this.showDetails}/>
      )
    })
  }

  formatDate(date){
    return moment(date).format('DD/MM/YY')
  }

  generateReport(){
    axios.get(`${SERVER_URL}v1/project/report/requirements?id=${this.state.object._id}&username=${this.state.user.username}`)
    .then((response)=>{
      document.location.assign(`${SERVER_URL}v1/project/report/requirements?id=${this.state.object._id}&username=${this.state.user.username}`);
      this._addNotification('Reporte generado', 'success', 'Exitoso!');
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
      this._addNotification('Error interno.', 'error', 'Error!');
    });
  }

  renderModal(){
    return(
      <div>
        {
          this.state.detailsIsOpen &&
          <ModalContainer onClose={()=>this.setState({detailsIsOpen:false})} >
            <ModalDialog onClose={()=>this.setState({detailsIsOpen:false})}>
              <div className="row center-align">
                <h5>{this.state.object.project}</h5>
              </div>
              <div className="row center-align">
                <div className="col m6 l6">
                  Creado el {this.formatDate(this.state.object.createdDt)}
                </div>
                <div className="col m6 l6">
                  Por {this.state.object.createdBy}
                </div>
              </div>
              <div className="row center-align">
                <a className="waves-effect waves-light btn blue darken-2" onClick={this.generateReport}>
                  <i className="material-icons right">print</i>Reporte
                </a>
              </div>
              <div className="row center-align">
                <div className="input-field offset-l3 col m6 l6">
                  {this.state.roles.has('ADMINISTRADOR') &&  this.state.object.status != 'FINALIZADO'?
                  <Select
                      name="form-field-name"
                      value={this.state.option.value}
                      options={this.state.options}
                      onChange={this.handleChange}
                      placeholder="Estado"
                  />
                  :
                  <h6>{this.state.option.value}</h6>
                  }
                </div>
              </div>

              <div className="divider"></div>
              <div className="row">
                <p>{this.state.object.description}</p>
              </div>
              <div className="divider"></div>
              <div className="row center-align">
                <h5>Materiales</h5>
              </div>
              <div className="row">
                <ul className="collection">
                  {
                    this.state.object.material.map((object,index)=>{
                      return(
                        <li key={index} className="collection-item"><div>{object.object.name} <span className="secondary-content black-text">Cantidad: {object.quantity}</span></div></li>
                      )
                    })
                  }
                </ul>
              </div>
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    )
  }


  render(){
    return(
      <div>
        <NotificationSystem ref="notificationSystem" />

        <div className="container">
          <div className="row">
            <div className="col s12 m12 l12 z-depth-1">
              <div className="container containerLimits">
                <h5 className="center-align">Proyectos</h5>
                <div className="divider"></div>
              </div>
              <ul className="collection">
                {this.renderProjects()}
              </ul>
              {
                this.renderModal()
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, null)(MainContainer);
