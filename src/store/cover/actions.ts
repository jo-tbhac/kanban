import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
import { failedCreateCover } from '../../utils/text';
import { CREATE_COVER } from './types';

// eslint-disable-next-line import/prefer-default-export
export const createCover = (listId: number, cardId: number, fileId: number) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.post(`/card/${cardId}/cover/${fileId}`);

    if (response?.status === 201) {
      const camelizedData = camelCaseKeys(response.data.cover, { deep: true });
      dispatch({ type: CREATE_COVER, payload: { cover: camelizedData, listId } });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedCreateCover,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
