import {FETCH_USERS} from './../actions/user';

// const INITIAL_STATE = [];
const INITIAL_STATE = {all: [], post: null};


export default function (state = INITIAL_STATE, action){
  switch (action.type) {
    case FETCH_USERS:
        return {all: action.payload.data};
    default:
      return state;

  }
}
