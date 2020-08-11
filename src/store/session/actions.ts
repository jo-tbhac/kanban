import snakeCaseKeys from 'snakecase-keys';
import camelCaseKeys from 'camelcase-keys';

import { newAxios } from '../../configureAxios';
import { joinErrors } from '../../utils/utils';
import { AppDispatch } from '..';
import { DialogTypes, OPEN_DIALOG, dialogTypeError } from '../dialog/types';
import {
  failedSignUpTitle,
  failedSignInTitle,
  unAuthorizationTitle,
  failedSignOutTitle,
} from '../../utils/text';

import { LOAD_END } from '../loading/types';
import {
  SignUpParams,
  SignInParams,
  SIGN_IN,
  SIGN_OUT,
} from './types';

let timerId: NodeJS.Timeout;

const onRefreshToken = (expiresIn: number) => {
  // it call function for 1 min before token will get expired.
  const timer = expiresIn - (60 * 1000);

  timerId = setTimeout(async () => {
    const axios = newAxios();
    const refreshToken = localStorage.getItem('refresh_token');
    const snakeCaseParams = snakeCaseKeys({ refreshToken });
    const response = await axios.patch('/session', snakeCaseParams);

    if (response?.status === 200) {
      if (response.data.ok) {
        const camelizedData = camelCaseKeys(response.data);
        localStorage.setItem('token', camelizedData.accessToken);
        localStorage.setItem('refresh_token', camelizedData.refreshToken);
        onRefreshToken(camelizedData.expiresIn);
      }
    }
  }, timer);
};

export const signUp = (params: SignUpParams) => async (dispatch: AppDispatch) => {
  const snakeCaseParams = snakeCaseKeys(params);
  const axios = newAxios();
  const response = await axios.post('/user', snakeCaseParams).catch((error) => error.response);

  if (response?.status === 201) {
    const camelizedData = camelCaseKeys(response.data);
    const {
      accessToken,
      refreshToken,
      name,
      email,
    } = camelizedData;

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    onRefreshToken(camelizedData.expiresIn);
    dispatch({ type: SIGN_IN, payload: { email, name } });
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
    const camelizedData = camelCaseKeys(response.data);
    const {
      accessToken,
      refreshToken,
      name,
      email,
    } = camelizedData;

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    onRefreshToken(camelizedData.expiresIn);
    dispatch({ type: SIGN_IN, payload: { email, name } });
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

export const fetchAuthState = () => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const previousRefreshToken = localStorage.getItem('refresh_token');
  const snakeCaseParams = snakeCaseKeys({ refreshToken: previousRefreshToken });

  const response = await axios.patch('/session', snakeCaseParams);

  if (response?.status === 200) {
    if (!response.data.ok) {
      dispatch({ type: LOAD_END });
      return;
    }

    const camelizedData = camelCaseKeys(response.data);
    const {
      accessToken,
      refreshToken,
      name,
      email,
    } = camelizedData;

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    onRefreshToken(camelizedData.expiresIn);
    dispatch({ type: SIGN_IN, payload: { email, name } });
    dispatch({ type: LOAD_END });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: unAuthorizationTitle,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
    dispatch({ type: LOAD_END });
  }
};

export const signOut = () => async (dispatch: AppDispatch) => {
  const axios = newAxios();
  const response = await axios.delete('/session');

  if (response?.status === 200) {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');

    clearTimeout(timerId);
    dispatch({ type: SIGN_OUT });
    return;
  }

  if (response?.status === 400) {
    const dialogProps = {
      type: dialogTypeError as DialogTypes,
      title: failedSignOutTitle,
      description: joinErrors(response.data.errors),
    };
    dispatch({ type: OPEN_DIALOG, payload: dialogProps });
  }
};
