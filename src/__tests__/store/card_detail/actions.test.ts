import { OPEN_CARD_DETAIL, CLOSE_CARD_DETAIL } from '../../../store/card_detail/types';
import { openCardDetail, closeCardDetail } from '../../../store/card_detail/actions';

describe('card detail actions', () => {
  test('returns an action with payload and type `OPEN_CARD_DETAIL`', () => {
    const target = { cardId: 1, listId: 2 };
    const action = openCardDetail(target);
    expect(action).toEqual({ type: OPEN_CARD_DETAIL, payload: target });
  });

  test('returns an action with type `CLOSE_CARD_DETAIL`', () => {
    const action = closeCardDetail();
    expect(action).toEqual({ type: CLOSE_CARD_DETAIL });
  });
});
