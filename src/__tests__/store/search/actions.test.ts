import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { storeFactory } from '../../../testUtils';
import { Store } from '../../../store';
import { CLEAR_SEARCH_CARD_POOL, ON_CHANGE_SEARCH_CARD_KEYWORD } from '../../../store/search/types';
import { searchCard, clearSearchCardPool, onChangeSearchCardKeyword } from '../../../store/search/actions';
import { dialogTypeError } from '../../../store/dialog/types';
import { failedSearchCard } from '../../../utils/text';

describe('search actions', () => {
  let store: Store;
  let mock: MockAdapter;

  beforeEach(() => {
    store = storeFactory();
    mock = new MockAdapter(axios);
  });

  test('should returns state of `cardIds` when dispatch an action `searchCard` was successful', () => {
    const responseData = { card_ids: [1, 2, 4] };
    const params = { title: 'sample', boardId: 1 };
    mock.onGet('/cards/search').reply(200, responseData);

    return store.dispatch(searchCard(params) as any)
      .then(() => {
        const { search } = store.getState();
        expect(search.cardIds).toEqual(responseData.card_ids);
        expect(search.isSearching).toBeFalsy();
      });
  });

  test('should returns state of dialogProps upon dispatch an action `searchCard` and recieved status 400 from server', () => {
    const responseData = { errors: [{ text: 'some error...' }] };
    const params = { title: 'sample', boardId: 1 };
    mock.onGet('/cards/search').reply(400, responseData);

    return store.dispatch(searchCard(params) as any)
      .then(() => {
        const { dialog } = store.getState();
        expect(dialog.isDialogVisible).toBeTruthy();
        expect(dialog.type).toBe(dialogTypeError);
        expect(dialog.title).toBe(failedSearchCard);
        expect(dialog.description).toBe('some error...');
      });
  });

  test('should returns an action with type `CLEAR_SEARCH_CARD_POOL`', () => {
    const action = clearSearchCardPool();
    expect(action).toEqual({ type: CLEAR_SEARCH_CARD_POOL });
  });

  test('should returns an action with payload and type `ON_CHANGE_SEARCH_CARD_KEYWORD`', () => {
    const keyword = 'xjecnhrcis';
    const action = onChangeSearchCardKeyword(keyword);
    expect(action).toEqual({ type: ON_CHANGE_SEARCH_CARD_KEYWORD, payload: keyword });
  });
});
