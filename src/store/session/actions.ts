import snakeCaseKeys from 'snakecase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { AppDispatch } from '..';
import { SignUpParams, SignInParams, SIGN_IN } from './types';
import { DialogTypes, OPEN_DIALOG, dialogTypeError } from '../dialog/types';
import { failedSignUpTitle, failedSignInTitle } from '../../utils/text';

export const signUp = (params: SignUpParams) => async (dispatch: AppDispatch) => {
  const snakeCaseParams = snakeCaseKeys(params);
  const axios = newAxios();
  const response = await axios.post('/user', snakeCaseParams).catch((error) => error.response);

  if (response?.status === 201) {
    sessionStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedSignUpTitle,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};

export const signIn = (params: SignInParams) => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.post('/session', params).catch((error) => error.response);

  if (response?.status === 200) {
    sessionStorage.setItem('token', response.data.token);
    dispatch({ type: SIGN_IN });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedSignInTitle,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};
