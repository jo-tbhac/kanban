import camelCaseKeys from 'camelcase-keys';
import snakeCaseKeys from 'snakecase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { LOAD_END } from '../loading/types';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { joinErrors } from '../../utils/utils';
import {
  failedFetchBoardData,
  failedCreateBoard,
  failedUpdateBoard,
  failedDeleteBoard,
  failedUpdateBackgroundImage,
} from '../../utils/text';

import {
  FETCH_ALL_BOARDS,
  FETCH_BOARD,
  CREATE_BOARD,
  UPDATE_BOARD,
  DELETE_BOARD,
  UPDATE_BACKGROUND_IMAGE,
} from './types';

export const fetchBoard = (boardId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardId}`);

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data.board, { deep: true });
    dispatch({ type: FETCH_BOARD, payload: camelizedData });
    dispatch({ type: LOAD_END });
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedFetchBoardData,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const fetchAllBoards = () => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get('/boards');

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data.boards, { deep: true });
    dispatch({ type: FETCH_ALL_BOARDS, payload: camelizedData });
    dispatch({ type: LOAD_END });
  }
};

export const createBoard = (params: { name: string, backgroundImageId: number }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const snakeCaseParams = snakeCaseKeys(params);
    const response = await axios.post('/board', snakeCaseParams);

    if (response?.status === 201) {
      const camelizedData = camelCaseKeys(response.data.board);
      dispatch({ type: CREATE_BOARD, payload: camelizedData });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedCreateBoard,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

export const updateBoard = (params: { name: string }, boardId: number) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.patch(`/board/${boardId}`, params);

    if (response?.status === 200) {
      const camelizedData = camelCaseKeys(response.data.board);
      dispatch({ type: UPDATE_BOARD, payload: camelizedData });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateBoard,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

export const deleteBoard = (boardId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.delete(`/board/${boardId}`);

  if (response?.status === 200) {
    dispatch({ type: DELETE_BOARD, payload: boardId });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedDeleteBoard,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const updateBackgroundImage = (boardId: number, backgroundImageId: number) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.patch(`/board/${boardId}/background_image/${backgroundImageId}`);

    if (response?.status === 200) {
      dispatch({ type: UPDATE_BACKGROUND_IMAGE, payload: backgroundImageId });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateBackgroundImage,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
