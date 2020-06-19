import { CREATE_CARD, Card, CardActionTypes } from './types';

const cardReducer = (cards: Card[], action: CardActionTypes) => {
  switch (action.type) {
    case CREATE_CARD:
      return {
        cards: [...cards, action.payload],
      };
    default:
      return {
        cards,
      };
  }
};

export default cardReducer;
