import {
  OPEN_CARD_DETAIL,
  CLOSE_CARD_DETAIL,
  CardDetailState,
  CardDetailActionTypes,
} from './types';

const initialState: CardDetailState = {
  isDetailVisible: false,
  target: { cardId: 0, listId: 0 },
};

const cardDetailReducer = (state = initialState, action: CardDetailActionTypes) => {
  switch (action.type) {
    case OPEN_CARD_DETAIL:
      return {
        ...state,
        isDetailVisible: true,
        target: action.payload,
      };
    case CLOSE_CARD_DETAIL:
      return {
        ...state,
        isDetailVisible: false,
      };
    default:
      return state;
  }
};

export default cardDetailReducer;
