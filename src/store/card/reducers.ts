import {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  MOVE_CARD,
  ATTACH_LABEL,
  DETACH_LABEL,
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
    case MOVE_CARD: {
      const { dragId, dropId } = action.payload;
      const dropIndex = cards.findIndex((card) => card.id === dropId);
      const dragIndex = cards.findIndex((card) => card.id === dragId);

      const sortedCards = cards.map((card, index) => {
        if (dropIndex === index) {
          return { ...cards[dragIndex], index };
        }

        if (dropIndex < index && index <= dragIndex) {
          return { ...cards[index - 1], index };
        }

        if (dragIndex <= index && index < dropIndex) {
          return { ...cards[index + 1], index };
        }

        return { ...card, index };
      });
      return {
        cards: sortedCards,
      };
    }
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
    case DETACH_LABEL: {
      const targetCard = cards.find((card) => card.id === action.payload.cardId);
      if (targetCard === undefined) {
        return { cards };
      }
      targetCard.labels = targetCard.labels.filter((label) => label.id !== action.payload.labelId);

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
