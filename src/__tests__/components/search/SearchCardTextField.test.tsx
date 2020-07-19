import React from 'react';
import { Route } from 'react-router-dom';

import { storeFactory, renderWithRouter, fireEvent } from '../../../testUtils';
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

  test('should renders an icon of `search` if props of `keyword` is blank', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
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

    expect(getByTestId('searchTextFieldSearchIcon')).not.toBeNull();
    expect(queryByTestId('searchTextFieldClearButton')).toBeNull();
  });

  test('should renders a clear button if props of `keyword` is not blank', () => {
    keyword = 'osxmrnvongie';
    const { getByTestId, queryByTestId } = renderWithRouter(
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

    expect(getByTestId('searchTextFieldClearButton')).not.toBeNull();
    expect(queryByTestId('searchTextFieldSearchIcon')).toBeNull();
  });

  test('should call `onChangeSearchCardKeyword` with empty string upon click a clear button', () => {
    keyword = 'osxmrnvongie';
    const { getByTestId } = renderWithRouter(
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

    fireEvent.click(getByTestId('searchTextFieldClearButton'));
    expect(onChangeSearchCardKeyword).toHaveBeenCalledWith('');
  });

  test('should call `onChangeSearchCardKeyword` with input string upon change a text field value', async () => {
    keyword = 'osxmrnvongie';
    const { getByTestId } = renderWithRouter(
      <Route
        path="/board/:boardId"
        render={() => (
          <SearchCardTextField
            searchCard={searchCard}
            clearSearchCardPool={clearSearchCardPool}
            onChangeSearchCardKeyword={onChangeSearchCardKeyword}
            keyword=""
          />
        )}
      />,
      store,
      [`/board/${boardId}`],
    );

    fireEvent.change(getByTestId('searchTextField'), { target: { value: keyword } });
    expect(onChangeSearchCardKeyword).toHaveBeenCalledWith(keyword);
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
});
