import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { signUp, signIn } from '../../../store/session/actions';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedSignUpTitle, failedSignInTitle } from '../../../utils/text';

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
    mock.onPost('/user').reply(201, { token: 'sjmifhsngbiouncf' });

    return store.dispatch(signUp(signUpParams))
      .then(() => {
        const { session } = store.getState();
        expect(session.isSignIn).toBeTruthy();
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
    mock.onPost('/session').reply(200, { token: 'sjmifhsngbiouncf' });

    return store.dispatch(signIn(signInParams))
      .then(() => {
        const { session } = store.getState();
        expect(session.isSignIn).toBeTruthy();
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
});
