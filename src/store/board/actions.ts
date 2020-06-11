import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import {
  SHOW_BOARD_INDEX,
  SHOW_BOARD,
  FETCH_ALL_BOARDS,
  // ShowBoardParams,
} from './types';

import dataStore from '../../tmp_dataStore';

export const showBoardIndex = () => ({
  type: SHOW_BOARD_INDEX,
});

export const showBoard = (/* params: ShowBoardParams */) => async (dispatch: AppDispatch) => {
  const camelizedData = camelCaseKeys(dataStore[0]);

  dispatch({ type: SHOW_BOARD, payload: camelizedData });
};

export const fetchAllBoards = () => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get('/boards');

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data.boards);
    dispatch({ type: FETCH_ALL_BOARDS, payload: camelizedData });
  }
};
