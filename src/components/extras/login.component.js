import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import axios from 'axios';
import NotificationSystem from 'react-notification-system';

import Header from './header.component';
import {loginFunction} from './../../actions/user';
import {SERVER_URL} from './../../actions/user';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: '',
      user: '',
      oldPassword:'',
      password:'',
      password2:'',
      isLogin: true,
      errorMsg: false
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderPasswordConfirm = this.renderPasswordConfirm.bind(this);
    this.clean = this.clean.bind(this);
  }



  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  _addNotification(message, level, title) {
    this._notificationSystem.addNotification({
      message: message,
      level: level,
      title: title
    });
  }

  handleLoginSubmit(e){
    e.preventDefault();
    axios.post(`${SERVER_URL}v1/user/login`, {user: this.state.user, password: this.state.password})
    .then((response)=>{
      if(response.status === 210){
        // this._addNotification(`Debe cambiar la contraseña`, 'warning', 'Info!');
        this.setState({id: response.data._id, password:'', password2: '', isLogin: false});
      }else{
        sessionStorage.setItem('authUser', JSON.stringify(response.data));
        this.props.loginFunction(response.data);
        this.clean();
        // this._addNotification(`Bienvenido ${response.data.username}!`, 'success', 'Exitoso!');
        window.location.replace("/");
      }
    })
    .catch((error)=>{
      // this._addNotification('Error interno.', 'error', 'Error!');
      this.clean();
      this.setState({errorMsg: true});
      console.log('Error interno => ',error);
    });
  }

  handlePasswordSubmit(e){
    e.preventDefault();
    if(this.state.password != this.state.password2){
      // this._addNotification(`Las contraseñas no coinciden!`, 'error', 'Error!');
      this.setState({password:'', password2:''});
      this.setState({errorMsg: true});
      return;
    }
    axios.post(`${SERVER_URL}v1/security/${this.state.id}`, {
      password: this.state.password,
      isChanging: true,
      oldPassword: this.state.oldPassword
    })
    .then((response)=>{
      // this._addNotification(`Contraseña actualizada correctamente!`, 'success', 'Exitoso!');
      this.clean();
    })
    .catch((error)=>{
      // this._addNotification('Error interno.', 'error', 'Error!');
      this.clean();
      console.log('Error interno => ',error);
    });
  }

  clean(){
    this.setState({user:'',password:'', password2:'', oldPassword: '', isLogin: true, errorMsg: false});
  }

  renderLogin(){
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="offset-l3 col s12 m6 l6 z-depth-6 card-panel">
              {this.state.errorMsg &&
              <h5 className="center-align">Usuario invalido!</h5>}
              <form onSubmit={this.handleLoginSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <input className="validate" id="user" type="text" value={this.state.user}
                    onChange={event => this.setState({user: event.target.value})} required/>
                    <label htmlFor="user">Usuario</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password" type="password" value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})} />
                    <label htmlFor="password">Password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <button className="btn waves-effect waves-light blue darken-2 col s12" type="submit" >
                      Login
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPasswordConfirm(){
    return(
      <div>
        <div className="container">
          <div className="row">
            <div className="offset-l3 col s12 m6 l6 z-depth-6 card-panel">
              <form onSubmit={this.handlePasswordSubmit}>
                <div className="row center-align">
                  <h5>Debe introducir un nuevo password</h5>
                  {this.state.errorMsg &&
                  <h5 className="center-align">Contraseñas no coinciden</h5>}
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input className="validate" id="oldPassword" type="password" value={this.state.oldPassword}
                    onChange={event => this.setState({oldPassword: event.target.value})} required/>
                    <label htmlFor="oldPassword">Password anterior</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input className="validate" id="password1" type="password" value={this.state.password}
                    onChange={event => this.setState({password: event.target.value})} required/>
                    <label htmlFor="password1">Nuevo password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <input id="password2" type="password" value={this.state.password2}
                    onChange={event => this.setState({password2: event.target.value})} required/>
                    <label htmlFor="password2">Confirmar password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <button className="btn waves-effect waves-light blue darken-2 col s12" type="submit" >
                      Confirmar
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div>
        <Header isAuth={false} logout={this.logout}/>
        {this.state.isLogin ? this.renderLogin() : this.renderPasswordConfirm()}
      </div>
    )
  }
}


function mapDispatchToProps(dispatch){
  return bindActionCreators({loginFunction}, dispatch);
}

function mapStateToProps({users}){
  return{users};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
