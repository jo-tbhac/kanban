import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  List,
  ListActionTypes,
} from './types';

import {
  CREATE_CARD,
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
    case CREATE_CARD: {
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
