import {
  CREATE_CHECK_LIST_ITEM,
  TOGGLE_CHECK,
  UPDATE_CHECK_LIST_ITEM,
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
    case UPDATE_CHECK_LIST_ITEM: {
      const { name, itemId } = action.payload;
      return {
        items: items.map((item) => (item.id === itemId ? { ...item, name } : item)),
      };
    }
    default:
      return { items };
  }
};

export default checkListItemReducer;
