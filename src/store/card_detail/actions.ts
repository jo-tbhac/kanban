import { OPEN_CARD_DETAIL, CLOSE_CARD_DETAIL, CardDetailTarget } from './types';

export const openCardDetail = (payload: CardDetailTarget) => ({
  type: OPEN_CARD_DETAIL,
  payload,
});

export const closeCardDetail = () => ({
  type: CLOSE_CARD_DETAIL,
});
