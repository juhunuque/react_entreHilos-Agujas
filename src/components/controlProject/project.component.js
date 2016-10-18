import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';



export default class MaterialComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      color: ''
    };
    this.renderStatusColor = this.renderStatusColor.bind(this);
  }

  renderStatusColor(){
    let status = '';
    switch (this.props.object.status) {
      case 'CREADO':
        status = 'amber-text text-accent-2';
        break;
      case 'EN PROCESO':
        status = 'green-text text-accent-4';
        break;
      case 'EN PAUSA':
        status = 'deep-orange-text text-accent-4';
        break;
      default:
        break
    }
    this.setState({color: status});
  }

  componentWillMount(){
    this.renderStatusColor();
  }

  render(){
    return(
      <li className="collection-item avatar">
        <span className="title"><h5>{this.props.object.project}</h5></span>
        <p>
           <span >{this.props.object.status}</span>
        </p>
        <a href="#!" className="secondary-content" onClick={()=>this.props.showDetails(this.props.object)}>
          <i className="material-icons blue-text text-darken-2">more_vert</i>
        </a>
      </li>
    )
  }
}
