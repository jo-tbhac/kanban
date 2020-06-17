import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { CREATE_LIST, UPDATE_LIST } from './types';
import { joinErrors } from '../../utils/utils';
import { failedCreateList, failedUpdateList } from '../../utils/text';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';

export const createList = (boardID: number, params: { name: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.post(`/board/${boardID}/list`, params);

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

export const updateList = (listID: number, params: { name: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.patch(`list/${listID}`, params);

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
