import { LOAD_END } from '../../../store/loading/types';
import { loadEnd } from '../../../store/loading/actions';

describe('loading actions', () => {
  test('returns an action with type `LOAD_END`', () => {
    const action = loadEnd();
    expect(action).toEqual({ type: LOAD_END });
  });
});
