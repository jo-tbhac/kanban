import {
  FETCH_CHECK_LISTS,
  CREATE_CHECK_LIST,
  UPDATE_CHECK_LIST,
  CheckListState,
  CheckListActionTypes,
} from './types';

const initialState: CheckListState = {
  checkLists: [],
};

const checkListReducer = (state = initialState, action: CheckListActionTypes) => {
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
    default:
      return state;
  }
};

export default checkListReducer;
