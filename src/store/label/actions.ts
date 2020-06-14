import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { FETCH_ALL_LABEL } from './types';

// eslint-disable-next-line
export const fetchAllLabel = (boardID: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardID}/labels`);

  if (response?.status === 200) {
    dispatch({ type: FETCH_ALL_LABEL, payload: response.data.labels });
  }
};
