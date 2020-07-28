import {
  FETCH_CHECK_LISTS,
  CREATE_CHECK_LIST,
  UPDATE_CHECK_LIST,
  DELETE_CHECK_LIST,
  CheckListState,
  CheckListActionTypes,
} from './types';

import checkListItemReducer from '../check_list_item/reducers';
import {
  CREATE_CHECK_LIST_ITEM,
  TOGGLE_CHECK,
  CheckListItemActionTypes,
} from '../check_list_item/types';

const initialState: CheckListState = {
  checkLists: [],
};

const checkListReducer = (
  state = initialState,
  action: CheckListActionTypes | CheckListItemActionTypes,
) => {
  switch (action.type) {
    case FETCH_CHECK_LISTS:
      return {
        ...state,
        checkLists: action.payload,
      };
    case CREATE_CHECK_LIST:
      return {
        ...state,
        checkLists: [...state.checkLists, action.payload],
      };
    case UPDATE_CHECK_LIST: {
      const { checkListId, title } = action.payload;
      return {
        ...state,
        checkLists: state.checkLists.map((checkList) => (
          checkList.id === checkListId ? { ...checkList, title } : checkList
        )),
      };
    }
    case DELETE_CHECK_LIST:
      return {
        ...state,
        checkLists: state.checkLists.filter((checkList) => checkList.id !== action.payload),
      };
    case CREATE_CHECK_LIST_ITEM:
    case TOGGLE_CHECK: {
      const { checkListId } = action.payload;
      const targetCheckList = state.checkLists.find((checkList) => checkList.id === checkListId);

      if (!targetCheckList) {
        return state;
      }

      const { items } = checkListItemReducer(targetCheckList.items, action);
      return {
        ...state,
        checkLists: state.checkLists.map((checkList) => (
          checkList.id === checkListId ? { ...checkList, items } : checkList
        )),
      };
    }
    default:
      return state;
  }
};

export default checkListReducer;
