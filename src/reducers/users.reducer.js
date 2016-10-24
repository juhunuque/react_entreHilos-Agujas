import {FETCH_USERS, LOGIN, LOGOUT} from './../actions/user';

// const INITIAL_STATE = [];
const INITIAL_STATE = {all: [], loginUser: null};


export default function (state = INITIAL_STATE, action){
  switch (action.type) {
    case FETCH_USERS:
        return {all: action.payload.data, loginUser: state.loginUser};
    case LOGIN:
        return {all: state.all, loginUser: action.payload};
    case LOGOUT:
        return {all: state.all, loginUser: action.payload};
    default:
      return state;

  }
}
