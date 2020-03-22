import axios from 'axios';
import {getData} from './localStorage';
import constants from '../redux/constants';

const environment = process.env['NODE_ENV'];
const key = constants.AUTH_KEY_TOKEN;

export const baseUrl =
  environment === 'development'
    ? 'http://192.168.0.28:5000'
    : 'https://my-staging-api.herokuapp.com';

export const api = {
  get: async (url: string, config?: any) => {
    const apiKey = await getData(key);
    const baseConfig = {headers: {authorization: apiKey}};
    const extraConfig = {...config, ...baseConfig};
    return axios.get(`${baseUrl}${url}`, extraConfig);
  },
  post: async (url: string, data: any, config?: any) => {
    const apiKey = await getData(key);
    const baseConfig = {headers: {authorization: apiKey}};
    const extraConfig = {...config, ...baseConfig};
    return axios.post(`${baseUrl}${url}`, data, extraConfig);
  },
  put: async (url: string, data: any, config?: any) => {
    const apiKey = await getData(key);
    const baseConfig = {headers: {authorization: apiKey}};
    const extraConfig = {...config, ...baseConfig};
    return axios.put(`${baseUrl}${url}`, data, extraConfig);
  },
};
