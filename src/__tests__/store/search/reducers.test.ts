import searchReducer from '../../../store/search/reducers';
import { CLEAR_SEARCH_CARD_POOL, ON_CHANGE_SEARCH_CARD_KEYWORD } from '../../../store/search/types';

describe('search reducer', () => {
  const initialState = {
    cardIds: [],
    keyword: '',
    isSearching: false,
  };

  test('should returns state `{ cardIds: [], isSearching: false }` upon recieved an action `CLEAR_SEARCH_CARD_POOL`', () => {
    const newState = searchReducer(
      { ...initialState, isSearching: true, cardIds: [1, 3, 2] },
      { type: CLEAR_SEARCH_CARD_POOL },
    );
    expect(newState.cardIds).toHaveLength(0);
    expect(newState.isSearching).toBeFalsy();
  });

  test('should returns state `{ keyword: ..., isSearching: true }` upon recieved an action `ON_CHANGE_SEARCH_CARD_KEYWORD`', () => {
    const keyword = 'kaoxmfencons';
    const newState = searchReducer(
      undefined,
      { type: ON_CHANGE_SEARCH_CARD_KEYWORD, payload: keyword },
    );
    expect(newState.isSearching).toBeTruthy();
    expect(newState.keyword).toBe(keyword);
  });
});
