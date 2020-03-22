import {combineReducers} from 'redux';
import authentication from './authentication';
import global from './global';
import {messages} from './messaging';

const rootReducer = combineReducers({
  authentication,
  global,
  messages,
});

export default rootReducer;
