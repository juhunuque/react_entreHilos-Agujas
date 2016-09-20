import axios from 'axios';

export const SERVER_URL = 'http://localhost:3000/';

export const FETCH_USERS = 'FETCH_USERS';

export function fetchUsers(){
  const request = axios.get(`${SERVER_URL}v1/user`);

  return{
    type: FETCH_USERS,
    payload: request
  };
}
