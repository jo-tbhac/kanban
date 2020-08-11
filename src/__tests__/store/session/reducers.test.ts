import sessionReducer from '../../../store/session/reducers';
import { SIGN_IN, SIGN_OUT } from '../../../store/session/types';

describe('session reducers', () => {
  const initialState = {
    isSignIn: false,
    email: '',
    name: '',
  };

  test('returns state of `isSignIn: true` upon dispatch an action with type `SIGN_IN`', () => {
    const payload = { email: 'sample@sample.com', name: 'gopher' };
    const newState = sessionReducer(undefined, { type: SIGN_IN, payload });

    expect(newState.isSignIn).toBeTruthy();
    expect(newState.email).toBe(payload.email);
    expect(newState.name).toBe(payload.name);
  });

  test('returns state of `isSignIn: false` upon dispatch an action with type: `SIGN_OUT`', () => {
    const newState = sessionReducer({ ...initialState, isSignIn: true }, { type: SIGN_OUT });
    expect(newState.isSignIn).toBeFalsy();
  });
});
