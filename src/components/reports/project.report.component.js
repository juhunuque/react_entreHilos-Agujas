import React, {Component, PropTypes} from 'react';
import axios from 'axios';

import {SERVER_URL} from './../../actions/user';


export default class ComponentMain extends Component{
  constructor(props){
    super(props);

    this.state ={
      fromDt: '',
      toDt: '',
      user: null
      };

    this.generateReport = this.generateReport.bind(this);
    this.clean = this.clean.bind(this);
  }

  componentWillMount(){
    this.setState({user: JSON.parse(sessionStorage.getItem('authUser'))})
  }

  clean(){
    this.setState({fromDt: '', toDt: ''});
  }

  generateReport(){
    axios.get(`${SERVER_URL}v1/project/report/project?username=${this.state.user.username}&fromDt=${this.state.fromDt}&toDt=${this.state.toDt}`)
    .then((response)=>{
      document.location.assign(`${SERVER_URL}v1/project/report/project?username=${this.state.user.username}&fromDt=${this.state.fromDt}&toDt=${this.state.toDt}`);
      this.clean();
    })
    .catch((error)=>{
      this.clean();
      console.log('Error interno => ',error);
    });
  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="container z-depth-1">
            <div className="container containerLimits">
              <h3 className="center-align">Generar reporte proyectos</h3>
              <div className="divider"></div>
            </div>
            <div style={{padding: "2%"}}>
              <div className="row center-align">
                <a className="waves-effect waves-light btn-large blue darken-2" onClick={this.generateReport}>
                  <i className="material-icons right">print</i>Generar
                </a>
              </div>
              <div className="row center-align">
                <div className="input-field col s6 m6 l6">
                    <input id="fromDt" type="text" className="validate" value={this.state.fromDt}
                      onChange={(event)=>this.setState({fromDt: event.target.value})} required/>
                    <label htmlFor="name">Desde (YYYY/MM/DD)</label>
                </div>
                <div className="input-field col s6 m6 l6">
                    <input id="toDt" type="text" className="validate" value={this.state.toDt}
                      onChange={(event)=>this.setState({toDt: event.target.value})} required/>
                    <label htmlFor="name">Hasta (YYYY/MM/DD)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
