import {
  SEARCH_CARD,
  CLEAR_SEARCH_CARD_POOL,
  ON_CHANGE_SEARCH_CARD_KEYWORD,
  SearchActionTypes,
  SearchState,
} from './types';

const initialState: SearchState = {
  cards: [],
  keyword: '',
  isSearching: false,
};

const searchReducer = (state = initialState, action: SearchActionTypes) => {
  switch (action.type) {
    case SEARCH_CARD:
      return {
        ...state,
        cards: action.payload,
        isSearching: false,
      };
    case CLEAR_SEARCH_CARD_POOL:
      return {
        ...state,
        cards: [],
        isSearching: false,
      };
    case ON_CHANGE_SEARCH_CARD_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        isSearching: true,
      };
    default:
      return state;
  }
};

export default searchReducer;
