import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
import {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  ATTACH_LABEL,
  DETACH_LABEL,
  CardLabelPayload,
} from './types';

import {
  failedCreateCard,
  failedUpdateCard,
  failedDeleteCard,
  failedAttachLabel,
  failedDetachLabel,
} from '../../utils/text';

export const createCard = (listId: number, params: { title: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.post(`/list/${listId}/card`, params);

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
  cardId: number,
  params: ({ title: string } | { description: string }),
) => async (dispatch: AppDispatch) => {
  const key = Object.keys(params)[0];
  const axios = newAxios();
  const response = await axios.patch(`/card/${cardId}/${key}`, params);

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

export const attachLabel = (payload: CardLabelPayload) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const params = { label_id: payload.labelId };
  const response = await axios.post(`/card/${payload.cardId}/card_label`, params);

  if (response?.status === 201) {
    dispatch({ type: ATTACH_LABEL, payload });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedAttachLabel,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const detachLabel = (payload: CardLabelPayload) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.delete(`/card/${payload.cardId}/card_label/${payload.labelId}`);

  if (response?.status === 200) {
    dispatch({ type: DETACH_LABEL, payload });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedDetachLabel,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};
