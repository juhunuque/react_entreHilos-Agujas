import React, {Component, PropTypes} from 'react';

export default class ControlBar extends Component{
  constructor(props){
    super(props);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
  }

  delete(){
    this.props.delete(this.props.object);
  }

  edit(event){
    this.props.edit(event,this.props.object);
  }

  render(){
    return(
      <div>
          <div className="row">
            <div className="col s6 m6 l6">
              <span className="flow-text">
                Tipo seleccionado: &nbsp;
                {this.props.object.type}
              </span>
            </div>

            <div className="col s6 m6 l6 right-align">
              <a className="btn-floating btn-large waves-effect waves-light blue darken-2 button-user-control-bar"
                onClick={this.edit}>
                <i className="material-icons">build</i>
              </a>
              <a className="btn-floating btn-large waves-effect waves-light blue darken-2 button-user-control-bar" onClick={this.delete}>
                <i className="material-icons">delete</i>
              </a>
              <a className="btn-floating btn-large waves-effect waves-light blue darken-2" onClick={this.props.clean}>
                <i className="material-icons">clear</i>
              </a>
            </div>
          </div>
      </div>

    )
  }
}
