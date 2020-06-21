import {
  FETCH_ALL_BOARDS,
  FETCH_BOARD,
  CREATE_BOARD,
  UPDATE_BOARD,
  BoardState,
  BoardActionTypes,
} from './types';

import {
  CREATE_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  ListActionTypes,
} from '../list/types';

import { CREATE_CARD, UPDATE_CARD, CardActionTypes } from '../card/types';
import listReducer from '../list/reducers';

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

const boardReducer = (
  state = initialState,
  action: BoardActionTypes | ListActionTypes | CardActionTypes,
): BoardState => {
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
    case CREATE_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
        selectedBoard: action.payload,
      };
    case UPDATE_BOARD: {
      const newSelectedBoard = { ...state.selectedBoard, name: action.payload.name };
      return {
        ...state,
        selectedBoard: newSelectedBoard,
      };
    }
    case CREATE_LIST:
    case UPDATE_LIST:
    case DELETE_LIST:
    case CREATE_CARD:
    case UPDATE_CARD: {
      const { lists } = listReducer(state.selectedBoard.lists, action);
      return {
        ...state,
        selectedBoard: { ...state.selectedBoard, lists },
      };
    }
    default:
      return state;
  }
};

export default boardReducer;
