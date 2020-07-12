import labelReducer from '../../../store/label/reducers';
import { CHECK_LABEL, UNCHECK_LABEL, LabelState } from '../../../store/label/types';

describe('label reducer', () => {
  let initialState: LabelState;

  beforeEach(() => {
    initialState = {
      labels: [],
      selectedLabelIds: [],
    };
  });

  test('returns state of `selectedLabelIds` that added an element upon dispatch an action `CHECK_LABEL`', () => {
    const payload = 1;
    const newState = labelReducer(undefined, { type: CHECK_LABEL, payload });
    expect(newState.selectedLabelIds).toHaveLength(1);
  });

  test('returns state of `selectedLabelIds` that removed an element upon dispatch an action `UNCHECK_LABEL`', () => {
    const payload = 2;
    const newState = labelReducer(
      { ...initialState, selectedLabelIds: [1, 2, 3] },
      { type: UNCHECK_LABEL, payload },
    );
    expect(newState.selectedLabelIds).toHaveLength(2);
    expect(newState.selectedLabelIds).not.toContain(payload);
  });
});
