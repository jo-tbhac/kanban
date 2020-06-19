import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  List,
  ListActionTypes,
} from './types';

const listReducer = (lists: List[], action: ListActionTypes) => {
  switch (action.type) {
    case CREATE_LIST:
      return {
        lists: [...lists, action.payload],
      };
    case UPDATE_LIST: {
      const updatedList = action.payload;
      const newLists = lists.map((list) => (list.id === updatedList.id ? updatedList : list));
      return {
        lists: newLists,
      };
    }
    case DELETE_LIST:
      return {
        lists: lists.filter((list) => list.id !== action.payload),
      };
    default:
      return {
        lists,
      };
  }
};

export default listReducer;
