import {api} from '../../services/api';
import constants from '../constants';
import jwtDecode from 'jwt-decode';
import {getData, storeData} from '../../services/localStorage';
import {Dispatch} from 'redux';

const authorize = (token: string) => {
  return storeData(constants.AUTH_KEY_TOKEN, token);
};

export const loginAction = async (data: any) => {
  try {
    const response = await api.post('/auth/login', data);
    await authorize(response.data.token);
    return response;
  } catch (error) {
    return await Promise.reject(error);
  }
};

export const authenticateUser = async (dispatch: Dispatch) => {
  try {
    dispatch({type: constants.AUTHENTICATING, payload: true});
    const apiKey = await getData(constants.AUTH_KEY_TOKEN);
    const decoded: any = jwtDecode(apiKey);
    const {data} = decoded;
    if (data && data.email && data.userId && data.username) {
      dispatch({
        type: constants.AUTHENTICATE,
        payload: {
          isLoggedIn: true,
          ...data,
        },
      });
    } else {
      dispatch({
        type: constants.AUTHENTICATE,
        payload: {
          isLoggedIn: false,
        },
      });
    }
    dispatch({type: constants.AUTHENTICATING, payload: false});
  } catch (e) {
    dispatch({
      type: constants.AUTHENTICATE,
      payload: {
        isLoggedIn: false,
      },
    });
    dispatch({type: constants.AUTHENTICATING, payload: false});
  }
};
export const logout = async (dispatch: Dispatch) => {
  await authorize('');
  dispatch({
    type: constants.AUTHENTICATE,
    payload: {
      isLoggedIn: false,
    },
  });
}
