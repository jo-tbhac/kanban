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
  ATTACH_LABEL,
  DETACH_LABEL,
  CardActionTypes,
} from '../card/types';

import cardReducer from '../card/reducers';

const listReducer = (lists: List[] = [], action: ListActionTypes | CardActionTypes) => {
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
    case ATTACH_LABEL:
    case DETACH_LABEL: {
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
    default:
      return {
        lists,
      };
  }
};

export default listReducer;
