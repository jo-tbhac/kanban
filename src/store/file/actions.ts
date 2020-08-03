import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
// import { joinErrors } from '../../utils/utils';
// import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
// import {  } from '../../utils/text';
import { FETCH_FILES } from './types';

// eslint-disable-next-line import/prefer-default-export
export const fetchFiles = (boardId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardId}/files`);

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data, { deep: true });
    dispatch({ type: FETCH_FILES, payload: camelizedData.files });
  }
};
