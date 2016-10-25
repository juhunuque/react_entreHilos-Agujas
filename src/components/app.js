import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router'

import Header from './extras/header.component';
import {loginFunction, logoutFunction} from './../actions/user';

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
      // return true
  }

  logout(){
    sessionStorage.removeItem('authUser');
    this.props.logout();
    window.location.replace("/login");
  }

  render() {
    return (
      <div>
        <Header isAuth={true} logout={this.logout} user={this.props.users.loginUser}/>
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
