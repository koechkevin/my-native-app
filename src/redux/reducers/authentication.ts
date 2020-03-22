import {Action, Authentication} from '../../types';
import constants from '../constants';

const initialState: Authentication = {
  auth: {
    isLoggedIn: true,
  },
  authenticating: true,
};

const authentication = (
  state = initialState,
  action: Action,
): Authentication => {
  switch (action.type) {
    case constants.AUTHENTICATE:
      return {...state, auth: action.payload};
    case constants.AUTHENTICATING:
      return {...state, authenticating: action.payload}
    default:
      return state;
  }
};

export default authentication;
