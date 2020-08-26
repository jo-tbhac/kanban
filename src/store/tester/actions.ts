import camelCaseKeys from 'camelcase-keys';

import { AppDispatch } from '..';
import { newAxios } from '../../configureAxios';
import { FETCH_TESTERS } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchTesters = () => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get('/testers');

  if (response.status === 200) {
    const camelizedData = camelCaseKeys(response.data.users);
    dispatch({ type: FETCH_TESTERS, payload: camelizedData });
  }
};
