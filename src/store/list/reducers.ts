import { CREATE_LIST, List, ListActionTypes } from './types';

const listReducer = (lists: List[], action: ListActionTypes) => {
  switch (action.type) {
    case CREATE_LIST:
      return {
        lists: [...lists, action.payload],
      };
    default:
      return {
        lists,
      };
  }
};

export default listReducer;
