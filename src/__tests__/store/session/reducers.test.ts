import sessionReducer from '../../../store/session/reducers';
import { SIGN_IN, SIGN_OUT } from '../../../store/session/types';

describe('session reducers', () => {
  test('returns state of `isSignIn: true` upon dispatch an action with type `SIGN_IN`', () => {
    const newState = sessionReducer(undefined, { type: SIGN_IN });
    expect(newState.isSignIn).toBeTruthy();
  });

  test('returns state of `isSignIn: false` upon dispatch an action with type: `SIGN_OUT`', () => {
    const newState = sessionReducer({ isSignIn: true }, { type: SIGN_OUT });
    expect(newState.isSignIn).toBeFalsy();
  });
});
