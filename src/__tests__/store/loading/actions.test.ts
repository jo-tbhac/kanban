import { LOAD_START, LOAD_END } from '../../../store/loading/types';
import { loadStart, loadEnd } from '../../../store/loading/actions';

describe('loading actions', () => {
  test('returns an action with type `LOAD_START`', () => {
    const action = loadStart();
    expect(action).toEqual({ type: LOAD_START });
  });

  test('returns an action with type `LOAD_END`', () => {
    const action = loadEnd();
    expect(action).toEqual({ type: LOAD_END });
  });
});
