import {
  SHOW_BOARD_INDEX,
  SHOW_BOARD,
  BoardState,
  BoardActionTypes,
} from './types';

const initialBoardProps = {
  id: 0,
  title: '',
  updatedAt: '',
  lists: [],
};

const initialState: BoardState = {
  isIndexVisible: true,
  selectedBoard: initialBoardProps,
};

const boardReducer = (state = initialState, action: BoardActionTypes): BoardState => {
  switch (action.type) {
    case SHOW_BOARD_INDEX:
      return {
        ...state,
        isIndexVisible: true,
      };
    case SHOW_BOARD:
      return {
        ...state,
        isIndexVisible: false,
        selectedBoard: action.payload,
      };
    default:
      return state;
  }
};

export default boardReducer;
