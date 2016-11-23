import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import axios from 'axios';

import {SERVER_URL} from './../../actions/user';


export default class ComponentMain extends Component{
  constructor(props){
    super(props);

    this.state ={
      user: null
      };

    this.generateReport = this.generateReport.bind(this);
  }

  componentWillMount(){
    this.setState({user: JSON.parse(sessionStorage.getItem('authUser'))})
  }



  generateReport(){
    axios.get(`${SERVER_URL}v1/material/report/restock?username=${this.state.user.username}&quantity=0`)
    .then((response)=>{
      document.location.assign(`${SERVER_URL}v1/material/report/restock?username=${this.state.user.username}&quantity=0`);
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
    });
  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="container z-depth-1">
            <div className="container containerLimits">
              <h3 className="center-align">Generar reporte materiales por reestablecer</h3>
              <div className="divider"></div>
            </div>
            <div style={{padding: "2%"}}>
              <div className="row center-align">
                <a className="waves-effect waves-light btn-large blue darken-2" onClick={this.generateReport}>
                  <i className="material-icons right">print</i>Generar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
