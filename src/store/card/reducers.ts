import {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  ATTACH_LABEL,
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
    case DELETE_CARD:
      return {
        cards: cards.filter((card) => card.id !== action.payload.cardId),
      };
    case ATTACH_LABEL: {
      const targetCard = cards.find((card) => card.id === action.payload.cardId);
      if (targetCard === undefined) {
        return { cards };
      }

      const previousLabels = targetCard.labels ? targetCard.labels : [];
      targetCard.labels = [...previousLabels, { id: action.payload.labelId }];
      return {
        cards: cards.map((card) => (card.id === targetCard.id ? targetCard : card)),
      };
    }
    default:
      return {
        cards,
      };
  }
};

export default cardReducer;
