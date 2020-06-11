import {
  FETCH_ALL_BOARDS,
  FETCH_BOARD,
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
  boards: [],
  selectedBoard: initialBoardProps,
};

const boardReducer = (state = initialState, action: BoardActionTypes): BoardState => {
  switch (action.type) {
    case FETCH_ALL_BOARDS:
      return {
        ...state,
        boards: action.payload,
        selectedBoard: initialBoardProps,
      };
    case FETCH_BOARD:
      return {
        ...state,
        selectedBoard: action.payload,
      };
    default:
      return state;
  }
};

export default boardReducer;
