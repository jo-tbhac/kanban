import {
  CREATE_LIST,
  UPDATE_LIST,
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
    default:
      return {
        lists,
      };
  }
};

export default listReducer;
