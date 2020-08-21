import cardDetailReducer from '../../../store/card_detail/reducers';
import { OPEN_CARD_DETAIL, CLOSE_CARD_DETAIL, CardDetailState } from '../../../store/card_detail/types';

describe('card detail reducers', () => {
  let initialState: CardDetailState;

  beforeEach(() => {
    initialState = {
      isDetailVisible: false,
      target: { cardId: 0, listId: 0 },
    };
  });

  test('returns state of `target` and `isDetailVisible: true` upon dispatch an action with type `OPEN_CARD_DETAIL`', () => {
    const target = { cardId: 1, listId: 2 };
    const newState = cardDetailReducer(initialState, { type: OPEN_CARD_DETAIL, payload: target });
    expect(newState.isDetailVisible).toBeTruthy();
    expect(newState.target).toEqual(target);
  });

  test('returns state of `isDetailVisible: false` upon dispatch an action with type `CLOSE_CARD_DETAIL`', () => {
    const newState = cardDetailReducer(
      { ...initialState, isDetailVisible: true },
      { type: CLOSE_CARD_DETAIL },
    );
    expect(newState.isDetailVisible).toBeFalsy();
  });
});
