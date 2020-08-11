import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import snakeCaseKeys from 'snakecase-keys';

import { storeFactory } from '../../../testUtils';
import { dialogTypeError } from '../../../store/dialog/types';
import {
  fetchAuthState,
  signIn,
  signUp,
  signOut,
} from '../../../store/session/actions';

import {
  failedSignUpTitle,
  failedSignInTitle,
  unAuthorizationTitle,
  failedSignOutTitle,
} from '../../../utils/text';

describe('session actions with thunk', () => {
  let store: any;
  let mock: MockAdapter;

  const signUpParams = {
    name: 'sample',
    email: 'sample@sample.com',
    password: 'password',
    passwordConfirmation: 'password',
  };

  const signInParams = {
    email: 'sample@sample.com',
    password: 'password',
  };

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('returns state `isSignIn: true` upon dispatch an action `signUp` and recieved status 201 from server', () => {
    const responseData = {
      token: 'sjmifhsngbiouncf',
      refreshToken: 'oeijrnsoe-wer9m4aoe',
      email: signUpParams.email,
      name: signUpParams.name,
    };

    const snakeCaseParams = snakeCaseKeys(responseData);

    mock.onPost('/user').reply(201, snakeCaseParams);
    mock.onPatch('/session').reply(200, { ok: true });

    return store.dispatch(signUp(signUpParams))
      .then(() => {
        const { session } = store.getState();
        expect(session.isSignIn).toBeTruthy();
        expect(session.email).toBe(responseData.email);
        expect(session.name).toBe(responseData.name);
      });
  });

  test('returns state of dialogProps upon dispatch an action `signUp` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPost('/user').reply(400, responseData);

    return store.dispatch(signUp(signUpParams))
      .then(() => {
        const { session, dialog } = store.getState();
        expect(session.isSignIn).toBeFalsy();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedSignUpTitle);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `isSignIn: true` upon dispatch an action `signIn` and recieved status 200 from server', () => {
    const responseData = {
      token: 'sjmifhsngbiouncf',
      refreshToken: 'oeijrnsoe-wer9m4aoe',
      email: 'sample@sample.com',
      name: 'tester',
    };

    const snakeCaseParams = snakeCaseKeys(responseData);

    mock.onPost('/session').reply(200, snakeCaseParams);
    mock.onPatch('/session').reply(200, { ok: true });

    return store.dispatch(signIn(signInParams))
      .then(() => {
        const { session } = store.getState();
        expect(session.isSignIn).toBeTruthy();
        expect(session.email).toBe(responseData.email);
        expect(session.name).toBe(responseData.name);
      });
  });

  test('returns state of dialogProps upon dispatch an action `signIn` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPost('/session').reply(400, responseData);

    return store.dispatch(signIn(signInParams))
      .then(() => {
        const { session, dialog } = store.getState();
        expect(session.isSignIn).toBeFalsy();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedSignInTitle);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('returns state `isSignIn: true` if returns `ok: true` as response data upon dispatch an action `fetchAuthState`', () => {
    const responseData = {
      ok: true,
      email: 'sample@sample.com',
      name: 'tester',
      token: 'jfmsoeoif',
      refreshToken: 'siejosie;me',
      expiresIn: 12000, // 2 min
    };

    const snakeCaseData = snakeCaseKeys(responseData);

    mock.onPatch('/session').reply(200, snakeCaseData);

    return store.dispatch(fetchAuthState() as any)
      .then(() => {
        const { session, loading } = store.getState();
        expect(session.isSignIn).toBeTruthy();
        expect(loading.isLoading).toBeFalsy();
        expect(session.email).toBe(responseData.email);
        expect(session.name).toBe(responseData.name);
      });
  });

  test('returns state `isSignIn: false` if returns `ok: false` as response data upon dispatch an action `fetchAuthState`', () => {
    const responseData = { ok: false };

    mock.onPatch('/session').reply(200, responseData);

    return store.dispatch(fetchAuthState() as any)
      .then(() => {
        const { session, loading } = store.getState();
        expect(session.isSignIn).toBeFalsy();
        expect(loading.isLoading).toBeFalsy();
      });
  });

  test('returns state of dialogProps upon dispatch an action `fetchAuthState` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onPatch('/session').reply(400, responseData);

    return store.dispatch(fetchAuthState() as any)
      .then(() => {
        const { session, dialog, loading } = store.getState();
        expect(session.isSignIn).toBeFalsy();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(unAuthorizationTitle);
        expect(dialog.description).toBe('some error...');
        expect(loading.isLoading).toBeFalsy();
      });
  });

  test('returns state of `isSignIn: false` upon dispatch an action `signOut`', () => {
    mock.onDelete('/session').reply(200);

    return store.dispatch(signOut() as any)
      .then(() => {
        const { session } = store.getState();
        expect(session.isSignIn).toBeFalsy();
        expect(session.email).toBe('');
        expect(session.name).toBe('');
      });
  });

  test('returns state of dialogProps upon dispatch an action `signOut` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    mock.onDelete('/session').reply(400, responseData);

    return store.dispatch(signOut() as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedSignOutTitle);
        expect(dialog.description).toBe('some error...');
      });
  });
});
