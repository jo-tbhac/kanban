import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { CREATE_CARD } from './types';
import { joinErrors } from '../../utils/utils';
import { failedCreateCard } from '../../utils/text';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';

// eslint-disable-next-line
export const createCard = (listID: number, params: { title: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.post(`/list/${listID}/card`, params);

    if (response?.status === 201) {
      const camelizedData = camelCaseKeys(response.data.card);
      dispatch({ type: CREATE_CARD, payload: camelizedData });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedCreateCard,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
