import {
  SHOW_BOARD_INDEX,
  BoardState,
  BoardActionTypes,
} from './types';

const initialState: BoardState = {
  isIndexVisible: true,
};

const boardReducer = (state = initialState, action: BoardActionTypes) => {
  switch (action.type) {
    case SHOW_BOARD_INDEX:
      return {
        ...state,
        isIndexVisible: true,
      };
    default:
      return state;
  }
};

export default boardReducer;
