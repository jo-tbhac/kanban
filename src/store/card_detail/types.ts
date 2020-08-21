export const OPEN_CARD_DETAIL = 'OPEN_CARD_DETAIL';
export const CLOSE_CARD_DETAIL = 'CLOSE_CARD_DETAIL';

export interface CardDetailTarget {
  cardId: number
  listId: number
}

export interface CardDetailState {
  isDetailVisible: boolean
  target: CardDetailTarget
}

interface OpenCardDetailAction {
  type: typeof OPEN_CARD_DETAIL
  payload: CardDetailTarget
}

interface CloseCardDetailAction {
  type: typeof CLOSE_CARD_DETAIL
}

export type CardDetailActionTypes = OpenCardDetailAction | CloseCardDetailAction;
