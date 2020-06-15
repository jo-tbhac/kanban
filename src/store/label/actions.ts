import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { FETCH_ALL_LABEL, CREATE_LABEL } from './types';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { joinErrors } from '../../utils/utils';
import { failedCreateLabel } from '../../utils/text';

export const fetchAllLabel = (boardID: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardID}/labels`);

  if (response?.status === 200) {
    dispatch({ type: FETCH_ALL_LABEL, payload: response.data.labels });
  }
};

export const createLabel = (boardID: number, params: { name: string, color: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.post(`/board/${boardID}/label`, params);

    if (response?.status === 201) {
      dispatch({ type: CREATE_LABEL, payload: response.data.label });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedCreateLabel,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);
