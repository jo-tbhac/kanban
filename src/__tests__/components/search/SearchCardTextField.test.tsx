import React from 'react';
import { Route } from 'react-router-dom';

import { storeFactory, renderWithRouter } from '../../../testUtils';
import { Store } from '../../../store';
import { SearchCardTextField } from '../../../components/search/SearchCardTextField';

describe('SearchCardTextField component', () => {
  let store: Store;
  let searchCard: jest.Mock;
  let clearSearchCardPool: jest.Mock;
  let onChangeSearchCardKeyword: jest.Mock;
  let keyword: string;
  const boardId = 1;

  beforeEach(() => {
    jest.useFakeTimers();

    store = storeFactory();
    searchCard = jest.fn();
    clearSearchCardPool = jest.fn();
    onChangeSearchCardKeyword = jest.fn();
    keyword = '';
  });

  test('should call `clearSearchCardPool` upon change a text field value to empty string', () => {
    renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <SearchCardTextField
            searchCard={searchCard}
            clearSearchCardPool={clearSearchCardPool}
            onChangeSearchCardKeyword={onChangeSearchCardKeyword}
            keyword={keyword}
          />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );

    expect(clearSearchCardPool).toHaveBeenCalled();
  });

  test('should call `searchCard` after 1 second upon change a text field value', () => {
    keyword = 'osxmrnvongie';
    renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <SearchCardTextField
            searchCard={searchCard}
            clearSearchCardPool={clearSearchCardPool}
            onChangeSearchCardKeyword={onChangeSearchCardKeyword}
            keyword={keyword}
          />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );

    expect(searchCard).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(searchCard).toHaveBeenCalledWith({ title: keyword, boardId });
  });

  test('should call `onChangeSearchCardKeyword` with empty string upon a component will unmount', () => {
    const { unmount } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <SearchCardTextField
            searchCard={searchCard}
            clearSearchCardPool={clearSearchCardPool}
            onChangeSearchCardKeyword={onChangeSearchCardKeyword}
            keyword={keyword}
          />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );

    expect(onChangeSearchCardKeyword).not.toHaveBeenCalled();
    unmount();
    expect(onChangeSearchCardKeyword).toHaveBeenCalledWith('');
  });
});
