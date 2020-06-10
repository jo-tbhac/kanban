import snakeCaseKeys from 'snakecase-keys';

import { newAxios } from '../../configureAxios';
import { AppDispatch } from '..';
import { SignUpParams, SIGN_IN } from './types';
import {
  DialogTypes,
  OPEN_DIALOG,
  dialogInternalServerError,
  dialogTypeError,
} from '../dialog/types';

import { failedSignUpTitle } from '../../utils/text';

export const signUp = (params: SignUpParams) => async (dispatch: AppDispatch) => {
  const snakeCaseParams = snakeCaseKeys(params);
  const axios = newAxios();

  const response = await axios.post('/user', snakeCaseParams).catch((error) => error.response);

  if (response === undefined) {
    dispatch({ type: OPEN_DIALOG, payload: dialogInternalServerError });
    return;
  }

  if (response.status !== 201) {
    const errors = response.data.errors.map((error: {text: string}) => error.text);
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedSignUpTitle,
      description: errors.join('\n'),
    };

    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    return;
  }

  sessionStorage.setItem('token', response.token);
  dispatch({ type: SIGN_IN });
};

export const signIn = () => () => {

};
