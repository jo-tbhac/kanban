import snakeCaseKeys from 'snakecase-keys';
import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { SEARCH_CARD, CLEAR_SEARCH_CARD_POOL, ON_CHANGE_SEARCH_CARD_KEYWORD } from './types';
import { AppDispatch } from '../index';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { failedSearchCard } from '../../utils/text';

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
