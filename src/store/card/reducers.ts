import {
  CREATE_CARD,
  UPDATE_CARD,
  Card,
  CardActionTypes,
} from './types';

const cardReducer = (cards: Card[], action: CardActionTypes) => {
  switch (action.type) {
    case CREATE_CARD:
      return {
        cards: [...cards, action.payload],
      };
    case UPDATE_CARD:
      return {
        cards: cards.map((card) => (card.id === action.payload.id ? action.payload : card)),
      };
    default:
      return {
        cards,
      };
  }
};

export default cardReducer;
