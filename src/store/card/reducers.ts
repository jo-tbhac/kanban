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

import {
  CREATE_COVER,
  UPDATE_COVER,
  DELETE_COVER,
  CoverActionTypes,
} from '../cover/types';

const cardReducer = (cards: Card[], action: CardActionTypes | CoverActionTypes) => {
  switch (action.type) {
    case CREATE_CARD:
      return {
        cards: [...cards, action.payload],
      };
    case UPDATE_CARD:
      return {
        cards: cards.map((card) => (
          card.id === action.payload.id
            ? { ...action.payload, labels: card.labels, cover: card.cover }
            : card
        )),
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
      const newCard = {
        ...targetCard,
        labels: [...previousLabels, { id: action.payload.labelId }],
      };
      return {
        cards: cards.map((card) => (card.id === newCard.id ? newCard : card)),
      };
    }
    case DETACH_LABEL: {
      const targetCard = cards.find((card) => card.id === action.payload.cardId);
      if (targetCard === undefined) {
        return { cards };
      }
      const newCard = {
        ...targetCard,
        labels: targetCard.labels.filter((label) => label.id !== action.payload.labelId),
      };

      return {
        cards: cards.map((card) => (card.id === newCard.id ? newCard : card)),
      };
    }
    case CREATE_COVER:
    case UPDATE_COVER: {
      const targetCard = cards.find((card) => card.id === action.payload.cover.cardId);
      if (targetCard === undefined) {
        return { cards };
      }
      const newCard = { ...targetCard, cover: action.payload.cover };
      return {
        cards: cards.map((card) => (card.id === newCard.id ? newCard : card)),
      };
    }
    case DELETE_COVER: {
      const targetCard = cards.find((card) => card.id === action.payload.cardId);
      if (targetCard === undefined) {
        return { cards };
      }
      const newCard = { ...targetCard, cover: null };
      return {
        cards: cards.map((card) => (card.id === newCard.id ? newCard : card)),
      };
    }
    default:
      return {
        cards,
      };
  }
};

export default cardReducer;
