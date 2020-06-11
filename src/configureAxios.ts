import axios from 'axios';

import store from './store';
import { openDialog } from './store/dialog/actions';
import { dialogInternalServerError, dialogUnAuthorization } from './store/dialog/types';

export const baseURL = 'http://localhost:8080';

export const newAxios = () => {
  const instance = axios.create({
    baseURL,
  });

  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  // eslint-disable-next-line dot-notation
  instance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

  instance.interceptors.response.use((response) => response, (error) => {
    if (error.response === undefined) {
      store.dispatch(openDialog(dialogInternalServerError) as any);
      return error;
    }

    if (error.response.status === 401) {
      store.dispatch(openDialog(dialogUnAuthorization) as any);
      return error.response;
    }

    return error.response;
  });

  return instance;
};
