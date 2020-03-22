import {api} from '../../services/api';
import {Dispatch} from 'redux';
import constants from '../constants';
import base64 from 'base-64';
import moment from 'moment';
import {database} from '../../services/firebase';
import {NewMessage} from '../../types';

const fetchUser = async (username: string, dispatch: Dispatch) => {
  try {
    const response = await api.get(`/auth/users/${username}`);
    dispatch({
      type: constants.LOAD_USER_DATA,
      payload: {[response.data.id]: response.data},
    });
    return response.data;
  } catch (error) {
    console.log('=======>', error);
  }
};

export const createMessage = async ({
  myId,
  recipientId,
  message,
  id,
  recipient,
  me,
}: NewMessage) => {
  const createdAt = moment().format();
  const msg = {
    from: myId,
    to: recipientId,
    message,
    createdAt,
    id,
    read: false,
    encoded: false,
  };
  await database.ref(`/chats/${myId}/${recipientId}/user`).set(recipient);
  await database.ref(`/chats/${recipientId}/${myId}/user`).set(me);
  await database
    .ref(`/chats/${myId}/${recipientId}/list`)
    .push({...msg, read: true});
  await database.ref(`/chats/${recipientId}/${myId}/list`).push(msg);
  const snap = await database
    .ref(`/chats/${recipientId}/${myId}/notifications`)
    .once('value');
  const notificationCount = snap.val();
  await database
    .ref(`/chats/${myId}/${recipientId}/notifications`)
    .set(notificationCount ? notificationCount + 1 : 1);
};

export const decode = (encoded: string): string => {
  const secondBytes = base64.decode(encoded);
  return base64.decode(secondBytes);
};

export default fetchUser;
