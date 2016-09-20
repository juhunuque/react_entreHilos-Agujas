import { combineReducers } from 'redux';
import UsersReducer from './users.reducer';

const rootReducer = combineReducers({
  users: UsersReducer
});

export default rootReducer;
