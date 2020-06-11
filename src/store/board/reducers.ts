import {
  SHOW_BOARD_INDEX,
  SHOW_BOARD,
  FETCH_ALL_BOARDS,
  BoardState,
  BoardActionTypes,
} from './types';

const initialBoardProps = {
  id: 0,
  name: '',
  updatedAt: '',
  lists: [],
};

const initialState: BoardState = {
  isIndexVisible: true,
  boards: [],
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
    case FETCH_ALL_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    default:
      return state;
  }
};

export default boardReducer;
