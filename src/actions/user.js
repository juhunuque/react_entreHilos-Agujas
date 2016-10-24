import axios from 'axios';

export const SERVER_URL = 'http://localhost:3000/';

export const FETCH_USERS = 'FETCH_USERS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function fetchUsers(){
  const request = axios.get(`${SERVER_URL}v1/user`);

  return{
    type: FETCH_USERS,
    payload: request
  };
}

export function loginFunction(data){
  return{
    type: LOGIN,
    payload: data
  }
}

export function logoutFunction(){

  return{
    type: LOGOUT,
    payload: null
  }
}
