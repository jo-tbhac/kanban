import axios from 'axios';

import store from './store';
import { SIGN_OUT } from './store/session/types';
import { LOAD_END } from './store/loading/types';
import {
  OPEN_DIALOG,
  CLOSE_DIALOG,
  dialogInternalServerError,
  dialogUnAuthorization,
} from './store/dialog/types';

export const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://api.k4nban.com'
  : 'http://localhost:8080';

export const newAxios = () => {
  const instance = axios.create({
    baseURL,
  });

  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  // eslint-disable-next-line dot-notation
  instance.defaults.headers.common['X-Auth-Token'] = localStorage.getItem('token');

  instance.interceptors.response.use((response) => {
    if (response.config.method === 'delete') {
      store.dispatch({ type: CLOSE_DIALOG });
    }
    return response;
  }, (error) => {
    store.dispatch({ type: LOAD_END });

    if (error.response === undefined) {
      store.dispatch({ type: OPEN_DIALOG, payload: dialogInternalServerError });
      return error;
    }

    if (error.response.status === 401) {
      if (error.response.data?.reason === 'expired') {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        store.dispatch({ type: SIGN_OUT });
      }

      store.dispatch({ type: OPEN_DIALOG, payload: dialogUnAuthorization });
      return error.response;
    }

    return error.response;
  });

  return instance;
};
