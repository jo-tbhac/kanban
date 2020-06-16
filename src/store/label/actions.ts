import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { joinErrors } from '../../utils/utils';
import { failedCreateLabel, failedUpdateLabel, failedDeleteLabel } from '../../utils/text';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import {
  FETCH_ALL_LABEL,
  CREATE_LABEL,
  UPDATE_LABEL,
  DELETE_LABEL,
} from './types';

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

export const updateLabel = (labelID: number, params: { name: string, color: string }) => (
  async (dispatch: AppDispatch) => {
    const axios = newAxios();
    const response = await axios.patch(`/label/${labelID}`, params);

    if (response?.status === 200) {
      dispatch({ type: UPDATE_LABEL, payload: response.data.label });
      return;
    }

    if (response?.status === 400) {
      const dialogProps = {
        type: dialogTypeError as DialogTypes,
        title: failedUpdateLabel,
        description: joinErrors(response.data.errors),
      };
      dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    }
  }
);

export const deleteLabel = (labelID: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.delete(`/label/${labelID}`);

  if (response?.status === 200) {
    dispatch({ type: DELETE_LABEL, payload: labelID });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedDeleteLabel,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};
