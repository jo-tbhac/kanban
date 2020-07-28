import {
  CREATE_CHECK_LIST_ITEM,
  TOGGLE_CHECK,
  CheckListItemActionTypes,
  CheckListItem,
} from './types';

const checkListItemReducer = (items: CheckListItem[], action: CheckListItemActionTypes) => {
  switch (action.type) {
    case CREATE_CHECK_LIST_ITEM:
      return {
        items: [...items, action.payload],
      };
    case TOGGLE_CHECK: {
      const { check, itemId } = action.payload;
      return {
        items: items.map((item) => (item.id === itemId ? { ...item, check } : item)),
      };
    }
    default:
      return { items };
  }
};

export default checkListItemReducer;
