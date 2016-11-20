import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import axios from 'axios';

import {SERVER_URL} from './../../actions/user';


export default class ComponentMain extends Component{
  constructor(props){
    super(props);

    this.state ={
      category:'',
      categories: [],
      user: null,
      option: [],
      options: []
      };

    this.generateReport = this.generateReport.bind(this);
    this.clean = this.clean.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  componentWillMount(){
    this.setState({user: JSON.parse(sessionStorage.getItem('authUser'))})
    this.fetchCategories();
  }

  clean(){
    this.setState({fromDt: '', toDt: ''});
  }

  fetchCategories(){
    axios.get(`${SERVER_URL}v1/catalog/`)
    .then((response)=>{
      this.setState({categories: response.data},()=>{
        this.renderSelect();
      });
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
    });
  }

  renderSelect(){
    let options = [];
    this.state.categories.map((obj, index)=>{
      options.push({value:obj._id, label: obj.type, object: obj, clearableValue: false});
    })
    this.setState({options: options})
  }

  generateReport(){
    axios.get(`${SERVER_URL}v1/material/report/material?username=${this.state.user.username}&category=${this.state.category}`)
    .then((response)=>{
      document.location.assign(`${SERVER_URL}v1/material/report/material?username=${this.state.user.username}&category=${this.state.category}`);
      this.clean();
    })
    .catch((error)=>{
      this.clean();
      console.log('Error interno => ',error);
    });
  }

  handleChange(val){
    if(val == null){
      val = [];
    }
    this.setState({option:val});
    this.setState({category:val.label});
  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="container z-depth-1">
            <div className="container containerLimits">
              <h3 className="center-align">Generar reporte materiales</h3>
              <div className="divider"></div>
            </div>
            <div style={{padding: "2%"}}>
              <div className="row center-align">
                <a className="waves-effect waves-light btn-large blue darken-2" onClick={this.generateReport}>
                  <i className="material-icons right">print</i>Generar
                </a>
              </div>
              <div className="row center-align">
                <div className="offset-l3 input-field col s6 m6 l6">
                  <Select
                      name="form-field-name"
                      value={this.state.option.value}
                      options={this.state.options}
                      onChange={this.handleChange}
                      placeholder="Categoria"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
