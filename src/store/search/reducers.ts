import {
  SEARCH_CARD,
  CLEAR_SEARCH_CARD_POOL,
  ON_CHANGE_SEARCH_CARD_KEYWORD,
  SEARCH_BOARD,
  CLEAR_SEARCH_BOARD_POOL,
  ON_CHANGE_SEARCH_BOARD_KEYWORD,
  SearchActionTypes,
  SearchState,
} from './types';

const initialState: SearchState = {
  cardIds: [],
  cardKeyword: '',
  isSearching: false,
  boardIds: [],
  boardKeyword: '',
};

const searchReducer = (state = initialState, action: SearchActionTypes) => {
  switch (action.type) {
    case SEARCH_CARD:
      return {
        ...state,
        cardIds: action.payload,
        isSearching: false,
      };
    case CLEAR_SEARCH_CARD_POOL:
      return {
        ...state,
        cardIds: [],
        isSearching: false,
      };
    case ON_CHANGE_SEARCH_CARD_KEYWORD:
      return {
        ...state,
        cardKeyword: action.payload,
        isSearching: true,
      };
    case SEARCH_BOARD:
      return {
        ...state,
        boardIds: action.payload,
      };
    case CLEAR_SEARCH_BOARD_POOL:
      return {
        ...state,
        boardIds: [],
        isSearching: false,
      };
    case ON_CHANGE_SEARCH_BOARD_KEYWORD:
      return {
        ...state,
        boardKeyword: action.payload,
        isSearching: true,
      };
    default:
      return state;
  }
};

export default searchReducer;
