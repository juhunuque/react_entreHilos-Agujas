import React, {Component, PropTypes} from 'react';


export default class UserForm extends Component{

  constructor(props){
    super(props);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  deleteUser(){
    this.props.delete(this.props.user);
  }

  editUser(event){
    this.props.edit(event,this.props.user);
  }

  render(){
    return(
      <div>
          <div className="row">
            <div className="col s6 m6 l6">
              <span className="flow-text">
                Usuario seleccionado: &nbsp;
                {this.props.user.username}
              </span>
            </div>

            <div className="col s6 m6 l6 right-align">
              <a className="btn-floating btn-large waves-effect waves-light blue darken-2 button-user-control-bar"
                onClick={this.editUser}>
                <i className="material-icons">build</i>
              </a>
              {/* <a className="btn-floating btn-large waves-effect waves-light blue darken-2 button-user-control-bar" onClick={this.deleteUser}>
                <i className="material-icons">delete</i>
              </a> */}
              <a className="btn-floating btn-large waves-effect waves-light blue darken-2" onClick={this.props.clean}>
                <i className="material-icons">clear</i>
              </a>
            </div>
          </div>
      </div>

    )
  }
}
