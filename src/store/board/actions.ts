import camelCaseKeys from 'camelcase-keys';

import { AppDispatch } from '..';
import {
  SHOW_BOARD_INDEX,
  SHOW_BOARD,
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
