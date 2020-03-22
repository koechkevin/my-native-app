import {database} from '../../services/firebase';
import {Dispatch} from 'redux';
import constants from '../constants';
import {api} from '../../services/api';
import moment from 'moment';

export const getChatList = (userId: string, dispatch: Dispatch) => {
  const ref = database.ref(`/chats/${userId}`);
  ref.on('value', snap => {
    const value = snap.val();
    dispatch({type: constants.LOAD_CHAT_LIST, payload: value || {}});
  });
  return ref;
};

export const getUsers = async (dispatch: Dispatch) => {
  try {
    const response = await api.get('/auth/users');
    dispatch({type: constants.LOAD_ALL_USERS, payload: response.data.users});
  } catch (error) {
    console.log('=======>', error);
  }
};

export const resolveTime = (time: string): string => {
  const currentTime = moment();
  const diffValue = (
    value: 'days' | 'seconds' | 'years' | 'minutes' | 'hours',
  ) => currentTime.diff(moment(time), value);
  const seconds = diffValue('seconds');
  const minutes = diffValue('minutes');
  const hours = diffValue('hours');
  let output = moment(time).format('ddd, Do MMMM');
  if (seconds < 60) {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }
  if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  }
  if (hours < 24) {
    const t = moment(time).format('HH:MM');
    if (currentTime.day() === moment(time).day()) {
      return `today at ${t}`;
    }
    return `yesterday at ${t}`;
  }
  return output;
};
