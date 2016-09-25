import React, {Component, PropTypes} from 'react';

export default class ControlBar extends Component{
  constructor(props){
    super(props);
    this.reset = this.reset.bind(this);
  }

  reset(){
    this.props.reset(this.props.object);
  }

  render(){
    return(
      <div>
          <div className="row">
            <div className="col s6 m6 l6">
              <span className="flow-text">
                Usuario seleccionado: &nbsp;
                {this.props.object.username}
              </span>
            </div>

            <div className="col s6 m6 l6 right-align">
              <a className="btn-floating btn-large waves-effect waves-light blue darken-2 button-user-control-bar"
                onClick={this.reset}>
                <i className="material-icons">done</i>
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
