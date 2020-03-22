import {Action, MessagingState} from '../../types';
import constants from '../constants';

const initialState: MessagingState = {
  chatlist: {},
  oppositeChatlist: {},
};

export const messages = (
  state = initialState,
  action: Action,
): MessagingState => {
  const {payload, type} = action;
  switch (type) {
    case constants.LOAD_CHAT_LIST:
      return {...state, chatlist: payload};
    case constants.LOAD_MESSAGES:
      return {...state};
    case constants.LOAD_OPPOSITE_CHAT_LIST:
      return {...state, oppositeChatlist: payload};
    default:
      return state;
  }
};
