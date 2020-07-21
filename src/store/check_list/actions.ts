import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
import { failedCreateCheckList } from '../../utils/text';
import { CREATE_CHECK_LIST } from './types';

/* eslint-disable import/prefer-default-export */
export const createCheckList = (name: string, cardId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.post(`/card/${cardId}/check_list`, { name });

  if (response?.status === 201) {
    const camelizedData = camelCaseKeys(response.data.card);
    dispatch({ type: CREATE_CHECK_LIST, payload: camelizedData });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedCreateCheckList,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};
