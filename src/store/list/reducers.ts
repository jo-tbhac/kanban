import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  MOVE_LIST,
  List,
  ListActionTypes,
} from './types';

import {
  CREATE_CARD,
  UPDATE_CARD,
  DELETE_CARD,
  MOVE_CARD,
  MOVE_CARD_ACROSS_LIST,
  MOVE_CARD_TO_EMPTY_LIST,
  ATTACH_LABEL,
  DETACH_LABEL,
  CardActionTypes,
} from '../card/types';

import {
  CREATE_COVER,
  UPDATE_COVER,
  DELETE_COVER,
  CoverActionTypes,
} from '../cover/types';

import cardReducer from '../card/reducers';

const listReducer = (
  lists: List[] = [],
  action: ListActionTypes | CardActionTypes | CoverActionTypes,
) => {
  switch (action.type) {
    case CREATE_LIST:
      return {
        lists: [...lists, { ...action.payload, cards: [] }],
      };
    case UPDATE_LIST: {
      const updatedList = action.payload;
      const newLists = lists.map((list) => (
        list.id === updatedList.id ? { ...list, name: updatedList.name } : list
      ));
      return {
        lists: newLists,
      };
    }
    case DELETE_LIST:
      return {
        lists: lists.filter((list) => list.id !== action.payload),
      };
    case MOVE_LIST: {
      const { dragId, dropId } = action.payload;
      const dropIndex = lists.findIndex((list) => list.id === dropId);
      const dragIndex = lists.findIndex((list) => list.id === dragId);

      const sortedLists = lists.map((list, index) => {
        if (dropIndex === index) {
          return { ...lists[dragIndex], index };
        }

        if (dropIndex < index && index <= dragIndex) {
          return { ...lists[index - 1], index };
        }

        if (dragIndex <= index && index < dropIndex) {
          return { ...lists[index + 1], index };
        }

        return { ...list, index };
      });

      return {
        lists: sortedLists,
      };
    }
    case CREATE_CARD:
    case UPDATE_CARD:
    case DELETE_CARD:
    case MOVE_CARD:
    case ATTACH_LABEL:
    case DETACH_LABEL:
    case CREATE_COVER:
    case UPDATE_COVER:
    case DELETE_COVER: {
      const targetList = lists.find((list) => list.id === action.payload.listId);
      if (targetList === undefined) {
        return { lists };
      }

      const { cards } = cardReducer(targetList.cards, action);
      return {
        lists: lists.map((list) => (
          list.id === targetList.id ? { ...targetList, cards } : list
        )),
      };
    }
    case MOVE_CARD_ACROSS_LIST:
    case MOVE_CARD_TO_EMPTY_LIST: {
      const { dragListId, dropListId, dragId } = action.payload;
      const dropTargetList = lists.find((list) => list.id === dropListId);
      const dragList = lists.find((list) => list.id === dragListId);

      if (!dropTargetList || !dragList) {
        return { lists };
      }

      const dragCardIndex = dragList.cards.findIndex((card) => card.id === dragId);
      const dragListCards = dragList.cards.filter((card, index) => {
        if (card.id === dragId) {
          return false;
        }

        if (index < dragCardIndex) {
          return true;
        }
        // eslint-disable-next-line no-param-reassign
        card.index = index - 1;
        return true;
      });

      const dragCard = dragList.cards.find((card) => card.id === dragId);
      if (!dragCard) {
        return { lists };
      }

      if (action.type === MOVE_CARD_TO_EMPTY_LIST) {
        const newLists = lists.map((list) => {
          if (list.id === dragListId) {
            return { ...list, cards: dragListCards };
          }
          if (list.id === dropListId) {
            return { ...list, cards: [{ ...dragCard, listId: dropListId, index: 0 }] };
          }
          return list;
        });
        return {
          lists: newLists,
        };
      }

      const { dropId } = action.payload;
      const dropTargetIndex = dropTargetList.cards.findIndex((card) => card.id === dropId);
      const dropListCards = [...dropTargetList.cards, dragCard].map((card, index) => {
        if (index === dropTargetIndex) {
          return { ...dragCard, index, listId: dropListId };
        }

        if (index <= dropTargetIndex) {
          return { ...card, index };
        }

        return { ...dropTargetList.cards[index - 1], index };
      });

      const newLists = lists.map((list) => {
        if (list.id === dragListId) {
          return { ...list, cards: dragListCards };
        }
        if (list.id === dropListId) {
          return { ...list, cards: dropListCards };
        }
        return list;
      });
      return {
        lists: newLists,
      };
    }
    default:
      return {
        lists,
      };
  }
};

export default listReducer;
