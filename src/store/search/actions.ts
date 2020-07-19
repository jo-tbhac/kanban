import snakeCaseKeys from 'snakecase-keys';
import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '../index';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { failedSearchCard, failedSearchBoard } from '../../utils/text';
import {
  SEARCH_CARD,
  CLEAR_SEARCH_CARD_POOL,
  ON_CHANGE_SEARCH_CARD_KEYWORD,
  SEARCH_BOARD,
  CLEAR_SEARCH_BOARD_POOL,
  ON_CHANGE_SEARCH_BOARD_KEYWORD,
} from './types';

export const searchCard = (params: { title: string, boardId: number }) => (
  async (dispatch: AppDispatch) => {
    const snakeCaseParams = snakeCaseKeys(params);
    const axios = newAxios();
    const response = await axios.get('/cards/search', { params: snakeCaseParams });

    if (response?.status === 200) {
      const camelizedData = camelCaseKeys(response.data);
      dispatch({ type: SEARCH_CARD, payload: camelizedData.cardIds });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedSearchCard,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

export const clearSearchCardPool = () => ({
  type: CLEAR_SEARCH_CARD_POOL,
});

export const onChangeSearchCardKeyword = (keyword: string) => ({
  type: ON_CHANGE_SEARCH_CARD_KEYWORD,
  payload: keyword,
});

export const searchBoard = (name: string) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get('/boards/search', { params: { name } });

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data);
    dispatch({ type: SEARCH_BOARD, payload: camelizedData.boardIds });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedSearchBoard,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const clearSearchBoardPool = () => ({
  type: CLEAR_SEARCH_BOARD_POOL,
});

export const onChangeSearchBoardKeyword = (keyword: string) => ({
  type: ON_CHANGE_SEARCH_BOARD_KEYWORD,
  payload: keyword,
});
