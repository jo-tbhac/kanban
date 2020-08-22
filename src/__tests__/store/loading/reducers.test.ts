import loadingReducer from '../../../store/loading/reducers';
import { LOAD_START, LOAD_END, READY } from '../../../store/loading/types';

describe('loading reducers', () => {
  const initialState = {
    ready: false,
    isLoading: false,
  };

  test('returns state of `isLoading: true` upon dispatch an action with type `LOAD_START`', () => {
    const newState = loadingReducer(initialState, { type: LOAD_START });
    expect(newState.isLoading).toBeTruthy();
  });

  test('returns state of `isLoading: false` upon dispatch an action with type `LOAD_END`', () => {
    const newState = loadingReducer({ ...initialState, isLoading: true }, { type: LOAD_END });
    expect(newState.isLoading).toBeFalsy();
  });

  test('returns state of `ready: true` upon dispatch an action with type `READY`', () => {
    const newState = loadingReducer(initialState, { type: READY });
    expect(newState.ready).toBeTruthy();
  });
});
