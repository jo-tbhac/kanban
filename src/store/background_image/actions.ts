import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
// import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
// import { joinErrors } from '../../utils/utils';
import { FETCH_BACKGROUND_IMAGES } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchBackgroundImages = () => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get('/background_images');

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data);
    dispatch({ type: FETCH_BACKGROUND_IMAGES, payload: camelizedData.backgroundImages });
  }
};
