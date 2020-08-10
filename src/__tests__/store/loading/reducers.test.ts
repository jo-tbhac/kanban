import loadingReducer from '../../../store/loading/reducers';
import { LOAD_END } from '../../../store/loading/types';

describe('loading reducers', () => {
  test('returns state of `isLoading: false` upon dispatch an action with type `LOAD_END`', () => {
    const newState = loadingReducer(undefined, { type: LOAD_END });
    expect(newState.isLoading).toBeFalsy();
  });
});
