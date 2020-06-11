import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import {
  FETCH_ALL_BOARDS,
  FETCH_BOARD,
} from './types';

export const fetchBoard = (boardID: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardID}`);

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data.board, { deep: true });
    dispatch({ type: FETCH_BOARD, payload: camelizedData });
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
