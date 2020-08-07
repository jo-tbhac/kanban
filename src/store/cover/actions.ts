import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
import { failedCreateCover, failedUpdateCover } from '../../utils/text';
import { CREATE_COVER, UPDATE_COVER } from './types';

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

export const updateCover = (listId: number, cardId: number, fileId: number) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const params = snakeCaseKeys({ newFileId: fileId, cardId });
    const response = await axios.patch('/cover', params);

    if (response?.status === 200) {
      const cover = { cardId, fileId };
      dispatch({ type: UPDATE_COVER, payload: { cover, listId } });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateCover,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
