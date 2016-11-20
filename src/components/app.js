import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'
import axios from 'axios';

import Header from './extras/header.component';
import {loginFunction, logoutFunction} from './../actions/user';

import {SERVER_URL} from './../actions/user';

class App extends Component {
  constructor(props){
    super(props);
    this.logout = this.logout.bind(this);
  }

  componentWillMount(){
    let user = JSON.parse(sessionStorage.getItem('authUser'));
    if(user != null){
      this.props.loginFunction(user);
      return;
    }
    if(this.props.users.loginUser == null){
      browserHistory.push('/login');
    }
  }

  isAuthenticated(){
      return this.props.users.loginUser == null ? false : true;
  }

  resetPwd(obj){
    axios.get(`${SERVER_URL}v1/security/restart/${obj._id}`)
    .then((response)=>{
      console.log('Contraseña reiniciada.');
    })
    .catch((error)=>{
      console.log('Error interno => ',error);
    });
  }

  clean(){
    this.fetchData();
    this.setState({selectedObject: {}},()=>{
      this.setState({optBarOpt: false});
      this.setState({addEditOpt: false});
    });
  }

  logout(){
    sessionStorage.removeItem('authUser');
    window.location.replace("/login");
  }

  render() {
    return (
      <div>
        <Header isAuth={true} logout={this.logout} user={this.props.users.loginUser} reset={this.resetPwd}/>
        {this.props.children}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({loginFunction, logoutFunction}, dispatch);
}

function mapStateToProps({users}){
  return{users};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
