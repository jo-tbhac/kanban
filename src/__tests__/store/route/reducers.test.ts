import routeReducer from '../../../store/route/reducers';
import { REDIRECT_TO_BOARD_INDEX, INIT_REDIRECT_TO_BOARD_INDEX, RouteState } from '../../../store/route/types';

describe('route reducers', () => {
  const initialState: RouteState = {
    isRedirectToBoardIndex: false,
  };

  test('returns state of `isRedirectToBoardIndex: true` upon dispatch an action with type `REDIRECT_TO_BOARD_INDEX`', () => {
    const newState = routeReducer(initialState, { type: REDIRECT_TO_BOARD_INDEX });
    expect(newState.isRedirectToBoardIndex).toBeTruthy();
  });

  test('returns state of `isRedirectToBoardIndex: false` upon dispatch an action with type `INIT_REDIRECT_TO_BOARD_INDEX`', () => {
    const newState = routeReducer(
      { ...initialState, isRedirectToBoardIndex: true },
      { type: INIT_REDIRECT_TO_BOARD_INDEX },
    );
    expect(newState.isRedirectToBoardIndex).toBeFalsy();
  });
});
