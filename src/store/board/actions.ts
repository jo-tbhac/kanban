import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { FETCH_ALL_BOARDS, FETCH_BOARD, CREATE_BOARD } from './types';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { joinErrors } from '../../utils/utils';
import { failedFetchBoardData, failedCreateBoard } from '../../utils/text';

export const fetchBoard = (boardID: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardID}`);

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data.board, { deep: true });
    dispatch({ type: FETCH_BOARD, payload: camelizedData });
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
    const camelizedData = camelCaseKeys(response.data.boards);
    dispatch({ type: FETCH_ALL_BOARDS, payload: camelizedData });
  }
};

export const createBoard = (params: { name: string }) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.post('/board', params);

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
};
