import { REDIRECT_TO_BOARD_INDEX, INIT_REDIRECT_TO_BOARD_INDEX } from '../../../store/route/types';
import { redirectToBoardIndex, initRedirectToBoardIndex } from '../../../store/route/actions';

describe('route actions', () => {
  test('returns an action with type `REDIRECT_TO_BOARD_INDEX`', () => {
    const action = redirectToBoardIndex();
    expect(action).toEqual({ type: REDIRECT_TO_BOARD_INDEX });
  });

  test('returns an action with type `INIT_REDIRECT_TO_BOARD_INDEX`', () => {
    const action = initRedirectToBoardIndex();
    expect(action).toEqual({ type: INIT_REDIRECT_TO_BOARD_INDEX });
  });
});
