import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch, RootState } from '..';
import {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  MOVE_CARD,
  MOVE_CARD_ACROSS_LIST,
  MOVE_CARD_TO_EMPTY_LIST,
  ATTACH_LABEL,
  DETACH_LABEL,
  CardLabelPayload,
  MoveCardPayload,
  MoveCardAcrossListPayload,
  MoveCardToEmptyListPayload,
} from './types';

import {
  failedCreateCard,
  failedUpdateCard,
  failedDeleteCard,
  failedUpdateCardIndex,
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

export const moveCard = (payload: MoveCardPayload) => ({
  type: MOVE_CARD,
  payload,
});

export const moveCardAcrossList = (payload: MoveCardAcrossListPayload) => ({
  type: MOVE_CARD_ACROSS_LIST,
  payload,
});

export const moveCardToEmptyList = (payload: MoveCardToEmptyListPayload) => ({
  type: MOVE_CARD_TO_EMPTY_LIST,
  payload,
});

export const updateCardIndex = (payload: { dropListId: number, dragListId: number }) => (
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const { lists } = getState().board.selectedBoard;
    const dropList = lists.find((list) => list.id === payload.dropListId);
    const dragList = lists.find((list) => list.id === payload.dragListId);
    if (!dropList || !dragList) {
      return;
    }

    const cards = payload.dropListId === payload.dragListId
      ? dropList.cards
      : [...dropList.cards, ...dragList.cards];

    const params = cards.map((card) => ({
      id: card.id,
      listId: card.listId,
      index: card.index,
    }));
    const snakeCaseParams = snakeCaseKeys(params);
    const axios = newAxios();
    const response = await axios.patch('/cards/index', snakeCaseParams);

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateCardIndex,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

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
