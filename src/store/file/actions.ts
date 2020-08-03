import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors, maxUploadFileSize } from '../../utils/utils';
import { dialogTypeError, DialogTypes, OPEN_DIALOG } from '../dialog/types';
import { AppDispatch } from '..';
import { failedUploadFile, shouldLessThanMaxFileSize } from '../../utils/text';
import { FETCH_FILES, UPLOAD_FILE } from './types';

export const fetchFiles = (boardId: number) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.get(`/board/${boardId}/files`);

  if (response?.status === 200) {
    const camelizedData = camelCaseKeys(response.data, { deep: true });
    dispatch({ type: FETCH_FILES, payload: camelizedData.files });
  }
};

export const uploadFile = (file: File, cardId: number) => async (dispatch: AppDispatch) => {
  if (file.size > maxUploadFileSize) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedUploadFile,
      description: shouldLessThanMaxFileSize,
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  const axios = newAxios();
  const requestConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
  const response = await axios.post(`/card/${cardId}/file`, formData, requestConfig);

  if (response?.status === 201) {
    const camelizedData = camelCaseKeys(response.data.file);
    dispatch({ type: UPLOAD_FILE, payload: camelizedData });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedUploadFile,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};
