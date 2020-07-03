import { newAxios } from '../../configureAxios';
import { AppDispatch, RootState } from '..';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  MOVE_LIST,
} from './types';

import {
  failedCreateList,
  failedUpdateList,
  failedDeleteList,
  failedUpdateListIndex,
} from '../../utils/text';


export const createList = (boardId: number, params: { name: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.post(`/board/${boardId}/list`, params);

    if (response?.status === 201) {
      dispatch({ type: CREATE_LIST, payload: response.data.list });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedCreateList,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

export const updateList = (listId: number, params: { name: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.patch(`list/${listId}`, params);

    if (response?.status === 200) {
      dispatch({ type: UPDATE_LIST, payload: response.data.list });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateList,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

export const deleteList = (listId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.delete(`/list/${listId}`);

  if (response?.status === 200) {
    dispatch({ type: DELETE_LIST, payload: listId });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedDeleteList,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const moveList = (params: { dropId: number, dragId: number }) => ({
  type: MOVE_LIST,
  payload: params,
});

export const updateListIndex = () => (
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const params = getState().board.selectedBoard.lists.map((list) => ({
      id: list.id,
      index: list.index,
    }));
    const axios = newAxios();
    const response = await axios.patch('/lists/index', params);

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateListIndex,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
