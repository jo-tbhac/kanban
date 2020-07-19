import searchReducer from '../../../store/search/reducers';
import {
  CLEAR_SEARCH_CARD_POOL,
  ON_CHANGE_SEARCH_CARD_KEYWORD,
  CLEAR_SEARCH_BOARD_POOL,
  ON_CHANGE_SEARCH_BOARD_KEYWORD,
} from '../../../store/search/types';

describe('search reducer', () => {
  const initialState = {
    cardIds: [],
    cardKeyword: '',
    isSearching: false,
    boardKeyword: '',
    boardIds: [],
  };

  test('should returns state `{ cardIds: [], isSearching: false }` upon recieved an action `CLEAR_SEARCH_CARD_POOL`', () => {
    const newState = searchReducer(
      { ...initialState, isSearching: true, cardIds: [1, 3, 2] },
      { type: CLEAR_SEARCH_CARD_POOL },
    );
    expect(newState.cardIds).toHaveLength(0);
    expect(newState.isSearching).toBeFalsy();
  });

  test('should returns state `{ cardKeyword: ..., isSearching: true }` upon recieved an action `ON_CHANGE_SEARCH_CARD_KEYWORD`', () => {
    const keyword = 'kaoxmfencons';
    const newState = searchReducer(
      undefined,
      { type: ON_CHANGE_SEARCH_CARD_KEYWORD, payload: keyword },
    );
    expect(newState.isSearching).toBeTruthy();
    expect(newState.cardKeyword).toBe(keyword);
  });

  test('should returns state `{ boardIds: [], isSearching: false }`upon recieved an action `CLEAR_SEARCH_BOARD_POOL`', () => {
    const newState = searchReducer(
      { ...initialState, isSearching: true, boardIds: [1, 3, 5] },
      { type: CLEAR_SEARCH_BOARD_POOL },
    );
    expect(newState.boardIds).toHaveLength(0);
    expect(newState.isSearching).toBeFalsy();
  });

  test('should returns state `{ boardKeyword: ..., isSearching: true }` upon recieved an action `ON_CHANGE_SEARCH_BOARD_KEYWORD`', () => {
    const keyword = 'kaoxmfencons';
    const newState = searchReducer(
      undefined,
      { type: ON_CHANGE_SEARCH_BOARD_KEYWORD, payload: keyword },
    );
    expect(newState.isSearching).toBeTruthy();
    expect(newState.boardKeyword).toBe(keyword);
  });
});
