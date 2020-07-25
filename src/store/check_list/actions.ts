import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
import { failedCreateCheckList, failedUpdateCheckList } from '../../utils/text';
import { FETCH_CHECK_LISTS, CREATE_CHECK_LIST, UPDATE_CHECK_LIST } from './types';

export const fetchCheckLists = (boardId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardId}/check_lists`);

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data, { deep: true });
    dispatch({ type: FETCH_CHECK_LISTS, payload: camelizedData.checkLists });
  }
};

export const createCheckList = (title: string, cardId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.post(`/card/${cardId}/check_list`, { title });

  if (response?.status === 201) {
    const camelizedData = camelCaseKeys(response.data, { deep: true });
    dispatch({ type: CREATE_CHECK_LIST, payload: camelizedData.checkList });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedCreateCheckList,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const updateCheckList = (checkListId: number, title: string) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.patch(`/check_list/${checkListId}`, { title });

    if (response?.status === 200) {
      dispatch({ type: UPDATE_CHECK_LIST, payload: { checkListId, title } });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateCheckList,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
