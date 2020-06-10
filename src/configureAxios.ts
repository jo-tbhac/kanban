import axios from 'axios';

export const baseURL = 'http://localhost:8080';

export const newAxios = () => {
  const instance = axios.create({
    baseURL,
  });

  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers.patch['Content-Type'] = 'application/json';
  // eslint-disable-next-line dot-notation
  instance.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');

  return instance;
};
