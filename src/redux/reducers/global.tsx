import constants from '../constants';
import {Action, GlobalState} from '../../types';
import {Text} from 'react-native';
import React from 'react';

const initialState: GlobalState = {
  showHeader: false,
  users: [],
  user: {},
  chatUsers: {},
  navigation: {},
  title: (
    <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
      My Resume
    </Text>
  ),
  headerRightItems: [],
  onGoBack: () => {},
};

const global = (state = initialState, action: Action): GlobalState => {
  switch (action.type) {
    case constants.HANDLE_HEADER:
      return {...state, showHeader: action.payload};
    case constants.HANDLE_HEADER_RIGHT:
      return {...state, headerRightItems: action.payload};
    case constants.LOAD_USER_DATA:
      return {...state, chatUsers: {...state.chatUsers, ...action.payload}};
    case constants.LOAD_ALL_USERS:
      return {...state, users: action.payload};
    case constants.NAVIGATION_PROPS:
      return {...state, navigation: action.payload};
    case constants.HANDLE_PAGE_TITLE:
      const title =
        typeof action.payload === 'string' ? (
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            {action.payload}
          </Text>
        ) : (
          action.payload
        );
      return {...state, title};
    case constants.ON_GO_BACK:
      return {...state, onGoBack: action.payload};
    default:
      return state;
  }
};

export default global;
