import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { CREATE_CARD, UPDATE_CARD, DELETE_CARD } from './types';
import { joinErrors } from '../../utils/utils';
import { failedCreateCard, failedUpdateCard, failedDeleteCard } from '../../utils/text';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';

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

export const updateCard = (
  cardID: number,
  params: ({ title: string } | { description: string }),
) => async (dispatch: AppDispatch) => {
  const key = Object.keys(params)[0];
  const axios = newAxios();
  const response = await axios.patch(`/card/${cardID}/${key}`, params);

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data.card);
    dispatch({ type: UPDATE_CARD, payload: camelizedData });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedUpdateCard,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const deleteCard = (cardId: number, listId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.delete(`/card/${cardId}`);

  if (response?.status === 200) {
    dispatch({ type: DELETE_CARD, payload: { cardId, listId } });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedDeleteCard,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};
