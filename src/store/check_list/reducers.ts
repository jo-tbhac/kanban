import {
  CREATE_CHECK_LIST,
  CheckListState,
  CheckListActionTypes,
} from './types';

const initialState: CheckListState = {
  checkLists: [],
};

const checkListReducer = (state = initialState, action: CheckListActionTypes) => {
  switch (action.type) {
    case CREATE_CHECK_LIST:
      return {
        ...state,
        checkLists: [...state.checkLists, action.payload],
      };
    default:
      return state;
  }
};

export default checkListReducer;
