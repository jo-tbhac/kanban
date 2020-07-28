import { CREATE_CHECK_LIST_ITEM, CheckListItemActionTypes, CheckListItem } from './types';

const checkListItemReducer = (items: CheckListItem[], action: CheckListItemActionTypes) => {
  switch (action.type) {
    case CREATE_CHECK_LIST_ITEM:
      return {
        items: [...items, action.payload],
      };
    default:
      return { items };
  }
};

export default checkListItemReducer;
