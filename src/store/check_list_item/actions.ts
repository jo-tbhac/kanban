import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { failedCreateCheckListItem, failedUpdateCheckListItem } from '../../utils/text';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
import { CREATE_CHECK_LIST_ITEM, TOGGLE_CHECK } from './types';

export const createCheckListItem = (name: string, checkListId: number) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.post(`/check_list/${checkListId}/item`, { name });

    if (response?.status === 201) {
      const camelizedData = camelCaseKeys(response.data, { deep: true });
      dispatch({ type: CREATE_CHECK_LIST_ITEM, payload: camelizedData.checkListItem });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedCreateCheckListItem,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

export const toggleCheck = (check: boolean, itemId: number, checkListId: number) => (
  async (dispatch: AppDispatch) => {
    dispatch({ type: TOGGLE_CHECK, payload: { check, checkListId, itemId } });

    const axios = newAxios();
    const response = await axios.patch(`/check_list_item/${itemId}/check`, { check });

    if (response?.status !== 200) {
      dispatch({ type: TOGGLE_CHECK, payload: { check: !check, checkListId, itemId } });
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateCheckListItem,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
